# http-server

## Run locally

Install Node.js 24+ and pnpm 12.8.1, then run these commands in the project directory:

```sh
pnpm install
pnpm dev
```

In another terminal:

```sh
curl http://localhost:3000/v1/ip
```

Local requests return a loopback address such as `127.0.0.1` or `::1`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Restart the server when source files change |
| `pnpm check` | Run Biome checks |
| `pnpm check:fix` | Apply Biome fixes |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm build` | Compile into `dist/` |
| `pnpm start` | Run the compiled server |

Optional settings go in `.env`. See `.env.example`. Development and production start commands load this file automatically.

To build and run locally with Docker instead:

```sh
docker compose up -d --build --wait
curl http://127.0.0.1:3000/v1/ip
```

## API

API endpoints use the `/v1` prefix. `/health` is unversioned and always returns JSON. `/` is reserved for future documentation and currently returns `404`.

| Endpoint | Default text response | JSON response (`?format=json`) |
| --- | --- | --- |
| `/v1/ip` | Two lines: `v4: <address or unknown>` and `v6: <address or unknown>` | `{"v4":"192.0.2.1","v6":null}` |
| `/v1/ip/v4` | IPv4 address or `unknown`, without a label | `{"ip":"192.0.2.1"}` or `{"ip":null}` |
| `/v1/ip/v6` | IPv6 address or `unknown`, without a label | `{"ip":"2001:db8::1"}` or `{"ip":null}` |
| `/health` | Always JSON | `{"status":"ok"}` |

For `/v1` endpoints, omitted `format` and `format=text` select `text/plain`; `format=json` selects `application/json`. Values are case-sensitive. Unsupported, empty, or repeated `format` values return `400` with a plain-text explanation. The `format` parameter does not affect `/health`.

A request reveals one client address, either IPv4 or IPv6. The other family is `unknown` in text and `null` in JSON. Selecting `/ip/v6` does not force an IPv6 connection. IPv4-mapped addresses such as `::ffff:192.0.2.1` are normalized to IPv4. NAT or VPN connections expose the address visible to the server, not necessarily the device's local address. IP responses include `Cache-Control: no-store`.

```sh
curl 'http://localhost:3000/v1/ip?format=json'
curl 'http://localhost:3000/v1/ip/v4?format=text'
curl 'http://localhost:3000/v1/ip/v6?format=json'
curl -i 'http://localhost:3000/v1/ip?format=xml'
curl -i http://localhost:3000/health
```

Docker's healthcheck requests `/health` and checks the HTTP status.

## Source structure

```text
src/
  server.ts                     # Listening, port validation, shutdown
  app.ts                        # Express settings and router mounting
  constants.ts                  # Route paths and format names
  middleware/
    response-format.ts          # Validate format and set res.locals.format
  routes/
    health.ts                   # Unversioned health endpoint
    v1/
      index.ts                  # Assemble v1 middleware and routers
      ip.ts                     # IP endpoints and response formatting
  utils/
    client-addresses.ts         # Normalize and classify an IP, without Express
