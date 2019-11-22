# pass zabbix group name and redirect to trigger alert page of zabbix
pass name to this api and will redirect to its zabbix page ( but need already login)

# Concept
1. ask zabbix to grant you a token for the zabbix api
2. get request with group name and get the groupid
3. use the groupid to combin as the result url
4. redirect to this url



# environment variable

| Env var | Default value | Description |
| --- | --- | --- |
| ZABBIX_HOST | null | must be fill before you use , it is the url to access zabbix server |
| ZABBIX_USERNAME | null | must be fill before you use , it is the username that have permission to grant token|
| ZABBIX_USERNAME | null | must be fill before you use , it is the username that have permission to grant token|
| PORT | 8080 | expose port for access |
# How to reach page

the url will be `<yourservicedomain>/<group name>`

let said the name is `Web server 1` and your docker expose with localhost:8080
so the url for the report will be `http://localhost:8080/Web server 1`

and will redirect to something like:
http://<ZABBIX_HOST>/tr_status.php?groupid=<result gid>&hostid=0&show_triggers=1


