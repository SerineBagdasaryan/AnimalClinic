app.controller('PatientController', function ($scope, $http, $location, $log, $window, $rootScope) {
    $( function() {
        $( "#datepicker" ).datepicker();
    } );
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
            $scope.errors=res.data;

        });


        // $scope.expert = {};
        $scope.patient = {};

    }


    $scope.checkPatient = function () {
        console.log($scope.check);
        console.log($location.$$path);
        var url = "/patient"
        var data = $scope.check;

        $http.post(url, data)
            .then(function(httpRequest) {

                $scope.patients = httpRequest.data;
                // console.log($scope.centres);

                if($scope.patients.success == true){
                    $scope.href = $scope.patients.href
                    var url = "http://" + $window.location.host + `#!profilePatient/?${$scope.href}`;
                    console.log(url);
                    $window.location.href = url;

                } else {

                    $location.path('/patient');
                    $scope.fullInnput = true;
                }


            });

    }

});

