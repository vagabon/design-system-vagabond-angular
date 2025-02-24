cd projects/ng-dsv
npm version patch

cd ../../

npm run lib:build

cd dist/ng-dsv
npm publish --access public

cd ../../