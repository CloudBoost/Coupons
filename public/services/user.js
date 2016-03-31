app.factory('userService',function($http, $q){
    return {
        userType: function(){
          return $scope.adminType;
        },

        saveUser: function(data){
          return $http.put("/user/update", data);
        },

        deleteUser: function(username){
          return $http.delete("/user/delete", username);
        },
        userList: function(){
          return $http.get("/user/list");
        },

        login: function(username, password, admin){
          var data = {};
          data.username = username;
          data.password = password;
          data.admin = admin;
          return $http.post("/login", data);

        },
        checkPassword: function(password){
          return  $http.post("/password/check", password);
        },

        changePassword: function(password){
          return  $http.post("/password/change", password);
        },

        isLoggedIn: function(){
            var token = localStorage.getItem('token');
            if(token){
                return true;
            }else{
                return false;
            }
        },
    };
});
