#!/bin/bash

edp build -f -s release
mkdir output
cd ./output
rm -rf *
cp ../product/graphfe.tar.gz ./
cp ../product/static-graphfe.tar.gz ./

echo "==========================================="
echo "success"
echo "==========================================="
exit
