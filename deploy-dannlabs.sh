#!/usr/bin/env bash
# Static-only deployment. Does not configure or start the public Snowy agent.
# Keeps the existing nginx vhost and Certbot TLS configuration untouched.
set -euo pipefail
ROOT="/home/user4xn/work/dannlabs-portfolio"
SITE="/var/www/dannlabs.my.id"
STAGE="$(mktemp -d /home/user4xn/.cache/dannlabs-static.XXXXXX)"
trap 'rm -rf "$STAGE"' EXIT

install -d "$STAGE/assets" "$STAGE/src"
cp "$ROOT/index.html" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$STAGE/"
cp -a "$ROOT/assets/." "$STAGE/assets/"
cp -a "$ROOT/src/." "$STAGE/src/"

# Do not delete old public-agent files from any location; only replace the static site tree.
install -d -m 0755 "$SITE"
find "$SITE" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "$STAGE/." "$SITE/"
find "$SITE" -type d -exec chmod 755 {} +
find "$SITE" -type f -exec chmod 644 {} +
nginx -t
systemctl reload nginx
printf 'static portfolio deployed to %s\n' "$SITE"
