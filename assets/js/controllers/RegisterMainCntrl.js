app.controller('RegisterMainCntrl', ['$scope', function($scope) {
	$scope.choose = ['student', 'company'];
  	$scope.changeSelect = function(person){
  		$scope.switcher = person;
  	}
}])