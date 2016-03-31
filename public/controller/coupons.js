app.controller('coupons',function($scope, $location, couponService){
    
    $scope.validfrom = new Date();
    $scope.validuntil = new Date();
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
  
    function getDayClass(data) {
        var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                return $scope.events[i].status;
                }
            }
        }
        return '';
    }
    
    function disabled(data) {
        var date = data.date,
        mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
    
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
  
    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  
  $scope.dashboard = function() {
    $location.path('/dashboard');
  }
    
    $scope.addNew = function(){
        couponService.addNew($scope.code, $scope.description, $scope.limit, $scope.type, $scope.amount, $scope.validfrom, $scope.validuntil).then(function(result){
            console.log(result);
            alert("data saved");
        }).catch(function(err){
            console.log(err);
        });
    }
    
    $scope.generateCode = function(){
        couponService.generate().then(function(result){
            $scope.code = result.data;
        }).catch(function(){
            console.log(err);
        });
    }
    
    $scope.generateCode();
});
