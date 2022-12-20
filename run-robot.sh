#!/bin/bash
filename='input.txt'
n=1
while read line; do
    echo "run robot :: $n"
    # reading each line
    node ./twitter.js $line
    n=$((n+1))
done < $filename