---
title: Load and Performance Testing
description: Learn how to monitor internal execution performance of your Pantheon Drupal or WordPress site.
category:
  - going-live
keywords: going live, testing, performance, new relic, varnish
---
We highly recommend load testing a site both prior and post launch to ensure your site is optimally configured.

## Before You Begin

You should:

- [Enable New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis#enable-new-relic) to monitor internal execution performance without needing any additional modules or tools.
- Have access to a command-line environment, preferably with administrative privileges.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
<strong>Load testing should only be performed on the Live environment</strong>. Dev has much lower default caching settings than other environments to facilitate iterative development. Test has the exact same configuration as Live, but Test can only have one appserver, while Live can have as many as your plan allows. If disruptive behavior occurs outside of the Live environment, the site may be temporarily disabled to prevent disruption to other customers.</div>

## Performance vs. Scalability

There are two things to test for:

1. **Performance**: the response time for an individual request
2. **Scalability**: the ability to deliver with optimal response time to a larger number of concurrent requests

High-performance is the ability to deliver a page in under a second; scalability is the ability to deliver that page in under a second for many requests. It's important to understand the difference between these two dimensions and that there are trade-offs between performance and scalability.

## Verify Varnish is Working

To verify that the [Varnish](/docs/articles/sites/varnish) cache is working, the `curl` command can be run with the `-I` flag to gather and display header information. Header information can also be obtained via [Firebug](http://en.wikipedia.org/wiki/Firebug_(software)) or [Inspect](http://en.wikipedia.org/wiki/Google_Chrome) in the browser. The results should be something like this:

```nohighlight
curl -I http://live-yoursite.pantheonsite.io
HTTP/1.1 200 OK
Server: nginx/1.0.10
Date: Fri, 17 Aug 2012 23:47:36 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
cache-control: public, max-age=300
last-modified: Fri, 17 Aug 2012 23:44:40 +0000
expires: Sun, 11 Mar 1984 12:00:00 GMT
etag: "1345247080"
X-Varnish: 1082592805 1082586928
Age: 176
Via: 1.1 varnish
X-Pantheon-Edge-Server: 108.166.96.132
Vary: Accept-Encoding, Cookie
```
The "Age" field should be greater than 0. If the max age is not greater than 0, please review  [Drupal's Performance and Caching Settings](/docs/articles/drupal/drupal-performance-and-caching-settings#drupal-7-performance-configuration) and [Varnish Caching for High Performance](/docs/articles/sites/varnish) documentation.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Until Varnish has been correctly configured, don't worry about further testing.</div>

## Timing an Uncached Page Request

Passing the curl command with `time` before it, as well as sending a `NO_CACHE` cookie, which prevents Varnish from caching the response, will test the actual response of the application containers backend:

    time curl -I -H "Cookie: NO_CACHE=1;" http://live-yoursite.pantheonsite.io

The command returns the following results. Note the appended timestamp at the bottom. The "real" time is the one to pay attention to:
```nohighlight
time curl -I -H "Cookie: NO_CACHE=1;" http://live-yoursite.pantheonsite.io
HTTP/1.1 200 OK
Server: nginx/1.0.10
Date: Fri, 17 Aug 2012 23:57:39 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
cache-control: public, max-age=300
last-modified: Fri, 17 Aug 2012 23:57:38 +0000
expires: Sun, 11 Mar 1984 12:00:00 GMT
etag: "1345247858"
Accept-Ranges: bytes
X-Varnish: 1082615375
Age: 0
Via: 1.1 varnish
X-Pantheon-Edge-Server: 108.166.96.132
Vary: Accept-Encoding, Cookie

real 0m0.874s
user 0m0.036s
sys 0m0.004s
```
Test specific-pages of a site by passing a specific URL, as well as the experience of a logged-in user by passing a PHP-Session ID.

To get the PHP-Session ID, log in to your site and check the browsers cookie setting and value. The Session ID can be passed in the following way:

    time curl -I -H "Cookie: SESSe6c673379860780ffbc45bdd6d9c1ab4=dKanNfIMe_0CnOMF7v1Qb5SpDN7UDvyQE8um-1Rpkcg;;" http://live-yoursite.pantheonsite.io

If you're not satisfied with the response time, focus should be shifted to optimizing the performance of the site.

## Testing Scale and Throughput

In order to test scale and throughput, we use AB, a simple tool made available by the Apache Project.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Do not raise the concurrency or total number of request values drastically. Small, measured tests should yield the proper results.</div>

Run the following command:
```nohighlight
ab -n 100 -c 5 http://live-yoursite.pantheonsite.io/
```
Varnish should now be properly configured, and what you've tested should generate good response times and a high requests per second.

As with `curl`, you can run `ab` with the following parameters: `-C NO_CACHE=1` parameter to stop Varnish from caching the response. `ab` returns the following output:
```nohighlight
ab -n 100 -c 5 -C NO_CACHE=1 http://live-yoursite.pantheonsite.io/
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking http://live-yoursite.pantheonsite.io (be patient).....done

Server Software: 10.176.69.43
Server Hostname: http://live-yoursite.pantheonsite.io
Server Port: 80

Document Path: /
Document Length: 30649 bytes

Concurrency Level: 5
Time taken for tests: 12.854 seconds
Complete requests: 100
Failed requests: 0
Write errors: 0
Total transferred: 3118447 bytes
HTML transferred: 3064900 bytes
Requests per second: 7.78 [#/sec] (mean)
Time per request: 642.705 [ms] (mean)
Time per request: 128.541 [ms] (mean, across all concurrent requests)
Transfer rate: 236.92 [Kbytes/sec] received

Connection Times (ms)
              min mean[+#sd] median max
Connect: 60 81 32.5 73 258
Processing: 411 554 150.2 496 1213
Waiting: 82 131 100.5 109 794
Total: 471 635 162.9 574 1280

Percentage of the requests served within a certain time (ms)
  50% 574
  66% 614
  75% 646
  80% 696
  90% 899
  95% 1010
  98% 1170
  99% 1280
 100% 1280 (longest request)
```
The output provides insight into the requests per second, the most critical element in regards to the scalability of a site. Pay attention to the 90/95% response time as well, as this gives an idea of how the site is actually performing. Check that the number of failed requests is 0; if it's not, this should be investigated.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Testing with a session cookie to emulate the experience of a logged-in user is extremely important, as the contrast between an anonymous user and a logged-in user may be drastically different.</div>

## Performance Goals

Response times vary from site to site depending on the size of your modules stack, database queries, etc. Generally, anything under 1 second is considered excellent, but this is up to you.

Emulating a logged in user's experience with `ab` is a key metric, as it provides the number of pages per second your site can generate on Pantheon. This number may determine whether or not you need to add additional application containers.

## Testing Tools

There are a number of other tools to consider when you are planning your load testing strategy. This can vary by the need for detail, nature of your site, or requirements for quality analysis.

<table class="table">
<tbody>
		<tr>
			<th>Testing Tool</th>
			<th>Documentation</th>
			<th>Acquisition</th>
		</tr>
		<tr>
			<td>Apache AB</td>
			<td><a href="http://httpd.apache.org/docs/2.2/programs/ab.html">Documentation</a></td>
			<td><a href="http://httpd.apache.org/download.cgi">Download</a></td>
		</tr>
		<tr class="tr_class1">
			<td>J-Meter</td>
			<td><a href="http://jmeter.apache.org/usermanual/index.html">Documentation</a></td>
			<td><a href="http://jmeter.apache.org/download_jmeter.cgi">Download</a></td>
		</tr>
		<tr>
			<td>The Grinder</td>
			<td><a href="http://grinder.sourceforge.net">Documentation</a></td>
			<td><a href="http://grinder.sourceforge.net/download.html">Download</a></td>
		</tr>
		<tr>
			<td>Blitz.io</td>
			<td><a href="http://blitz.io/docs/">Documentation</a></td>
			<td><a href="https://www.blitz.io/pricing#/subscriptions">Pricing</a></td>
		</tr>
	</tbody>
</table>

## See Also
- [Going Live](/docs/articles/going-live)
