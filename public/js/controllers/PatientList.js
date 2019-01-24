app.controller('PatientListController', function ($scope,$http) {

    $http.get('/find_patient')
        .then(function (value) {
            $scope.patients = value.data;
            // $scope.id = value.data.id;
            console.log($scope.patients,"hy");
        })

});