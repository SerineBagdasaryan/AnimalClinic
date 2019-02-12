app.controller('UpdateCentersController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {
    $scope.director = "This is director page";

    $scope.url = document.URL;

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);

//patients


    $http.get("/patients/" + $scope.id)
        .then(function(response) {
            $scope.object = response.data;
                $scope.petsName=$scope.object.petsName;
                $scope.ownername=$scope.object.ownername;
                $scope.birthday=$scope.object.birthday;
                $scope.phone=$scope.object.phone;
                $scope.username=$scope.object.username;
                $scope.expert=$scope.object.expert;
                $scope.password=$scope.object.password;
                $scope.animals=$scope.object.animals;
                $scope.address=$scope.object.address;
                $scope.image=$scope.object.image;
            $http.get('/find_experts')
                .then(function (result) {
                    $scope.experts = result.data;
                    // console.log($scope.experts);


//	Post image
    var formData;

    $scope.updatePatient = function() {
        $scope.patient =
            {
                petsName : $scope.petsName,
                ownername : $scope.ownername,
                birthday : $scope.birthday,
                phone : $scope.phone,
                username : $scope.username,
                expert : $scope.expert,
                password : $scope.password,
                animals : $scope.animals,
                address : $scope.address,
                file : $scope.file,
            };
        formData = new FormData;
        for (var key in $scope.patient){
            formData.append(key,$scope.patient[key]);
        }
        var file=$("#patientImage")[0].files[0];

        formData.append("image",file);
        formData.append("id",$scope.id);



        $http.post('/changePatient',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
            $scope.errors = res.data;

            console.log($scope.errors);
        });


    }
                })


        })

});