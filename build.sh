#!/bin/bash
# Netlify build script
# main/HEAD → Storybook (component catalog)
# proto/* → Vite app (flow prototype)

BRANCH="${BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null)}"
echo "Building branch: $BRANCH"

if [[ "$BRANCH" == proto/* ]]; then
  echo "→ Prototype build (vite)"
  npx vite build
else
  echo "→ Storybook build"
  npm run build-storybook
  # Netlify expects output in dist/ — move it
  mv storybook-static dist
fi
