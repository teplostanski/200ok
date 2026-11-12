# 200 OK

[![Service status][service-status-badge]][service-url]

**HTTP Request & Response Service**

Inspect requests, test responses, and debug integrations.

[API documentation](https://200ok.hacks.run/)

> [!NOTE]
> For random strings and IDs, try [rand.hacks.run](https://rand.hacks.run/).

## Local setup

Requires Node.js 24+ and pnpm 12.8.1. From the repository directory:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Open [localhost:3000](http://localhost:3000). Optional environment settings are listed in [.env.example](.env.example).

For development, run `pnpm dev` to start both the API and Astro, then open the docs URL printed in the terminal (usually http://localhost:4321). `pnpm dev:docs` is an alias for the same command.

The dev command watches the API sources and restarts both servers when they change. Listhen selects an available port, preferring 3000 through 3100, and passes the address directly to the Astro proxy. Set `PORT` to require a specific API port. Production (`pnpm start`) uses a fixed port, defaulting to 3000.

Or build and run with Docker:

```sh
docker compose up -d --build --wait
```

## Request limits and checks

Request bodies default to a limit of 100 KiB after decompression. Set
`BODY_LIMIT_BYTES` to a positive safe integer in bytes to change it (for example,
`1048576` for 1 MiB). The limit applies to JSON, text, form and binary bodies.
Larger bodies return 413 with the configured `limitBytes` in JSON responses.
JSON nesting defaults to 64 object or array levels; deeper bodies return 400 before
response formatting. The outermost object or array counts as level 1. Malformed JSON
also returns 400. Set `JSON_MAX_DEPTH` to an integer from 1 to 512 at startup to change
the nesting limit. The upper bound protects the recursive response formatter; the
body size limit remains independent.

Development and production can use different environment values:

```sh
BODY_LIMIT_BYTES=1048576 JSON_MAX_DEPTH=256 pnpm dev
BODY_LIMIT_BYTES=102400 JSON_MAX_DEPTH=64 pnpm start
```

For local Docker testing:

```sh
docker run --rm -e BODY_LIMIT_BYTES=1048576 -e JSON_MAX_DEPTH=256 -p 3000:3000 ghcr.io/teplostanski/200ok:latest
```

With production Compose, set `BODY_LIMIT_BYTES` and `JSON_MAX_DEPTH` in the VPS `.env` file and recreate the
container. Defaults are 102400 bytes and 64 levels when omitted. These settings require an image built from
this version of the source; an older published image may not support these settings.

Run `pnpm test` for HTTP security regression tests, `pnpm typecheck` for type checks,
and `pnpm audit` for known dependency vulnerabilities. CI runs these before publishing.

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

| Secret            | Value                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `VPS_HOST`        | VPS address or hostname                                                                               |
| `VPS_USER`        | SSH deployment user                                                                                   |
| `VPS_PORT`        | SSH port                                                                                              |
| `VPS_DEPLOY_PATH` | Absolute deployment directory path                                                                    |
| `VPS_SSH_KEY`     | Complete SSH private key without a passphrase; its public key must be in the user's `authorized_keys` |
| `VPS_KNOWN_HOSTS` | Verified host-key record matching `VPS_HOST` and `VPS_PORT`                                           |

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

| Problem                              | Check                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Missing `APP_IMAGE` or `TRUST_PROXY` | Set both in the deployment directory's `.env`.                                                                            |
| SSH authentication fails             | Check the user, port, private key, and `authorized_keys`. The workflow requires a key without a passphrase.               |
| Host-key verification fails          | Check `VPS_KNOWN_HOSTS` against the configured host and port. Verify any changed fingerprint before replacing the record. |
| Image pull denied                    | Check GHCR visibility or log in as the deployment user with package read access.                                          |
| Docker permission denied             | The SSH user must be able to run Docker without `sudo`.                                                                   |
| HTTPS returns `502`                  | Check container health, the Caddy upstream, and both services' logs.                                                      |
| Client IP is incorrect               | Check `TRUST_PROXY` against the Docker network gateway and recreate the container after changing `.env`.                  |
| SSH connection times out             | Check the address, port, firewall, and access from GitHub-hosted runners.                                                 |

After fixing a deployment issue, use **Re-run failed jobs** in GitHub Actions.

## License

[MIT](./LICENSE) License © 2026-present [Teplostanski Igor](https://github.com/teplostanski)

[service-status-badge]: https://img.shields.io/website?url=https%3A%2F%2F200ok.hacks.run%2Fhealth&label=service&up_message=online&down_message=offline
[service-url]: https://200ok.hacks.run

### Base URL

Set `BASE_URL=https://api.example.com` in the root `.env` file to configure the
origin for API documentation links and documentation builds. Use an HTTP(S)
origin with no path, query, fragment or credentials.

Without `BASE_URL`, API links use the request origin; during `pnpm dev`, they
point to the actual Astro development port. Building static documentation requires
an explicit `BASE_URL`. No deployment domain is hardcoded in application code.

`docker compose up -d --build` reads `BASE_URL` from `.env` and passes it as a build
argument. Docker stores that value in the image environment, so the build and
running API share one setting. Alternatively, pass it once when building manually:

```sh
docker build --build-arg BASE_URL=https://api.example.com -t 200ok-local .
docker run --rm -p 3000:3000 200ok-local
```

For published images, set the GitHub Actions repository variable `BASE_URL`.
Production Compose uses the value already stored in the image.
Canonical URLs, Markdown and `llms.txt` are generated at build time: changing the
deployment domain requires rebuilding the image. Overriding only the runtime
environment does not rewrite static documentation.

## Automated dependency updates

Renovate manages npm dependencies, Docker base images and GitHub Actions through
`renovate.json`. Regular updates wait three days after release. Only patch updates
of npm dependencies and devDependencies already on version 1.0 or later can merge
automatically after successful checks. Minor, major, pre-1.0, Docker, Actions and
lockfile-maintenance updates require manual merging.

Security fixes use GitHub Dependabot alerts and target the lowest fixed version.
They bypass the regular release-age delay but retain the patch-only automerge
policy and CI checks. Fixes requiring a minor or major update need manual review.
An alert without a fixed version cannot be automatically resolved. The daily
`Security audit` workflow runs `pnpm audit` against the lockfile at 05:23 UTC;
audit findings or registry errors fail the workflow. Audit failures do not directly
edit dependencies: Renovate prepares fix PRs based on supported vulnerability alerts.

Repository setup (required before automerge is enabled operationally):

1. Install the [Mend Renovate GitHub App](https://github.com/apps/renovate) for this repository.
2. Enable the dependency graph and Dependabot alerts, including read access to
   alerts for Renovate. Leave Dependabot security-update PRs disabled to avoid duplicates.
3. Protect `main`: require pull requests, the `Check and build` and `Docker smoke test`
   status checks, and an up-to-date branch. Do not grant Renovate a bypass of these checks.
   If required reviews are enabled, automated merges will also wait for approval.
4. Enable GitHub Actions failure notifications to receive daily audit failures.

Renovate performs the merge itself (`platformAutomerge: false`) after checks pass;
GitHub's native auto-merge setting is not required. CI builds and smoke-tests the
Docker image before publication. A merge into `main` triggers the existing VPS
deployment. Successful checks cover tested behavior, not every possible regression.
