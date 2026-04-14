#!/bin/bash

cd projects/ng-dsv
npm version patch

cd ../../

npm run lib:build

# Pause the script and wait for user input
echo "Appuyez sur une touche pour publier sur npm..."
read a

cd dist/ng-dsv
npm publish --access public

cd ../../ 

npm install --force