#!/bin/sh
set -e
if [ "${ZABBIX_HOST}" == "$null" ] || [ "${ZABBIX_USERNAME}" == "$null" ] || [ "${ZABBIX_PASSWORD}" == "$null" ]; then
    echo "ZABBIX_HOST or ZABBIX_USERNAME or ZABBIX_PASSWORD cannot be empty"
    exit 1
fi

sed -i 's#${ZABBIX_USERNAME}#'${ZABBIX_USERNAME}'#g' /usr/src/app/server.js
sed -i 's#${ZABBIX_PASSWORD}#'${ZABBIX_PASSWORD}'#g' /usr/src/app/server.js
sed -i 's#${ZABBIX_HOST}#'${ZABBIX_HOST}'#g' /usr/src/app/server.js
sed -i 's#${PORT}#'${PORT-8080}'#g' /usr/src/app/server.js
exec "$@"
