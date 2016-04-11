#!/bin/bash

dir="$(dirname "$0")"

sh $dir/npmInstallGlobal.sh yo bower pm2
