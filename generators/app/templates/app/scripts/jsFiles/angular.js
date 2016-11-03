var modelApp = angular.module('', [])

.controller('modelCtrl', ['$scope', '$http', function($scope, $http) {
    var refrech = function() {
        $http.get('/myapp/models').success(function(response) {
            $scope.models = response;
        });
    };

    refrech();

    $scope.addmodel = function() {
        $http.post('/myapp/models', $scope.model).success(function(response) {
            console.log(response);
            refrech();
        })
    };

    $scope.remove = function(id) {
        $http.delete('/myapp/models' + id).success(function(response) {
            refrech();
        })
    };

    $scope.update = function() {
        if (!$scope.model.password) delete $scope.model.password;
        $http.put('/myapp/models', $scope.model).success(function(response) {
            refrech();
        })
    };

    $scope.get = function(id) {
        $http.get('/myapp/models' + id).success(function(response) {
            $scope.model = response[0];
            refrech();
        })
    };

    $scope.deselect = function() {
        $scope.model = "";
    }

}]);
