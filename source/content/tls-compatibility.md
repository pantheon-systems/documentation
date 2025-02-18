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
permalink: docs/guides/secure-development/tls-compatibility
reviewed: "2025-02-04"
---

This document describes TLS encryption, when it's used, and how to test TLS compatibility.

## What is TLS?

Transport Layer Security (TLS) is a widely adopted cryptographic security protocol that provides secure communication over a computer network. It is the successor to Secure Sockets Layer (SSL) and is used to secure connections between web servers and clients. One of the primary uses of TLS is to encrypt the communication between web applications and servers, such as when a user logs into a website or submits a form.

A web application uses TLS when communicating with another server or service, such as an API or a payment gateway. As such, it is essential to ensure that your site is compatible with the latest TLS standards to protect your users' data and maintain the security of your site.

A TLS connection is initiated by a "handshake". You can think of this as two computers introducing themselves to each other. As part of the TLS handshake, the two servers will acknowledge each other, determine what cryptographic algorithms to use, exchange session keys and handle authentication. This is when the version of TLS encryption is determined.

## TLS Compatibility

TLS 1.0 and 1.1 were published in 1999 and 2006, respectively. Both were deprecated in 2021 and are considered outdated and insecure. Pantheon servers support TLS 1.2 and 1.3 connections. This means any outgoing HTTP requests being made from the _application level_ must be with servers that also support TLS 1.2 or 1.3.

Pantheon application servers will _reject_ connections to applications that do not support TLS 1.2+.

<Alert title="What's affected?" type="info">

**Application requests** include things like cURL or remote HTTP requests (e.g. `wp_remote_get` in WordPress) against a server or service. They do _not_ include requests for remotely hosted JavaScript or CSS files that are loaded when a webpage is rendered. (Your web browser handles the TLS handshake for these types of requests.)

</Alert>

### How do I check TLS compatibility for my site?

You can check your whether site's codebase makes HTTP connections to servers that support TLS 1.2 or 1.3 by using the WordPress TLS Compatibility Checker plugin or via the command line.

<TabList>

<Tab title="WordPress" id="check-compatibility-wp" active={true}>

WordPress users can use the [Pantheon WP TLS Compatibility Checker](https://github.com/jazzsequence/wp-tls-compatibility-checker) to scan their site for outgoing TLS connections. The plugin can be run from the command line using WP-CLI or in the admin via a new TLS Compatibility page under the Tools menu. If any URLs are found that do not support TLS 1.2 or 1.3 connections, a list is provided on the TLS Compatibility page. <!-- TODO: Update the URL when the repository is moved to Pantheon Systems. -->

The plugin also adds issues to the Site Health screen after the tests have been run if URLs were found that do not support TLS 1.2+ connections.

View the project [README](https://github.com/jazzsequence/wp-tls-compatibility-checker/blob/main/README.md) for more detailed information about customizing the checks, installation and usage.

</Tab>

<Tab title="Drupal" id="check-compatibility-drupal">

A Drupal module with similar functionality will be made available in the near future.

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
* [Pantheon WP TLS Compatibility Checker](https://github.com/jazzsequence/wp-tls-compatibility-checker)