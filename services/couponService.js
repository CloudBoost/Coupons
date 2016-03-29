module.exports = function(){
	
	var obj = {

		generate: function(code, description, limit, type, amount, validfrom, validuntil){
			var deferred = global.q.defer();
			var couponId = global.util.generateCouponId();
			var data = {};
			data.type = type;
			data.description = description;
			data.validity = validity;
			data.couponId = couponId;
			data.value = value;
            var obj = new CB.CloudObject("Coupon");
            obj.set("code", code);
            obj.set("description", description);
            obj.set("limit", limit);
            if(type === "percentage")
                obj.set("percentaget", true);
            else
                obj.set("percentage", false);
            obj.set("amount", amount);
            obj.set("validFrom", validfrom);
            obj.set("validUntil", validuntil);
            obj.save({
                success: function(result){
                    deferred.resolve(result);
                },
                error: function(err){
                    deferred.resolve(err);
                }
            });
            
			return deferred.promise;
		},

        list: function(page, total){
           var deferred = global.q.defer();
           var query = new CB.CloudQuery("Coupon");
           query.setLimit(99);
           query.find({
                success: function(object){
                    deferred.resolve(object.document);
                },
                error: function(err) {
                    deferred.reject(err);
                }
           });
           return deferred.promise;
        }, 
        
		apply: function(couponId,amount,redeem){
			var deferred = global.q.defer();
            var query = new CB.CloudQuery("Coupon");
            query.equalTo("code", couponId);
            query.find({
                success: function(result){
                    if(result.length === 0){
                        deferred.reject("Invalid Coupon");
                    }else{
                        if(!result[0].get("percentage")){
						    var discount = result[0].get("amount");
                        }else{
                            var discount = (result[0].get("amount") * amount)/100;
                        }
                        
                        if(redeem){
                            var _obj = {};
                            _obj.record = result[0].document;
                            _obj.discount = discount;
                            deferred.resolve(_obj);
                        }else{
                            deferred.resolve(discount);
                        }	
                    }
                },
                error: function(){
                    deferred.reject(err);
                }
            });
			return deferred.promise;
		},

		redeem: function(couponId,amount){
			var deferred = global.q.defer();
			obj.apply(couponId,amount, true).then(function(res){
                var object = new CB.CloudObject("Coupon", res.record._id);
                if(res.record.redemCount)
                    object.set("redemCount", res.record.redemCount + 1);
                else
                    object.set("redemCount", 1);
                object.save({
                    success: function(){
                        deferred.resolve(res.discount);
                    },
                    error: function(){
                        deferred.reject(err);
                    }
                });
			},function(err){
				deferred.reject(err);
			})
			return deferred.promise;
		},
        
        delete: function(couponId){
            var deferred = global.q.defer();
            var query = new CB.CloudQuery("Coupon");
            query.equalTo("code", couponId);
            query.find({
                success: function(res){
                    if(res.length > 0){
                        var obj = new CB.CloudObject("Coupon", res[0].document._id);
                        obj.delete({
                            success: function(data){
                                deferred.resolve("deleted");
                            },
                            error: function(err){
                                deferred.reject(err);
                            }
                        });
                    }else{
                        deferred.reject("Invalid Code");
                    }
                },
                error: function(err){
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

	}
	return obj;
}