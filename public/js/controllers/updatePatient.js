app.controller('UpdateCentersController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {
    $scope.director = "This is director page";

    $scope.url = document.URL;

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);

//patients

    $http.get("/patients/" + $scope.id)
        .then(function(response) {
            $scope.data = response.data;

        })


    $http.get('/find_experts')
        .then(function (result) {
            $scope.experts = result.data;
            // console.log($scope.experts);
        })



//	Image
// $scope.changeImg = document.getElementById("changeImg");
//
// $scope.changeImg.addEventListener("mouseover", function( event ) {
//     document.getElementById("image").style.display = "block";
//
//     setTimeout(function() {
//         document.getElementById("image").style.display = "none";
//     }, 5000);
// }, false);



//	Post image
    var formData;

    $scope.updatePatient = function() {
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
});