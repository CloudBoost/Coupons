app.controller('dashboard',function($scope, $location, couponService){
    $scope.page = 0;
    $scope.total = 10; 
    $scope.list = [];     
    
    $scope.getList = function(){
        couponService.list().then(function(result){
            
            $scope.list = result.data;
        }).catch(function(err){
            console.log(err);
        });
    }
    
    $scope.newCoupon = function() {
        $location.path('/coupons');
    }
    
     $scope.getList();
});