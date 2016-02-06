app.controller('RegEmployeeCntrl', ['$scope', function($scope) {
    $scope.name = '';
    $scope.stud = 'stud1';
    $scope.changeEmplSelect = function(person){
        $scope.stud = person;
    }
}])