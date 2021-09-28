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

echo "[+] SITE NAME: ${SITE}        SITE ID: ${SITEID}          ENV: ${ENV}"

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