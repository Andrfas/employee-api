app.controller('IndexCntrl', ['$scope', function($scope) {
    $scope.selectedCity;

    $scope.getCities = function(str) {
        // console.log('searchStr', str);
        return ['Kyiv', 'Moscow'];
    }

    $scope.selectCity = function() {
        console.log('city', $scope.selectedCity);
    }

    
}])