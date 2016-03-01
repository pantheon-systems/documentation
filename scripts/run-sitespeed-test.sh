#!/bin/bash

sitespeed.io -u http://1411sitesp-static-docs.pantheon.io/docs/ --budget budget.json -b firefox --skipTest=ycookiefree,avoidfont -r $CIRCLE_ARTIFACTS/sitespeed --suppressDomainFolder --outputFolderName test
