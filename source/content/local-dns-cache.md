---
title: Debug Local DNS Cache
description: Recommendations for addressing SSH / Git authentication failures due to stale local DNS.
tags: [cdn]
reviewed: "2024-09-13"
contenttype: [doc]
innav: [true]
categories: [cache]
---
DNS caching issues are critical for Pantheon developers to understand and manage. Stale DNS entries can lead to SSH/Git authentication failures, potentially disrupting your workflow and deployments. This guide provides solutions to mitigate these issues, ensuring smooth operations across your Pantheon sites.

Pantheon application containers are sometimes migrated during routine platform maintenance. Following an application container migration, it is possible for Local DNS cache to cause SSH / Git authentication failures resulting in errors like `Permission denied (publickey)` or the following error, as the result of an operation like `git clone`:

```
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Retrying after the failure will resolve the issue, which is fine enough in the context of a single site but not so easy to handle across hundreds of sites. Those with large site portfolios using continuous integration and automated deployments might see this issue surface as a large spike in failed deployments across many sites.

## Before You Begin
### Use Cases
The scripts below provide a flexible and automated approach to managing local DNS cache issues when working with Pantheon sites. By flushing stale DNS entries and retrying failed commands, you can ensure smoother SSH / Git operations and reduce the likelihood of deployment failures due to stale DNS entries.

These scripts are particularly valuable for:

- Large-scale deployments managing multiple Pantheon sites
- CI/CD pipelines where automated Git operations are frequent
- Developers experiencing intermittent SSH/Git authentication failures

### Prerequisites
Before implementing these solutions, ensure you have:

- Terminus [installed](/terminus/install#install-terminus) and [authenticated](/terminus/install#authenticate)
- Appropriate permissions to execute system commands (for DNS cache flushing)
- Git installed and configured for your Pantheon sites

### Best Practices
* Implement these scripts in your local development environment to catch issues early
* Use Option 2 to minimize unnecessary cache flushes
* Regularly update your local Git configurations to match Pantheon's latest recommendations


## Option 1: Eliminate Local DNS Caching
The first option is to assume the DNS cache is always stale and to flush caches prior to any interaction with a Pantheon codeserver. In the example below, flush_dns_cache is called prior to executing any git command.

### Considerations
**Pros:**

- Ensures fresh DNS resolution for every Git operation
- Simplifies troubleshooting by eliminating DNS caching as a variable

**Cons:**
- May introduce slight performance overhead due to frequent cache flushing
- Requires elevated permissions to flush DNS cache on some systems

### Usage
1. Click the download file button below to download `flush_dns_and_clone.sh`
1. Replace the last line of the `flush_dns_and_clone.sh` file with the [clone command from your site dashboard](/guides/git/git-config#clone-your-site-codebase).
1. Execute the script as part of your deployment workflows by running:  
  ```bash{promptUser: user}
  ./flush_dns_and_clone.sh
  ```
This script will flush the DNS cache based on your operating system and then proceed with the git clone command.


<Download file="flush_dns_and_clone.sh" />

GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/flush_dns_and_clone.sh.txt bash GITHUB-EMBED


## Option 2: Conditionally Flush Stale Local DNS and Retry Git Command Failures

To resolve git command errors such as `Permission denied (publickey)`, it is recommended to automatically flush stale local DNS caches for Pantheon application containers and retry failed commands in order to prevent CI deployment errors following Pantheon platform maintenance tasks.

### Considerations

**Pros:**

- More efficient than Option 1, as it only flushes DNS cache when necessary
- Automatically retries failed Git commands, reducing manual intervention

**Cons:**

- Slightly more complex implementation compared to Option 1
- Requires setting up environment variables (`SITE_ID`, `ENV_ID`, `BRANCH`)
- May increase execution time for Git operations due to potential retries
- Depends on external commands (dig, terminus) which need to be available in the environment

In the example below, any git clone or push command error results in calling the `check_dns_cache` function to flush stale local DNS entries, and then the respective git command is retried. See [below](#detailed-function-explanations) for a more detailed explanation of the functions used in the script.

### Usage
1. Click the download file button below to download `conditional_flush_and_retry.sh`
1. Create environment variables within your CI pipeline for `SITE_ID`, `ENV_ID`, and `BRANCH`
1. Execute the script as part of your deployment workflows by running:
  ```bash{promptUser: user}
  ./conditional_flush_and_retry.sh
  ```

<Download file="conditional_flush_and_retry.sh" />

GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/conditional_flush_and_retry.sh.txt bash GITHUB-EMBED

#### Detailed Function Explanations

* `flush_dns_cache()`: This function detects the operating system and executes the appropriate DNS cache flushing command.

* `check_dns_cache()`: This function compares the cached IP with the actual IP of the Git host. If they differ, it triggers a DNS cache flush.

* `push_code()`: This function encapsulates Git clone and push operations with retry logic, calling `check_dns_cache()` on failures.

#### Large Portfolios
For large site portfolios:

* Consider implementing a cooldown period between retries to prevent overwhelming Pantheon's services
* Monitor the frequency of DNS cache flushes and adjust the retry logic if necessary


## Troubleshooting
### Permission denied when flushing DNS cache
Ensure your script has sudo privileges or run with elevated permissions.

### Git commands still failing after DNS flush
Verify your [SSH keys](/ssh-keys) are correctly set up in your Pantheon account.
