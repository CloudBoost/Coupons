app.factory('couponService',function($http, $q){
   return {
       generate: function(){
            return $http.get("/generate/code");
       },
       
       addNew: function(code, description, limit, type, amount, validFrom, validUntil){

           var data = {
               "code": code,
               "description": description,
               "limit": limit,
               "type": type,
               "amount": amount,
               "validfrom": validFrom,
               "validuntil": validUntil
           }
           return $http.put("/generate", data);
       },
       
       delete: function(code){
           return $http.post("/delete", code);
       },
       
       list: function(){
           return $http.post("/couponlist");
       }
   } 
});