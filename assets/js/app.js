var app = angular.module('EmployeeApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$controllerProvider', '$locationProvider',
    function($routeProvider, $controllerProvider, $locationProvider) {
        app.controller = $controllerProvider.register;

        app.resolveScriptDeps = function(dependencies){
            return function($q,$rootScope){
                var deferred = $q.defer();
                $script(dependencies, function() {
                    // all dependencies have now been loaded by $script.js so resolve the promise
                    $rootScope.$apply(function()
                    {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/templates/index.html',
                controller:'IndexCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                    '/js/controllers/IndexCntrl.js'
                ])}
            })
            .when('/registration', {
                templateUrl: '/templates/reg_empl.html',
                controller:'RegisterEmployeeCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                    '/js/controllers/RegisterEmployeeCntrl.js'
                ])}
            })
            .when('/registrationCompany', {
                templateUrl: '/templates/reg_comp.html',
                controller:'RegisterEmployeeCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                    '/js/controllers/RegisterEmployeeCntrl.js'
                ])}
            })

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
    }]);