'use strict';

const express = require('express');
const request = require('request');
// Constants
const PORT = ${PORT};
const HOST = '0.0.0.0';
const ZABBIX_HOST = "http://monitor3.wisers.com/zabbix"
const ZABBIX_USERNAME = "${ZABBIX_USERNAME}"
const ZABBIX_PASSWORD ="${ZABBIX_PASSWORD}"
// App
const app = express();

var requestToken = function (req, res, next){
	var jsonData ={
		"jsonrpc": "2.0",
        	"method": "user.login",
                "params": {
                	"user": ZABBIX_USERNAME,
                        "password": ZABBIX_PASSWORD
                 },
                 "id": 1
	}
	var clientServerOptions = {
		uri: ZABBIX_HOST+'/api_jsonrpc.php',
		body: jsonData,
		method: 'GET',
		json: true,
		headers: {
			'Content-Type': 'application/json'
		}
	}
	request(clientServerOptions, function (error, response) {
		if(response != null){
			var token = response.body.result
			console.log('Token: ',response.body.result);
		}else{
			var token = null
			console.log('Error: ',error);
		}
		req.errorFromRequestToken = error
		req.requestToken =  token;
		next();
	});
}
app.use(requestToken)

app.get('/:groupname',(req, res) => {
//      try {
	console.log(req.params.groupname)
        console.log(req.requestToken)
        var jsonData ={
                "jsonrpc": "2.0",
                "method": "hostgroup.get",
                "params": {
                        "output": "extend",
                        "filter": {
                                "name": [
                                       req.params.groupname
                                ]
                         }
                },
                        "id": 1,
                        "auth": req.requestToken
        }
        var clientServerOptions = {
                uri: ZABBIX_HOST+'/api_jsonrpc.php',
                body: jsonData,
                method: 'GET',
                json: true,
                headers: {
                        'Content-Type': 'application/json'
                }
        }
        request(clientServerOptions, function (error, response) {
                if(response != null){
                        var groupid = response.body.result[0].groupid
                        console.log('groupid: ',groupid);
                        req.gid=groupid
                        var resulturl =  ZABBIX_HOST+'/tr_status.php?groupid='+groupid+'&hostid=0&show_triggers=1'

                        console.log('resulturl: ',resulturl);
			res.redirect(resulturl);
                }else{
                        console.log('Error: ',error);
                }


        });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} `);
