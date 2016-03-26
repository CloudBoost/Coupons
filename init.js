var mySql  = require('mysql');
var knex = require('knex');
module.exports = function(){
    var obj = knex({
        client: 'mysql',
        connection: {
            host     : global.keys.host,
            user     : global.keys.user,
            password : global.keys.password,
            database : global.keys.database
        },
        pool:{
            min : 0,
            max: 10
        }
    });

    return obj;
};