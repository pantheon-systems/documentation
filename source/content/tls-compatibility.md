---
title: Transport Layer Security (TLS) 
subtitle: How to check that your site supports secure TLS-encrypted connections
description: Learn how to ensure your site is compatible with the latest security standards.
contenttype: [guide]
innav: [false]
categories: [security]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [cms, security]
contributors: [jazzsequence]
showtoc: true
permalink: docs/tls-compatibility
reviewed: "2025-03-07"
---

This document describes TLS encryption, when it's used, and how to test TLS compatibility.

## What is TLS?

Transport Layer Security (TLS) is a widely adopted cryptographic security protocol that provides secure communication over a computer network. It is the successor to Secure Sockets Layer (SSL) and is used to secure connections between web servers and clients. One of the primary uses of TLS is to encrypt the communication between web applications and servers, such as when a user logs into a website or submits a form.

A web application uses TLS when communicating with another server or service, such as an API or a payment gateway. As such, it is essential to ensure that your site is compatible with the latest TLS standards to protect your users' data and maintain the security of your site.

A TLS connection is initiated by a "handshake". You can think of this as two computers introducing themselves to each other. As part of the TLS handshake, the two servers will acknowledge each other, determine what cryptographic algorithms to use, exchange session keys and handle authentication. This is when the version of TLS encryption is determined.

## Pantheon Platform TLS Compatibility

TLS 1.0 and 1.1 were published in 1999 and 2006, respectively. Both were deprecated in 2021 and are considered outdated and insecure. Pantheon servers support TLS 1.2 and 1.3 connections. This means any outgoing HTTP requests being made from the _application level_ must be with servers that also support TLS 1.2 or 1.3.

For site environments using [PHP Runtime Generation 2](/php-runtime-generation-2), Pantheon application servers will _reject_ connections to external servers that do not support TLS 1.2+.

<Alert title="What's affected?" type="info">

**Application requests** include things like cURL or remote HTTP requests (e.g. `wp_remote_get` in WordPress) against a server or service. They do _not_ include requests for remotely hosted JavaScript or CSS files that are loaded when a webpage is rendered. (Your web browser handles the TLS handshake for these types of requests.)

</Alert>

### How do I check TLS compatibility for my site?

You can check your whether site's codebase makes HTTP connections to servers that support TLS 1.2 or 1.3 by using the WordPress TLS Compatibility Checker plugin or via the command line.

<TabList>

<Tab title="WordPress" id="check-compatibility-wp" active={true}>

