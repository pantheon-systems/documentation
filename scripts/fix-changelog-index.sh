#!/bin/bash

# Move changelog paginated files so the URLs work, for example /page/2.html to /page/2/index.html
for file in /documentation/output_dev/docs/changelog/page/*html
do
  name="$(basename "$file" .html)"
  mkdir -p /documentation/output_dev/docs/changelog/page/"$name"
  mv "$file" "output_dev/docs/changelog/page/"$name"/index.html"
done
