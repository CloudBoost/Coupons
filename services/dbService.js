module.exports = function(){
	
	return {

		insert: function(tableName,data){
			var deferred = global.q.defer();
			global.mySql.insert(data).into(tableName).then(function(res){
				deferred.resolve(res);
			},function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
		select: function(tableName,couponId){
			var deferred = global.q.defer();
			global.mySql.select().from(tableName).where({couponId:couponId}).where('validity','>=',new Date())
				.then(function(res){
					deferred.resolve(res);
				},function(err){
					deferred.reject(err);
				})
			return deferred.promise;
		},
		update: function(tableName,couponId,value){
			var deferred = global.q.defer();
			global.mySql(tableName).update({used:value}).where({couponId:couponId})
				.then(function(res){
					deferred.resolve(res);
				},function(err){
					deferred.reject(err);
				})
		}
	}
}