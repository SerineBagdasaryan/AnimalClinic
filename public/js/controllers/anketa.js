app.controller('PatientAnketaController', function ($scope,$http,$location) {
    // $http.get('/api/experts')
    //     .then(function (value) {
    //       $scope.expertss = value.data;
    //        $scope.id = value.data.id;
    //         //console.log($scope.experts);
    //     })
    var url= $location.url();
    var patientId = $location.url().slice(8);
    console.log(patientId);
    $scope.animal={};
    $scope.patientAnketa=function () {

        var obj={
            id:patientId,
            scopp:$scope.animal
        }

        console.log(obj,'oooop');
        $http.post('/patientsAnketa/',obj)
            .then(function (res) {
                $scope.single_experts = res.data;
                console.log('single',$scope.single_experts);
            })
    }
});




// app.controller('patientAnketaController', function ($scope,$http,$location) {
//     // $http.get('/api/experts')
//     //     .then(function (value) {
//     //       $scope.expertss = value.data;
//     //        $scope.id = value.data.id;
//     //         //console.log($scope.experts);
//     //     })
//     var url= $location.url();
//     var expertId = $location.url().slice(15);
//     console.log(expertId);
//     $scope.animal={};
//     $scope.patientAnketa=function () {
//    // var anketa=$scope.animal;
//    // console.log(anketa);
//    //
//    //
//    //  var Url = $location.url();
//    //  // console.log(Url);
//    //  var userId = Url.slice(15);
//    //  // console.log(userId);
//    //  // var data = {"id": userId};
//    //  // for (var i in data) {
//    //  //     // console.log('oooop',data[i]);
//    //  //     var exp=data[i];
//    //  // }
//    //  var obj={id:$location.url().slice(15),
//    //      'anketaa':anketa};
//     // console.log(data[i],'oooop');
//     // console.log(obj,'oooop');
//     $http.post('/patientsAnketa/',$scope.animal)
//         .then(function (res) {
//             $scope.single_experts = res.data;
//
//             console.log('single',$scope.single_experts);
//         })
//
//
// }
// });