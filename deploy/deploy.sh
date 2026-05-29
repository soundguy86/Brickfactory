#!/usr/bin/env bash
# =============================================================================
# BandStage Pro – Deploy nach Hetzner (über Tailscale)
#
# Baut lokal das dist/ und synct es per rsync auf den Server.
# Voraussetzung: SSH-Zugang zum Server (Tailscale-MagicDNS-Name oder 100.x-IP),
# Caddy läuft dort bereits (siehe deploy/DEPLOY.md).
#
# Nutzung:
#   SERVER=tom@hetzner ./deploy/deploy.sh
# oder Werte unten anpassen.
# =============================================================================
set -euo pipefail

# --- Konfiguration (per Env überschreibbar) ----------------------------------
SERVER="${SERVER:-tom@hetzner}"            # SSH-Ziel: user@<tailscale-name|100.x.x.x>
REMOTE_DIR="${REMOTE_DIR:-/var/www/bandstage}"
RELOAD_CMD="${RELOAD_CMD:-sudo systemctl reload caddy}"

# Ins Projekt-Root wechseln (ein Verzeichnis über diesem Skript)
cd "$(dirname "$0")/.."

echo "▶ 1/3  Build…"
npm ci
npm run build

echo "▶ 2/3  Sync → ${SERVER}:${REMOTE_DIR}"
# --delete entfernt alte, gehashte Assets, die es nicht mehr gibt.
rsync -avz --delete dist/ "${SERVER}:${REMOTE_DIR}/"

echo "▶ 3/3  Caddy reload"
ssh "${SERVER}" "${RELOAD_CMD}"

echo "✓ Live. Aufruf über die Tailscale-URL (tailscale serve status)."
