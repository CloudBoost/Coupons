module.exports = function(){
	
	var obj = {

		generate: function(type,description,validity,value){
			var deferred = global.q.defer();
			var couponId = global.util.generateCouponId();
			var data = {};
			data.type = type;
			data.description = description;
			data.validity = validity;
			data.couponId = couponId;
			data.value = value;
			global.dbService.insert("coupons",data).then(function(res){
				deferred.resolve(couponId);
			},function(err){
				deferred.resolve(err);
			});
			return deferred.promise;
		},

		apply: function(couponId,amount,redeem){
			var deferred = global.q.defer();
			global.dbService.select("coupons",couponId).then(function(res){
				if(res.length === 0){
					deferred.reject("Invalid Coupon");
				}else{
					if(res[0].type === "fixed"){
						var discount = res[0].value
					}else{
						var discount = (res[0].value*amount)/100;
					}
					if(redeem){
						var _obj = {};
						_obj.record = res[0];
						_obj.discount = discount;
						deferred.resolve(_obj);
					}else{
						deferred.resolve(discount);
					}	
				}
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		},

		redeem: function(couponId,amount){
			var deferred = global.q.defer();
			obj.apply(couponId,amount).then(function(res){
				global.util.update("coupons",couponId,res.value+1).then(function(){
					deferred.resolve(res.discount);
				},function(err){
					deferred.reject(err);
				})
			},function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		}

	}

	return obj;
}