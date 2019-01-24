app.controller('PatientAddController', function ($scope, $http, $location, $log, $window, $rootScope) {

    $http.get('/find_experts')
        .then(function (result) {
            $scope.experts = result.data;
            console.log($scope.experts);
        })

    var formData
    $scope.addPatient = function () {
        console.log($scope.patient);
        // console.log($scope.expert);

        formData = new FormData;
        for (var key in $scope.patient){
            formData.append(key,$scope.patient[key]);
        }
        var file=$("#patientImage")[0].files[0];
        formData.append("image",file);

        $http.post('/patientsInsert',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){

        });


        $scope.expert = {};
        $scope.patient = {};

    }


});


