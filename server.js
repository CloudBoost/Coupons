var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
global.q = require('q');
global.app = express();
global.keys = require('./keys.js')();
global.config = require('./config.js')();
app.use(express.static(__dirname + '/public'));
global.app.use(bodyParser.json());
global.app.use(cors());
global.CB = require('cloudboost');
global.CB.CloudApp.init(global.keys.appId, global.keys.appKey);
global.app.listen(process.env.PORT || 8000,function(){
	require('./api/coupon.js')();
	global.couponService = require('./services/couponService')();
	global.util = require('./services/util.js')();
    console.log('server started');
});
