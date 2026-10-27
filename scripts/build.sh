#!/usr/bin/env bash
# Arma el sitio de producción (diseño 1 "Arena & Sal") en dist/.
# Lo usa Cloudflare en cada deploy. Local: bash scripts/build.sh
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist/assets

cp v1/index.html v1/style.css v1/app.js dist/
cp -r shared dist/
cp -r assets/img dist/assets/
rm -f dist/assets/img/sources.txt
cp public/* dist/

# v1 vive en /v1 y apunta a ../ ; en producción queda en la raíz
sed 's#\.\./##g' v1/index.html > dist/index.html

echo "dist/ listo: $(find dist -type f | wc -l) archivos, $(du -sh dist | cut -f1)"
