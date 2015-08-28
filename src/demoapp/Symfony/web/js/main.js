angular.module('bundy',[]).controller('IndexCtrl', function($scope, $http) {
    
    $http.get('/product/popular').success(function(data) {
        $scope.popularProduct = data;
    }).error(function(data) {
        alert('Error getting popular items');
    });
});