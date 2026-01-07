#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: pnpm new-post <post-name>"
  exit 1
fi

POST_NAME="$1"
POST_DIR="src/content/$POST_NAME"
POST_FILE="$POST_DIR/index.mdx"
CURRENT_DATE=$(date +%m-%d-%Y)

mkdir -p "$POST_DIR"

cat > "$POST_FILE" << EOF
---
title: $POST_NAME
published: $CURRENT_DATE
---

EOF

echo "Created new post at $POST_FILE"