```

Requests to `/v1/ip` pass through `app.ts`, the v1 router, the format middleware, and the IP handler. Middleware calls `next()` to continue or sends an error response to stop processing. `/health` is mounted separately and bypasses the API format middleware.

Add future v1 route modules in `src/routes/v1/` and register them in its `index.ts`. Keep reusable request processing in `middleware/` and code independent of HTTP in `utils/`.

## Deploy to your own VPS

This guide uses GitHub Actions, GitHub Container Registry (GHCR), Docker Compose, and Caddy running as a systemd service on the VPS.

Commands marked **Local computer** run in your own terminal, outside an SSH session. Commands marked **VPS** run after connecting to the server. GitHub settings are entered in your browser.

Use your own server address, username, SSH port, domain, and repository. Example addresses below are placeholders. Do not copy another deployment's SSH keys or Docker gateway address.

### 1. Check the VPS

You need:

- A Linux x86_64 VPS. The workflow currently builds only `linux/amd64` images.
- Docker Engine and Docker Compose with support for `up --wait`.
- An SSH user who can run Docker without `sudo` and write to the deployment directory.
- Caddy installed as a systemd service, with permission to edit its configuration through `sudo`.
- A domain pointing directly to the VPS. This guide does not cover a CDN or another proxy in front of Caddy.
- Ports 80 and 443 reachable for Caddy, and your SSH port reachable by GitHub-hosted runners. Port 3000 stays bound to localhost.

**VPS:**

```sh
uname -m
docker version
docker compose version
docker ps
systemctl is-active caddy
systemctl cat caddy --no-pager
```

`docker ps` must work as the deployment user without `sudo`. Check Caddy's `ExecStart` for the configuration path. The examples below use `/etc/caddy/Caddyfile`.

If needed, use the official installation instructions for [Docker Engine](https://docs.docker.com/engine/install/), [Compose](https://docs.docker.com/compose/install/linux/), and [Caddy](https://caddyserver.com/docs/install).

### 2. Publish the first image

**GitHub:** Fork or copy this repository into your own account. Enable Actions if GitHub asks you to. The workflow expects the branch `main`; edit `.github/workflows/ci.yaml` if you use another name.

Open **Actions → CI → Run workflow**, select `main`, and run it.

Wait for **Check and build** and **Publish Docker image** to succeed. The first **Deploy to VPS** job will fail because the server settings have not been added yet. Complete the remaining setup before rerunning it.

The image will be published as:

```text
ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:latest
ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:sha-FULL_COMMIT_SHA
```

Use lowercase owner and repository names in image references. The workflow uses its built-in `GITHUB_TOKEN` to publish; you do not create that secret yourself.

**GitHub:** Open the published package under your account's **Packages**, then **Package settings**. Set its visibility to **Public** if you want the VPS to pull without signing in. A public repository does not automatically make a new GHCR package public. See [GHCR access and visibility](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

If you want a private image, keep it private and run `docker login ghcr.io -u YOUR_GITHUB_USERNAME` on the VPS as the deployment user. At the password prompt, enter a personal access token (classic) with `read:packages` and access to the package, not your GitHub password. Authorize organization SSO if required. The workflow uses this user's saved Docker login when pulling.

### 3. Prepare the production directory and environment

Two Compose files serve different purposes:

| Repository file | Purpose |
| --- | --- |
| `compose.yaml` | Build from source on your local computer |
| `compose.production.yaml` | Pull the published image on the VPS |

The workflow uploads `compose.production.yaml` as `compose.yaml` in the deployment directory. Edits to that server-side Compose file will be overwritten by the next deployment. Keep server-specific settings in the adjacent `.env` file.

**VPS:** Create the directory as your deployment user:

```sh
mkdir -p ~/apps/http-server
cd ~/apps/http-server
pwd
```

Save the absolute path printed by `pwd`. You will use it for `VPS_DEPLOY_PATH`.

**Local computer, in your repository checkout:** Copy the production Compose file to that directory. Replace every uppercase placeholder below:

```sh
scp -P SSH_PORT compose.production.yaml SSH_USER@VPS_ADDRESS:/ABSOLUTE/DEPLOY/PATH/compose.yaml
```

If you need a particular SSH key, add `-i /path/to/private-key -o IdentitiesOnly=yes` to the command.

**VPS, in the deployment directory:** Create `.env` with `nano .env`:

```dotenv
APP_IMAGE=ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:latest
TRUST_PROXY=127.0.0.1
```

Replace the image owner and repository. `127.0.0.1` is a temporary value used only to create the container and discover its network. The container is not started yet.

```sh
chmod 600 .env
docker compose pull app
docker compose create app
docker network inspect http-server_default --format '{{(index .IPAM.Config 0).Gateway}}'
```

Copy the gateway address printed by the last command. Open `.env` again and replace **only** the `TRUST_PROXY` value with that address. For example, if the command prints `172.20.0.1`, use `TRUST_PROXY=172.20.0.1`.

Do not assume the example address matches your VPS. Do not put this setting only in Compose: the production file explicitly requires it in `.env`.

Start the server:

```sh
docker compose up -d --wait --wait-timeout 90
curl -fsS http://127.0.0.1:3000/v1/ip
```

The direct request should return the Docker gateway address. That is expected: this request has not passed through Caddy.

For an existing deployment, preserve `.env` and its other settings. Inspect the existing network and add or update `TRUST_PROXY` there before running the workflow.

### 4. Add the domain to Caddy

**DNS provider:** Point the domain's A record to the VPS IPv4 address. Only add an AAAA record if IPv6 is configured and reaches this VPS too.

**VPS:** Back up the existing Caddy configuration and create a directory for site files:

```sh
sudo cp -a /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.backup.$(date +%s)"
sudo mkdir -p /etc/caddy/sites-enabled
sudo nano /etc/caddy/Caddyfile
```

Add this line once, outside any existing site or global options block. Keep the existing configuration:

```caddyfile
import /etc/caddy/sites-enabled/*.caddy
```

Create the application's file:

```sh
sudo nano /etc/caddy/sites-enabled/http-server.caddy
```

Paste this, replacing `example.com` with your domain:

```caddyfile
example.com {
    reverse_proxy 127.0.0.1:3000
}
```

Validate before reloading:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile &&
sudo systemctl reload caddy
```

Caddy obtains the HTTPS certificate automatically. Its [reverse proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy) passes the client address in `X-Forwarded-For`. Express accepts this header from the Docker gateway configured in `TRUST_PROXY`.

**Local computer:**

```sh
curl -fsS https://example.com/v1/ip
```

The response should be your connection's public IP. A request made from the VPS itself returns the VPS's public IP. If your shell displays `%` after the address, that marker is not part of the response.

### 5. Choose the SSH key for Actions

There are two separate keys involved:

| Setting | What it proves | Where it comes from |
| --- | --- | --- |
| `VPS_SSH_KEY` | Actions is allowed to log in as your SSH user | Your deployment private key; its public half must be in that user's `~/.ssh/authorized_keys` on the VPS |
| `VPS_KNOWN_HOSTS` | Actions reached the expected server | The server's public host key, recorded in your local `~/.ssh/known_hosts` |

These keys do not match each other. Changing the client key used to log in does not change the server's host key.

You can reuse an existing deployment key. The current workflow requires a private key **without a passphrase**, because it does not configure an SSH agent or unlock encrypted keys.

If you already have a suitable key, skip key generation. Otherwise, **on your local computer**, create a separate key and install its public half on the VPS:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/http-server-actions -C http-server-actions -N ''
ssh-copy-id -i ~/.ssh/http-server-actions.pub -p SSH_PORT SSH_USER@VPS_ADDRESS
```

Do not overwrite an existing key when prompted. Use a different filename if necessary.

**Local computer:** Check the selected key. Use its actual path in place of `/path/to/private-key`:

```sh
ssh -o IdentitiesOnly=yes -o BatchMode=yes \
  -i /path/to/private-key -p SSH_PORT SSH_USER@VPS_ADDRESS \
  'docker ps >/dev/null && echo "SSH and Docker access OK"'
```

If this is your first connection to the server, connect interactively first and verify its host fingerprint using your VPS provider's console before accepting it. Then repeat the command above. It must succeed without a password or passphrase prompt.

### 6. Add the six GitHub repository secrets

**GitHub, in your own repository:**

**Settings → Secrets and variables → Actions → Secrets → Repository secrets → New repository secret**

Use **Repository secrets**, not Variables or Environment secrets. Create each entry separately. Put the name in **Name** and its value in **Secret**, then click **Add secret**. Do not add surrounding quotes.

| Name | Value |
| --- | --- |
| `VPS_HOST` | The VPS IP address or SSH hostname, without a protocol or port |
| `VPS_USER` | The SSH user tested in step 5 |
| `VPS_PORT` | The SSH port number |
| `VPS_DEPLOY_PATH` | The absolute directory path printed by `pwd` in step 3, without `~` |
| `VPS_SSH_KEY` | The entire private key file selected in step 5, including its BEGIN and END lines. Not the `.pub` file and not `authorized_keys` |
| `VPS_KNOWN_HOSTS` | One complete host-key record for that server, obtained below |

To get `VPS_KNOWN_HOSTS`, run this **in a terminal on your local computer**, replacing the address and port with the same values used in the secrets:

```sh
ssh-keygen -F '[VPS_ADDRESS]:SSH_PORT' -f ~/.ssh/known_hosts
```

For the standard SSH port 22, use the address without brackets or a port:

```sh
ssh-keygen -F 'VPS_ADDRESS' -f ~/.ssh/known_hosts
```

This command reads an existing record. It does not generate a key or change any files. If it finds nothing, connect to that exact address and port first, verify the server fingerprint, then try again.

The output may contain several types of server keys. Copy one complete `ssh-ed25519` record into `VPS_KNOWN_HOSTS`. For example:

```text
[SERVER_ADDRESS]:SSH_PORT ssh-ed25519 BASE64_PUBLIC_HOST_KEY
```

Use your actual output, not this example. Skip the `# Host ...` comment. If the hostname is hashed and starts with `|1|`, copy the entire line unchanged. You do not need all three key types. A `SHA256:...` fingerprint alone is not a known-hosts record.

The workflow uses this record to check the server identity. Removing a user key from `authorized_keys` does not change it. Replacing the server's host keys, for example after reinstalling the VPS, requires updating this secret after verifying the replacement.

### 7. Run the deployment

Before running it, confirm that:

- All six repository secrets exist.
- The deployment directory contains `.env` with the actual `TRUST_PROXY` address.
- The deployment user can pull the image and run Docker without `sudo`.
- The domain already returns your IP through Caddy.

**GitHub:** Open **Actions → CI → Run workflow → main → Run workflow**. No new commit is needed after adding secrets.

The three jobs should finish successfully:

1. **Check and build** runs Biome, TypeScript checks, and compilation.
2. **Publish Docker image** publishes `latest` and `sha-FULL_COMMIT_SHA` tags.
3. **Deploy to VPS** uploads the production Compose file, pulls the exact commit's image, updates the container, and waits for its healthcheck.

After success, the workflow saves that image reference as `APP_IMAGE` in the VPS `.env`, preserving `TRUST_PROXY` and other settings. It does not change Caddy.

Future pushes to `main` repeat this process. Pull requests to `main` only run the checks. Replacing the single container may cause a brief interruption. A failed healthcheck marks the job failed; the workflow does not roll back automatically.

## Server commands and rollback

**VPS, in the deployment directory:**

```sh
docker compose ps
docker compose logs --tail=100 app
```

To roll back, edit `.env` and set `APP_IMAGE` to a previously published `sha-FULL_COMMIT_SHA` tag, then run:

```sh
docker compose pull app
docker compose up -d --wait --wait-timeout 90
```

Avoid `docker compose down` during normal updates. It deletes the Compose network, and a newly created network can receive a different gateway. If you recreate it, inspect `http-server_default` again, update `TRUST_PROXY` in `.env`, and run `docker compose up -d` to apply it.

## Troubleshooting

| Error or symptom | What to check |
| --- | --- |
| `TRUST_PROXY is missing a value` | SSH already succeeded. Add `TRUST_PROXY` to `.env` inside the exact `VPS_DEPLOY_PATH`. A value hardcoded in an old Compose file does not carry over. |
| `APP_IMAGE is missing a value` during a manual command | Set `APP_IMAGE` in the VPS `.env`. The workflow provides it during deployment and saves it after success. |
| `Permission denied (publickey)` | Check `VPS_USER`, the private key in `VPS_SSH_KEY`, and its public key in that user's `authorized_keys`. Test the exact key with the command in step 5. |
| `Enter passphrase for key ...` locally | The private key is encrypted. The current workflow cannot unlock it; use a separate key without a passphrase. |
| `Host key verification failed` | Check the complete `VPS_KNOWN_HOSTS` record against the server used by `VPS_HOST` and `VPS_PORT`. Verify a changed server key before replacing the secret. |
| `unauthorized` or `denied` when pulling an image | Make the GHCR package public or log in on the VPS as the deployment user with package read access. |
| Docker socket permission denied | The SSH user cannot access Docker. Fix that user's Docker access and reconnect before retrying. |
| SSH timeout or connection refused | Check the SSH address, port, firewall, and whether the VPS permits connections from GitHub-hosted runners. |
| Domain returns `502` | Run the commands below to distinguish an application failure from a Caddy connection problem. |
| Domain returns a Docker gateway address | Check `TRUST_PROXY` in `.env` against the current gateway, then recreate the container with `docker compose up -d`. |

For HTTP errors, run **on the VPS**, in the deployment directory:

```sh
docker compose ps
docker compose logs --tail=50 app
curl -i http://127.0.0.1:3000/health
sudo journalctl -u caddy -n 50 --no-pager
```

If the container is healthy and the local request succeeds, check the Caddy site file and reload its validated configuration. After fixing a deployment failure, open that GitHub Actions run and choose **Re-run jobs → Re-run failed jobs**.
