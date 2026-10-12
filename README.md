# 200 OK

[API documentation](https://200ok.hacks.run/)

## Local setup

Requires Node.js 24+ and pnpm 12.8.1. From the repository directory:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Open [localhost:3000](http://localhost:3000). Optional environment settings are listed in [.env.example](.env.example).

For development, run `pnpm dev` and `pnpm dev:docs` in separate terminals, then open [localhost:4321](http://localhost:4321).

Or build and run with Docker:

```sh
docker compose up -d --build --wait
```

## VPS deployment

The included workflow builds an image in GHCR and deploys it over SSH using Docker Compose. HTTPS is handled by Caddy on the host.

Requirements: a Linux x86_64 VPS, Docker with Compose, Caddy, a domain pointing to the VPS, and an SSH user with Docker access and write access to the deployment directory. Open ports 80, 443, and your SSH port. The application port stays bound to localhost.

### 1. Publish an image

Fork the repository and run **Actions → CI → Run workflow** on `main`. After the publish job succeeds, the image is available at:

```text
ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:latest
```

Use lowercase owner and repository names. The first deployment job will fail until the VPS and secrets are configured.

Set the GHCR package visibility to public, or run `docker login ghcr.io` on the VPS as the deployment user with a token that has `read:packages` access.

### 2. Configure the container

On the VPS:

```sh
mkdir -p ~/apps/http-server
cd ~/apps/http-server
pwd
```

Copy [compose.production.yaml](compose.production.yaml) to that directory as `compose.yaml`. From your local checkout:

```sh
scp -P SSH_PORT compose.production.yaml SSH_USER@VPS_ADDRESS:/ABSOLUTE/DEPLOY/PATH/compose.yaml
```

Create `.env` in the deployment directory:

```dotenv
APP_IMAGE=ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:latest
TRUST_PROXY=127.0.0.1
```

The initial `TRUST_PROXY` value is temporary. Create the container and inspect its network gateway:

```sh
chmod 600 .env
docker compose pull app
docker compose create app
docker network inspect http-server_default --format '{{(index .IPAM.Config 0).Gateway}}'
```

Replace `TRUST_PROXY` in `.env` with the returned gateway address, then start:

```sh
docker compose up -d --wait --wait-timeout 90
curl -fsS http://127.0.0.1:3000/health
```

This configuration assumes Caddy runs directly on the VPS without another proxy or CDN in front of it.

### 3. Configure HTTPS

Point your domain's A record to the VPS. Add an AAAA record only if IPv6 is configured and reachable.

Add a site block to `/etc/caddy/Caddyfile`, preserving existing sites:

```caddyfile
example.com {
    reverse_proxy 127.0.0.1:3000
}
```

Validate and reload:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy
curl -fsS https://example.com/health
```

### 4. Enable automatic deployments

Add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS address or hostname |
| `VPS_USER` | SSH deployment user |
| `VPS_PORT` | SSH port |
| `VPS_DEPLOY_PATH` | Absolute deployment directory path |
| `VPS_SSH_KEY` | Complete SSH private key without a passphrase; its public key must be in the user's `authorized_keys` |
| `VPS_KNOWN_HOSTS` | Verified host-key record matching `VPS_HOST` and `VPS_PORT` |

Connect to the VPS once and verify its host fingerprint. Retrieve the known-hosts record locally:

```sh
ssh-keygen -F '[VPS_ADDRESS]:SSH_PORT' -f ~/.ssh/known_hosts
```

For port 22, use `VPS_ADDRESS` without brackets or a port. Copy one complete key record, excluding comment lines.

Run **Actions → CI → Run workflow** again. Subsequent pushes to `main` build and deploy automatically; pull requests only run checks.

The workflow replaces the server's `compose.yaml` and saves the deployed image tag in `.env`, preserving other environment settings. A deployment can briefly interrupt service. Failed deployments do not roll back automatically.

### Updates and rollback

To deploy a specific version manually, set `APP_IMAGE` in the VPS `.env` to `ghcr.io/YOUR_OWNER/YOUR_REPOSITORY:sha-FULL_COMMIT_SHA`, then run:

```sh
docker compose pull app
docker compose up -d --wait --wait-timeout 90
```

Use a previous tag to roll back. Avoid `docker compose down` during updates: recreating the network may change its gateway and require updating `TRUST_PROXY`.

## Troubleshooting

Run on the VPS from the deployment directory:

```sh
docker compose ps
docker compose logs --tail=50 app
curl -i http://127.0.0.1:3000/health
sudo journalctl -u caddy -n 50 --no-pager
```

| Problem | Check |
| --- | --- |
| Missing `APP_IMAGE` or `TRUST_PROXY` | Set both in the deployment directory's `.env`. |
| SSH authentication fails | Check the user, port, private key, and `authorized_keys`. The workflow requires a key without a passphrase. |
| Host-key verification fails | Check `VPS_KNOWN_HOSTS` against the configured host and port. Verify any changed fingerprint before replacing the record. |
| Image pull denied | Check GHCR visibility or log in as the deployment user with package read access. |
| Docker permission denied | The SSH user must be able to run Docker without `sudo`. |
| HTTPS returns `502` | Check container health, the Caddy upstream, and both services' logs. |
| Client IP is incorrect | Check `TRUST_PROXY` against the Docker network gateway and recreate the container after changing `.env`. |
| SSH connection times out | Check the address, port, firewall, and access from GitHub-hosted runners. |

After fixing a deployment issue, use **Re-run failed jobs** in GitHub Actions.
