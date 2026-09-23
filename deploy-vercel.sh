#!/usr/bin/env bash
# ==============================================================================
# BUSINESSKIT MVP — VERCEL DEPLOYMENT SCRIPT
# ==============================================================================

echo "========================================================"
echo "🚀 BusinessKit MVP: Deployment su Vercel"
echo "========================================================"

if command -v vercel &> /dev/null; then
  echo "⚡ Utilizzo Vercel CLI..."
  vercel
elif command -v npx &> /dev/null; then
  echo "⚡ Utilizzo npx vercel..."
  npx vercel
else
  echo "💡 Vercel CLI / npx non trovato localmente."
  echo ""
  echo "👉 METODO SEMPLICE (VIA GITHUB IN 1 MINUTO):"
  echo "1. Crea un nuovo repository su GitHub: https://github.com/new"
  echo "2. Collega ed invia questo progetto con:"
  echo "   git remote add origin https://github.com/<tuo-username>/<tuo-repo>.git"
  echo "   git push -u origin main"
  echo "3. Apri https://vercel.com/new e clicca 'Import' sul tuo repository."
  echo "4. Clicca 'Deploy'. Fatto!"
fi
