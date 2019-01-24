app.controller('CenterListController', function ($scope,$http) {

    $http.get('/find_experts')
        .then(function (value) {
            $scope.experts = value.data;
            // $scope.id = value.data.id;
            console.log($scope.experts);
        })

});