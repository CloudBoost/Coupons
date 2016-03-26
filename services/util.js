module.exports = function(){

	return {
		generateCouponId: function(){
			var id = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (i = 0; i < 8; i++) {
                id = id + possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return id;
		}
	}
}