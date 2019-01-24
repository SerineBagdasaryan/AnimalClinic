app.controller('singleExpertController', function ($scope,$http,$location) {


    var Url = $location.url();
    // console.log(Url);
    var userId = Url.slice(14);

    var centerId;
    $http.get('/api/experts/'+userId)
        .then(function (res) {
            $scope.single_experts = res.data;
            console.log('single',$scope.single_experts.centre);
            centerId=$scope.single_experts.centre;
            console.log(centerId,"bo");
            $http.get('/centres/'+centerId)
                .then(function (res){
                    $scope.d = res.data
                    console.log( $scope.d.centreName,"y");

                })
        })
        .catch(function (res) {
            console.log(res);
        });
});