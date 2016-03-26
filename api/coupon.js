module.exports = function(){
	
	global.app.post("/generate",function(req,res){
		var type = req.body.type;
		var description = req.body.description;
		var value = req.body.value;
		var validity = req.body.validity;
		global.couponService.generate(type,description,validity,value).then(function(result){
			res.status(200).send(result);
		},function(err){
			res.status(400).send(err);
		})
	})

	global.app.post("/apply",function(req,res){
		var couponId = req.body.couponId;
		var amount = req.body.amount;
		global.couponService.apply(couponId,amount).then(function(result){
			res.status(200).send(result);
		},function(err){
			res.status(400).send(err);
		})
	})

	global.app.post("/redeem",function(req,res){
		var couponId = req.body.couponId;
		var amount = req.body.amount;
		global.couponService.redeem(couponId,amount).then(function(result){
			res.status(200).send(result);
		},function(err){
			res.status(400).send(err);
		})
	})
}