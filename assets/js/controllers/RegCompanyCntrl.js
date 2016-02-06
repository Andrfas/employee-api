app.controller('RegCompanyCntrl', ['$scope', '$uibModal', function($scope, $uibModal) {
    $scope.page = 1;
    $scope.changePage = function(page) {
        $scope.page = page;
    }

    $scope.openSelectCityWindow = function() {
        console.log(123);
        $uibModal.open({
            animation: true,
            templateUrl: 'selCityModal.html',
            controller: 'SelCityModalCntrl'
            // size: size,
        });
    }
}])
