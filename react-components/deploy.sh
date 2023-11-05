#!/bin/sh

set -e

BRANCH_NAME="rect-routing"

npm run build
git switch -C gh-pages
git ls-files . | xargs --no-run-if-empty rm -rf
cp -R ./dist/* .
git add .
git commit -m "deploy($BRANCH_NAME): `date +\"%H:%M %d/%m/%Y\"`"
git push origin gh-pages
