#!/usr/bin/env bash

DIR=$1

echo 'creating new directories for the test' $DIR
echo 'nested inside the base, actual, and diff fixture directories'

cd tests; 
cd e2e;
cd fixtures;
cd screenshots;
cd actuals; mkdir $DIR;
cd ..;
cd base; mkdir $DIR;
cd ..;
cd diff; mkdir $DIR;
echo 'complete';
echo 'printing new directories'
cd ..;
cd actuals; ls; cd ..;
cd base; ls; cd ..;
cd diff; ls; 