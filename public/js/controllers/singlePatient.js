app.controller('singlePatientController', function ($scope,$http,$location) {
    // $http.get('/api/experts')
    //     .then(function (value) {
    //       $scope.expertss = value.data;
    //        $scope.id = value.data.id;
    //         //console.log($scope.experts);
    //     })

    var Url = $location.url();
    // console.log(Url);
    var userId = Url.slice(15);
    // console.log(userId);
    // var data = {"id": userId};
    // for (var i in data) {
    //     console.log('oooop',data[i]);
    //     var exp=data[i];
    // }
    // console.log(data[i],'oooop');
    $http.get('/api/patient/'+userId)
        .then(function (res) {
            $scope.single_patient = res.data;

            console.log('single',$scope.single_patient);
        })
        .catch(function (res) {
            console.log(res);
        });





});
