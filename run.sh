#!/bin/sh
CMD="casperjs --cookies-file=cookie.txt bin/$1.js"
$CMD
