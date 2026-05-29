#!/bin/bash
# gidr-ui-library.netlify.app → always Storybook
# gidr-prototypes.netlify.app → always Vite prototype app (deployed separately)

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
