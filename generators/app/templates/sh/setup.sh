#!/bin/bash

dir="$(dirname "$0")"

sh $dir/npmInstallGlobal.sh yo generator-comet bower pm2
