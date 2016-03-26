var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
global.q = require('q');
global.app = express();
global.keys = require('./keys.js')();
global.app.use(bodyParser.json());
global.app.use(cors());
global.app.listen(process.env.PORT || 8000,function(req,res){
	require('./api/coupon.js')();
	global.dbService = require('./services/dbService.js')();
	global.couponService = require('./services/couponService')();
	global.mySql = require('./init.js')();
	global.util = require('./services/util.js')();
    console.log('server started');
});
