#!/bin/bash

set -eo pipefail

testme() {
    echo "Function's imported."
}

gatsby-tokens() {
# Set GitHub API token
    touch .env.production
    echo "GITHUB_API=$GITHUB_TOKEN" > .env.production
    echo "SEGMENT_KEY_NEW=$SEGMENT_KEY_NEW" >> .env.production
    echo "GTM_ID=$GTM_ID" >> .env.production
}
