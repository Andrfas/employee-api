app.controller('RegisterMainCntrl', ['$scope', function($scope) {
	$scope.choose = ['employee', 'company'];
    $scope.clientType;
  	$scope.changeClientSelect = function(person){
        // console.log(person);
  		$scope.clientType = person;
  	}
}])