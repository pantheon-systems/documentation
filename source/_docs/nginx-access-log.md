---
title: Parsing nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
tags: [logs]
categories: []
goaccess: true
contributors: [albertcausing]
---
Pantheon uses nginx web servers for optimal performance. Log files record the web server events and activities and can help you identify potential issues and gather information about users.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Requests served by <a href="/docs/varnish">Varnish</a> will not hit the nginx webserver and will not be logged in <code>nginx-access.log</code>.</p>
</div>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates on the fly server reports by parsing the `nginx-access.log` file. Use it to quickly identify the most used browsers and operating systems, or to debug failed requests—all from the command line.

## Before You Begin

Be sure that you have:

- [Terminus](/docs/terminus)
- [GoAccess](https://goaccess.io/download)
 - **Mac OS X**: Install via [Homebrew](http://brew.sh/)
 - **Windows**: Use [Cygwin](http://cygwin.com/install.html)

## Edit GoAccess Configuration

To parse the Pantheon `nginx-access.log` file with GoAccess, you'll need to specify the unique log formats.

Add the following lines to the `goaccess.conf` file, located in either `/etc/`, `/usr/etc/` or `/usr/local/etc/` depending on your installation method:
```
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %h - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T "%^"
```
## Automate GoAccess Reports
<p class="instruction">Download the following script to quickly pull a site's nginx log file and create an HTML report using GoAccess:</p>
<div class="script-file-header">
access_getlogs.sh
<a id="downloadLinkgoaccess"><button class="btn btn-default btn-download"><i class="fa fa-download" aria-hidden="true"></i>   Download Script
</button></a>
</div>
<pre><code id="access_getlogs">#!/bin/bash

type goaccess >/dev/null 2>&1 || { echo >&2 "GoAccess is not installed. Aborting. \n[+]https://pantheon.io/docs/nginx-access-log/ \n[+] https://goaccess.io/download"; exit 1; }


for i in "$@"
do
case $i in
    -s=*|--site=*)
    	SITE="${i#*=}"
		shift # --site=SiteName
    ;;
    -e=*|--env=*)
    	ENV="${i#*=}"
		shift # --env=[dev|test|live|multi-dev]
    ;;
    -u=*|--url=*)
	URL="${i#*=}"
		shift # --url=http://dev-ac2-d7-import-b.pantheonsite.io/
    ;;
    -d=*|--dir=*)
    	DIR="${i#*=}"
		shift # --dir=target_directory/name
    ;;
    -c=*|--ga_conf=*)
        GACONF="${i#*=}"
        shift # --ga_conf=/etc/goaccess.conf
    ;;
    *)
        # unknown option
    ;;
esac
done

if [ -z "${URL}" ]; then
  	if [ -z "${SITE}" ] && [ -z "${ENV}" ]; then
		echo "[-] --site and --env cannot be empty"
		exit 1;
	fi
else
 	SITE=${URL%.pantheonsite.io}
	SITE=${SITE%.pantheon.io}
	SITE=${SITE%.getpantheon.com}
	SITE=${SITE#dev-}
	SITE=${SITE#test-}
	SITE=${SITE#live-}

	ENV="$( cut -d '-' -f 1 <<< "$URL" )"
fi

SITEID=$(terminus site:info ${SITE} | sed -n 2p | awk -v N=$N '{print $2}')

echo "[+] SITE NAME: ${SITE} 		SITE ID: ${SITEID} 			ENV: ${ENV}"

if [ -z "${DIR}" ]; then
    mkdir -p ${SITE}
    TARGET=${SITE}
else
    mkdir -p ${DIR}
    TARGET=${SDIR}
fi

echo "[+] SAVING LOGS TO: ${TARGET}"

for app_server in `dig +short appserver.$ENV.$SITEID.drush.in`;
do
  	rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITEID@appserver.$ENV.$SITEID.drush.in:logs/nginx-access* $TARGET/as_$app_server/
done

echo "[+] DECOMPRESS GZ FILES"
find ./${TARGET} -name "*.gz" -exec gunzip -f {} \;

echo "[+] CONSOLIDATING NGINX-ACCESS LOGS"
if [ -e "${TARGET}/consolidated_nginx_access.log" ]; then
    rm -rf ${TARGET}/consolidated_nginx_access.log
fi
find ./${TARGET} -name "nginx-access*" -exec cat {} \; >> ${TARGET}/consolidated_nginx_access.log

echo "[+] EXPORTING GOACCESS REPORT HTML"

GOVER=$(goaccess -V | awk 'NR == 1 { print substr ($3,0,1)}')

[[ $GACONF ]] && conf=(-p "$GACONF")
if [[ $GOVER = 1 ]]; then
	goaccess -f "${TARGET}/consolidated_nginx_access.log" "${conf[@]}" -a -o "${TARGET}/${SITE}_report.html"
else
	goaccess -f "${TARGET}/consolidated_nginx_access.log" "${conf[@]}" > "${TARGET}/${SITE}_report.html"
fi

open ${TARGET}/${SITE}_report.html
echo "[+] DONE, LAUNCHING: "</code></pre>

<p class="instruction">Make the script executable:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#script-install">Copy</button>
<figure><pre id="script-install"><code class="command bash" data-lang="bash">chmod +x ~/Downloads/access_getlogs.sh</code></pre></figure>
</div>

<p class="instruction">Move the script to <code>/usr/local/bin/</code>:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#script-move">Copy</button>
<figure><pre id="script-move"><code class="command bash" data-lang="bash">sudo mv ~/Downloads/access_getlogs.sh /usr/local/bin/access_getlogs
</code></pre></figure>
</div>

<p class="instruction">Generate a report for a given site and environment:</p>
<div class="copy-snippet">
<button class="btn btn-default btn-clippy" data-clipboard-target="#script-run">Copy</button>
<figure><pre id="script-run"><code class="command bash" data-lang="bash">access_getlogs --site=&lt;site&gt; --env=&lt;env&gt;</code></pre></figure>
</div>



## See Also
- [Log Files on Pantheon](/docs/logs)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [PHP Slow Log](/docs/php-slow-log/)
- [PHP Errors and Exceptions](/docs/php-errors/)
- [Bots and Indexing](/docs/bots-and-indexing/)
