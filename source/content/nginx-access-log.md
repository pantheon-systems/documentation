---
title: Parsing nginx Access Logs with GoAccess
description: Learn how to parse the nginx-access.log file with GoAccess to gather information on your visitors and referral traffic.
tags: [logs]
categories: []
goaccess: true
contributors: [albertcausing]
---
Pantheon uses nginx web servers for optimal performance. Log files record the web server events and activities and can help you identify potential issues and gather information about users.

<Alert title="Note" type="info">

Requests served by the [Pantheon Global CDN](/global-cdn) will not hit the nginx webserver and will not be logged in `nginx-access.log`.

</Alert>

[GoAccess](https://goaccess.io/) is a free, open source utility that creates on the fly server reports by parsing the `nginx-access.log` file. Use it to quickly identify the most used browsers and operating systems, or to debug failed requests—all from the command line.

## Before You Begin

Be sure that you have:

- [Terminus](/terminus)
- [GoAccess](https://goaccess.io/download)
 - **Mac OS X**: Install via [Homebrew](https://brew.sh/)
 - **Windows**: Use [Cygwin](https://cygwin.com/install.html)

## Edit GoAccess Configuration

To parse the Pantheon `nginx-access.log` file with GoAccess, you'll need to specify the unique log formats.

Add the following lines to the `goaccess.conf` file, located in either `/etc/`, `/usr/etc/` or `/usr/local/etc/` depending on your installation method:

```
time-format %H:%M:%S
date-format %d/%b/%Y
log-format %^ - %^ [%d:%t %^]  "%r" %s %b "%R" "%u" %T ~h{," }
```

## Automate GoAccess Reports
Download the following script to quickly pull a site's nginx log file and create an HTML report using GoAccess:


<Download file="../scripts/access_getlogs.sh" />

```bash
#!/bin/bash

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
		shift # --url=https://dev-ac2-d7-import-b.pantheonsite.io/
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
echo "[+] DONE, LAUNCHING: "
```

Make the script executable:

```bash
chmod +x ~/Downloads/access_getlogs.sh
```

Move the script to `/usr/local/bin/`:

```bash
sudo mv ~/Downloads/access_getlogs.sh /usr/local/bin/access_getlogs
```

Generate a report for a given site and environment:

```bash
access_getlogs --site=<site> --env=<env>
```



## See Also
- [Log Files on Pantheon](/logs)
- [MySQL Slow Log](/mysql-slow-log/)
- [PHP Slow Log](/php-slow-log/)
- [PHP Errors and Exceptions](/php-errors/)
- [Bots and Indexing](/bots-and-indexing/)
