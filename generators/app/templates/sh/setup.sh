#!/bin/bash

dir="$(dirname "$0")"

sh $dir/npmInstallGlobal.sh bower pm2
