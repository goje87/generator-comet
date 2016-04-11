#!/bin/bash
dir="$(dirname "$0")"

sh $dir/npmInstallGlobal.sh cordova@latest

cordova prepare
