#!/bin/bash
FILENAME=2023-11-01-November.md
DATE_PREFIX+=("${FILENAME:0:10}")
while IFS= read -r line; do
    if [[ $line =~ "###" ]]; then
      RELEASE_NOTE_FILENAME=("${line:4}")
      RELEASE_NOTE_FILENAME="$(echo $DATE_PREFIX $RELEASE_NOTE_FILENAME| tr ' ' '-'| tr '.' '-'| tr '[:upper:]' '[:lower:]').md"
      echo "---" >> ./releasenotes/$RELEASE_NOTE_FILENAME
      echo "title: "${line:4} >> ./releasenotes/$RELEASE_NOTE_FILENAME
      echo "published_date: "'"'$DATE_PREFIX'"' >> ./releasenotes/$RELEASE_NOTE_FILENAME
      echo "categories: []" >> ./releasenotes/$RELEASE_NOTE_FILENAME
      echo "---" >> ./releasenotes/$RELEASE_NOTE_FILENAME
    fi
done <$FILENAME
