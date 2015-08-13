#!/bin/bash

edp build -f -s release
mkdir -p output
cd ./output
mkdir static
mv ./asset ./static/asset
mv ./dep ./static/dep

# mkdir graphweb
# cd ./graphweb
# mkdir template
# cd ..

# mv ./template/* ./graphweb/template
# mv ./graphweb ./template


tar -czf template-graphfe.tar.gz ./template
tar -czf static-graphfe.tar.gz ./static
# rm -rf ./static ./template

# cd ..
# rm -rf product
# mkdir product
# cp ./output/static-graphfe.tar.gz ./product/
# cp ./output/graphfe.tar.gz ./product/

# rm -rf ./output

echo "==========================================="
echo "success"
echo "==========================================="
exit
