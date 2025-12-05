#!/bin/bash

# Build script for static deployment

echo "Building static HTML from PHP..."

php build-static.php > index.html

if [ $? -eq 0 ]; then
    echo "Build successful! Generated index.html"
    echo "Files ready for deployment:"
    echo "  - index.html"
    echo "  - style.css"
    echo "  - script.js"
    echo "  - projects.json"
else
    echo "Build failed!"
    exit 1
fi
