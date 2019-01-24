app.controller('CentreController', function ($scope, $http, $location, $log, $window, $rootScope) {
    var formData
    $scope.addCenters = function () {
        console.log($scope.centre);

        formData = new FormData;
        for (var key in $scope.centre){
            formData.append(key,$scope.centre[key]);
        }

        var file=$("#centreImage")[0].files[0];
        formData.append("image",file);

        $http.post('/api/centres',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
            $scope.errors = res.data;

        });

        $scope.centre = {};

    }


    $scope.checkCentres = function () {
        console.log($scope.check);
        console.log($location.$$path);
        var url = "/clinic"
        var data = $scope.check;

        $http.post(url, data)
            .then(function(httpRequest) {

                $scope.centres = httpRequest.data;
                // console.log($scope.centres);

                if($scope.centres.success == true){
                    $scope.href = $scope.centres.href
                    var url = "http://" + $window.location.host + `#!adminCentre/?${$scope.href}`;
                    console.log(url);
                    $window.location.href = url;

                } else {

                    $location.path('/centre');
                    $scope.fullInnput = true;
                }


            });

    }

});
