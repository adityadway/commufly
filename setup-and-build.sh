#!/bin/bash

# Exit on error
set -e

echo "🚀 Commufly Setup & Build Automation"
echo "====================================="

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found. Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed."
fi

# Build production bundle
echo "🏗️ Building the production bundle..."
npm run build

echo "====================================="
echo "🎉 Build complete! The production-ready files are in the 'dist' directory."
echo "💡 To preview the build locally, you can run: npm run preview"
