#!/bin/bash

printf "Remove empty directories... \n"
find ./gatsby/public -type d -empty -print

printf "\n Done."
