---
title: Debug Local DNS Cache
description: Recommendations for addressing SSH / Git authentication failures due to stale local DNS.
tags: [cdn]
reviewed: "2024-09-13"
contenttype: [doc]
innav: [true]
categories: [cache]
---

Pantheon application containers are sometimes migrated during routine platform maintenance. Following an application container migration, it is possible for Local DNS cache to cause SSH / Git authentication failures resulting in errors like `Permission denied (publickey)` or the following error, as the result of an operation like `git clone`:

```
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Retrying after the failure will resolve the issue, which is fine enough in the context of a single site but not so easy to handle across hundreds of sites. Those with large site portfolios using continuous integration and automated deployments might see this issue surface as a large spike in failed deployments across many sites. The scripts below provide a flexible and automated approach to managing local DNS cache issues when working with Pantheon sites. By flushing stale DNS entries and retrying failed commands, you can ensure smoother SSH / Git operations and reduce the likelihood of deployment failures due to stale DNS entries.

## Option 1: Eliminate Local DNS Caching
The first option is to assume the DNS cache is always stale and to flush caches prior to any interaction with a Pantheon codeserver.  In the example below, flush_dns_cache is called prior to executing any git command:

```
# Function to flush DNS cache based on the operating system
function flush_dns_cache() {
    case "$(uname -s)" in
        Darwin)
            # macOS
            echo "Flushing DNS cache on macOS..."
            sudo dscacheutil -flushcache
            sudo killall -HUP mDNSResponder
            ;;
        Linux)
            # Linux
            echo "Flushing DNS cache on Linux..."
            sudo systemd-resolve --flush-caches
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            # Windows
            echo "Flushing DNS cache on Windows..."
            ipconfig /flushdns
            ;;
        *)
            echo "Unsupported OS. DNS cache flush not performed."
            ;;
    esac
}

# Flush the DNS cache
flush_dns_cache


# Standard Pantheon git commands, eg

git clone ssh://codeserver.dev.[id]@codeserver.dev.[id].drush.in:2222/~/repository.git -b master mysite
```

### How to Use

1. Create a Script File: Save the above script in a file, e.g., flush_dns_and_clone.sh.
2. Make the Script Executable: Run chmod +x flush_dns_and_clone.sh to make the script executable.
3. Run the Script: Execute the script by running ./flush_dns_and_clone.sh.

This script will flush the DNS cache based on your operating system and then proceed with the git clone command.

## Option 2: Conditionally Flush Stale Local DNS and Retry Git Command Failures
To resolve git command errors such as `Permission denied (publickey)`, it is recommended to automatically flush stale local DNS caches for Pantheon application containers and retry failed commands in order to prevent CI deployment errors following Pantheon platform maintenance tasks.

In the example below, any git clone or push command error results in calling the check_dns_cache function to flush stale local DNS entries, and then the respective git command is retried up to 5 times:

```
function flush_dns_cache() {
    case "$(uname -s)" in
        Darwin)
            # macOS
            echo "Flushing DNS cache on macOS..."
            sudo dscacheutil -flushcache
            sudo killall -HUP mDNSResponder
            ;;
        Linux)
            # Linux
            echo "Flushing DNS cache on Linux..."
            sudo systemd-resolve --flush-caches
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            # Windows
            echo "Flushing DNS cache on Windows..."
            ipconfig /flushdns
            ;;
        *)
            echo "Unsupported OS. DNS cache flush not performed."
            ;;
    esac
}
function check_dns_cache {
  GIT_HOST=$(terminus connection:info ${SITE_ID}.${ENV_ID} --field=git_host)
  CACHED_IP=$(dig +short A $GIT_HOST)
  UNCACHED_IP=$(dig +short $GIT_HOST @8.8.8.8)
  echo "Checking for stale DNS cache for $GIT_HOST"
  # Check if CACHED_IP does not equal UNCACHED_IP
  if [ "$CACHED_IP" != "$UNCACHED_IP" ]; then
    echo "IP address has changed, flushing DNS cache"
flush_dns_cache
  else
    echo "IP address has not changed, no need to flush DNS cache"
  fi
}


function push_code {
# Example: if git clone fails, check for stale DNS cache and retry
MAX_RETRIES=5
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        git clone --branch $ENV_ID --depth 2 ${{ env.UPSTREAM_GIT_URL }}
 if [ $? -eq 0 ]; then
	 break
	 else
	 RETRY_COUNT=$((RETRY_COUNT+1))
	 check_dns_cache && echo "Retrying git clone command..."
	 fi
	done
      # Continue existing code

 	# Example: if git push fails, check for stale DNS cache and retry
MAX_RETRIES=5
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
       git push pantheon $BRANCH -vv
 if [ $? -eq 0 ]; then
	 break
	 else
	 RETRY_COUNT=$((RETRY_COUNT+1))
	 check_dns_cache && echo "Retrying git push command..."
	 fi
	done
}
push_code
```

### How to Use

1. Create a Script File: Save the above script in a file, e.g., conditional_flush_and_retry.sh.
2. Make the Script Executable: Run chmod +x conditional_flush_and_retry.sh to make the script executable.
3. Set Environment Variables: Ensure that SITE_ID, ENV_ID, and BRANCH environment variables are set appropriately.
4. Run the Script: Execute the script by running ./conditional_flush_and_retry.sh.

This script will check for stale DNS cache and flush it if necessary, then retry the git commands up to 5 times to ensure successful execution.
