#!/bin/bash

sitespeed.io -u http://localhost:8000/docs --budget budget.json -b firefox --skipTest=ycookiefree,avoidfont -r $CIRCLE_ARTIFACTS/sitespeed --suppressDomainFolder --outputFolderName test
