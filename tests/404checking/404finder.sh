#!/bin/bash

# This file makes two logging files which can be downloaded and inspected.
#
# 1) A full status report of all URLs checked.
# 2) A list of URLs which returned 404 status codes, including their source.
#
# If any 404s are found, the script exits with a non-zero status code.

OUTPUT_FILE="status_report_$(date +%Y-%m-%d-%H-%M-%S).log"
ERROR_FILE="404_${OUTPUT_FILE}"

echo "Starting link spider on $URL..."

# This awk script now captures three things:
# 1. On a '--' line: The URL being requested (url=$3) and resets the referer.
# 2. On a 'Referer:' line: The source URL (referer=$2).
# 3. On a 'HTTP/' line: Prints [Referer] [Requested_URL] [Status_Code].
wget --header="Deterrence-Bypass: 1" --recursive --spider --no-parent -e robots=off \
    --server-response $URL 2>&1 | \
    awk '/^--/ {url=$3; referer="-"} /Referer:/ {referer=$2} /  HTTP\// {print referer, url, $2}' > ${OUTPUT_FILE}

echo "Spider complete. Parsing status report: ${OUTPUT_FILE}"

# Grep for 404s, then use awk to format the output clearly
# It now prints "Source: [Referer_URL] --> Broken: [Broken_URL]"
grep " 404" ${OUTPUT_FILE} | awk '{print "Source: " $1 " --> Broken: " $2}' | sort -u > ${ERROR_FILE}

if [[ -s "${ERROR_FILE}" ]]; then
    echo "Error: 404s found."
    echo "-----------------------------------"
    cat "${ERROR_FILE}"
    echo "-----------------------------------"
    exit 1
else
    echo "Success: No 404s found."
fi
