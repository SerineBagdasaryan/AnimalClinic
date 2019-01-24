app.controller('ExpertController', function ($scope, $http, $location, $log, $window, $rootScope) {

    $http.get('/find_centers')
        .then(function (result) {
            $scope.centres = result.data;
            console.log($scope.centres);
        })

    var formData
    $scope.addCenters = function () {
        console.log($scope.expert);
        // console.log($scope.centre);

        formData = new FormData;
        for (var key in $scope.expert){
            formData.append(key,$scope.expert[key]);
        }



        var file=$("#centreImage")[0].files[0];
        formData.append("image",file);

        $http.post('/api/experts',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
            $scope.errors=res.data;

        });


        $scope.expert = {};


    }

    $scope.checkExperts = function () {
        console.log($scope.check);
        console.log($location.$$path);
        var url = "/expert"
        var data = $scope.check;

        $http.post(url, data)
            .then(function(httpRequest) {

                $scope.experts = httpRequest.data;
                // console.log($scope.centres);

                if($scope.experts.success == true){
                    $scope.href = $scope.experts.href
                    var url = "http://" + $window.location.host + `#!oneExpert/?${$scope.href}`;
                    console.log(url);
                    $window.location.href = url;

                } else {

                    $location.path('/expert');
                    $scope.fullInnput = true;
                }


            });

    }


});