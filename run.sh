#!/bin/sh
# usage
#  $ sh run.sh (quest|battle|box|...)
CMD="casperjs --cookies-file=cookie.txt bin/$1.js"
$CMD
