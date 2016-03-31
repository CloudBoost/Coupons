var app = angular.module('coupons',
    [   'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngMessages'
    ]);
    
app.run(function ($rootScope, $location, userService) {
  //make it true if authentication is required.
  var authenticationRequire = false;
  var routesThatDontRequireAuth = ['/login'];
  if(!authenticationRequire){
    var routesThatDontRequireAuth = ['/login','/dashboard', '/coupons'];
  }
  
  var routeClean = function(route){
        if(routesThatDontRequireAuth.indexOf(route) === -1){
            for(var i=0;i<routesThatDontRequireAuth.length;i++){
                if(s.startsWith(route,routesThatDontRequireAuth[i])){
                    return true;
                }
            }
            return false;
        }else{
            return true;
        }
  };
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html"
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/home.html",
            controller: 'dashboard'
        })
        .state('coupons', {
            url: "/coupons",
            templateUrl: "views/coupon.html",
            controller: 'coupons'
        });
});