WordPress users can use the [Pantheon WP TLS Compatibility Checker](https://github.com/pantheon-systems/wp-tls-compatibility-checker) plugin to scan their site for outgoing TLS connections. The plugin can be run from the command line using WP-CLI or in the admin via a new TLS Compatibility page under the Tools menu. If any URLs are found that do not support TLS 1.2 or 1.3 connections, a list is provided on the TLS Compatibility page (or shown in the terminal).

The plugin also adds issues to the Site Health screen after the tests have been run if URLs were found that do not support TLS 1.2+ connections.

View the project [README](https://github.com/pantheon-systems/wp-tls-compatibility-checker/blob/main/README.md) for more detailed information about customizing the checks, installation and usage.

</Tab>

<Tab title="Drupal" id="check-compatibility-drupal">

Drupal users can use the [Pantheon Drupal TLS Compatibility Checker](https://github.com/pantheon-systems/drupal_tls_checker) module to scan their site for outgoing TLS connections. This module supports Drupal 10/11 and can be run from the command line using Drush or in the admin at `/admin/config/development/tls-checker`. If any URLs are found in the `modules` or `themes` directories that do not support TLS 1.2 or 1.3 connections, a list is provided on that page (or shown in the terminal).

View the project [README](https://github.com/pantheon-systems/drupal_tls_checker/blob/main/README.md) for more detailed information about customizing the checks, installation and usage.

</Tab>

<Tab title="Command Line" id="check-compatibility-cli">

Individual URLs can be checked for TLS 1.2/1.3 compatibility with the `curl` command.

```bash{promptUser: user}
curl --tlsv1.2 --head --connect-timeout 10 "<your url to check>"
```

If you receive a 200 status code in the response (e.g. `HTTP/2 200`) along with header information, the check succeeded. If you receive an error (e.g. `TLS connect error`), it means the server you are attempting to make a connection to does not support that version of TLS.

<TabList>

<Tab title="Successful result" id="cli-test-success" active={true}>

```bash
HTTP/1.1 200 OK
Server: nginx/1.10.3 (Ubuntu)
Date: Tue, 04 Feb 2025 17:26:38 GMT
Content-Type: text/html
Content-Length: 502
Last-Modified: Tue, 28 Jan 2025 21:00:42 GMT
Connection: keep-alive
ETag: "6799457a-1f6"
Cache-Control: no-store
Accept-Ranges: bytes
```

</Tab>

<Tab title="Failed result" id="cli-test-fail">

```bash
curl: (35) TLS connect error: error:0A000102:SSL routines::unsupported protocol
```

</Tab>

</TabList>

A more robust script that scans all the files in a particular path can be found below:

<Download file="tls-1-2-compatibility-scan.sh" />

```bash
#!/bin/bash

# Directory to scan (ie, set to your WordPress custom code directory)
CODE_DIR="/path/to/your/code"

# Temporary files
TEMP_URL_FILE="/tmp/urls_to_check.txt"
TEMP_FAILED_FILE="/tmp/failed_tls_check.txt"
TEMP_CHECKED_HOSTS="/tmp/checked_hosts.txt"

# Initialize the temporary files
> "$TEMP_FAILED_FILE"
> "$TEMP_CHECKED_HOSTS"

# Function to check TLS compatibility using curl
check_tls() {
  local hostname="$1"
  echo -n "Checking TLS for $hostname... "

  # Use curl to test if the hostname supports TLS 1.2.
  curl --tlsv1.2 --silent --head --connect-timeout 10 "https://$hostname" >/dev/null 2>&1
  if [[ $? -eq 0 ]]; then
    echo "Supports TLS 1.2 or higher"
  else
    echo "Does NOT support TLS 1.2"
    echo "$hostname" >> "$TEMP_FAILED_FILE"
  fi
}

# Step 1: Search for URLs in the code
echo "Scanning $CODE_DIR for external connections..."
grep -Eroh "(https?://[a-zA-Z0-9./?=_-]+)" "$CODE_DIR" | sort -u > "$TEMP_URL_FILE"

if [[ ! -s "$TEMP_URL_FILE" ]]; then
  echo "No URLs found in the code."
  exit 0
fi

# Step 2: Extract unique hostnames and check TLS compatibility
echo "Found URLs. Checking TLS compatibility..."
while IFS= read -r url; do
  # Extract the hostname from the URL
  hostname=$(echo "$url" | sed -E 's|https?://([^:/]+).*|\1|')

  # Skip localhost or if this hostname has already been checked
  if [[ "$hostname" == "localhost" ]] || grep -qx "$hostname" "$TEMP_CHECKED_HOSTS"; then
    continue
  fi

  # Check TLS and mark hostname as checked
  check_tls "$hostname"
  echo "$hostname" >> "$TEMP_CHECKED_HOSTS"
done < "$TEMP_URL_FILE"

# Step 3: Output the failed hostnames
echo
echo "URLs requiring further investigation:"
if [[ -s "$TEMP_FAILED_FILE" ]]; then
  sort -u "$TEMP_FAILED_FILE"
else
  echo "None"
fi

# Cleanup
rm -f "$TEMP_URL_FILE" "$TEMP_FAILED_FILE" "$TEMP_CHECKED_HOSTS"

echo "TLS compatibility check complete."
```

<Alert title="TLS support in curl" type="info">

The version of `curl` installed on your system may determine which version of TLS can be checked. For checking TLS 1.3 compatibility _specifically_, you must have at least version 7.61.0 built with OpenSSL 1.1.1.

</Alert>

It's uncommon (but possible) for a server to support TLS 1.3 _but not_ 1.2. You can adjust your request to check for TLS 1.3 compatibility by passing the `--tls1.3` flag instead. In order to explicitly check TLS 1.3 from the commandline, you must ensure that your local machine supports the appropriate version of `curl` with a version of OpenSSL that supports TLS 1.3 connections.

</Tab>

</TabList>

### Testing a "bad" URL

[BadSSL.com](https://badssl.com/) provides a list of URLs to use as tests, including TLS versions. You can use the TLS 1.0, 1.1 and 1.2 links on that page if you want to see how the tests report errors (using either via the WordPress plugin or cURL command).

## More information

* [Transport Layer Security article on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [What is TLS?](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/)
* [What happens in a TLS handshake?](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)
* [Pantheon WP TLS Compatibility Checker](https://github.com/pantheon-systems/wp-tls-compatibility-checker)
* [Pantheon Drupal TLS Compatibility Checker](https://github.com/pantheon-systems/drupal_tls_checker)