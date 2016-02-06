app.controller('RegCompanyCntrl', ['$scope', function($scope) {
    $scope.page = 1;
    $scope.changePage = function(page){
        $scope.page = page;
    }
}])