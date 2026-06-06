#!/bin/bash

#cd /data/data/com.termux/files/home/github/

echo ""
echo "================================"
echo "   Inkwell — Git Push Script"
echo "================================"
echo ""

echo "📂 Changed files:"
git status --short
echo ""

if [ -n "$1" ]; then
  MSG="$*"
else
  echo "💬 Enter commit message:"
  read -r MSG
fi

if [ -z "$MSG" ]; then
  MSG="update: $(date '+%Y-%m-%d %H:%M')"
fi

echo ""
echo "🚀 Pushing with message: \"$MSG\""
echo ""

git add .
git commit -m "$MSG"
git push origin main

echo ""
echo "================================"
echo "   ✅ Done! Pushed to GitHub"
echo "================================"
echo ""
