var app = angular.module('favour', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/view1.html',
    controller: 'View1Ctrl'
  });
}]);

app.controller('View1Ctrl', function($scope, $http) {

});