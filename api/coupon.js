module.exports = function(){
	
	global.app.put("/generate",function(req,res){
        var code = req.body.code;
        var description = req.body.description;
        var limit = req.body.limit;
		var type = req.body.type;
		var amount = req.body.amount;
		var validfrom = req.body.validfrom;
        var validuntil = req.body.validuntil;
		global.couponService.generate(code,description, limit, type, amount, validfrom, validuntil).then(function(result){
			res.status(200).send(result);
		},function(err){
			res.status(400).send(err);
		})
	})

    global.app.get("/generate/code",function(req,res){
		res.status(200).send(global.util.generateCouponId());
	})
    
    global.app.post("/delete",function(req,res){
        var couponId = req.body.code;
		global.couponService.delete(couponId).then(function(result){
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
    
    global.app.get("/couponlist",function(req,res){
		global.couponService.list().then(function(result){
			res.status(200).send(result);
		},function(err){
			res.status(400).send(err);
		})
	})
}