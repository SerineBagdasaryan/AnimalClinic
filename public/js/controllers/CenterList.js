app.controller('CenterListController', function ($scope,$http) {

    $http.get('/find_centers')
        .then(function (value) {
            $scope.centers = value.data;
            $scope.id = value.data.id;
            console.log($scope.centers);
        })
    // $scope.singleExpert = function(id) {
    //     console.log(id);
    //     $http.get('/api/experts/'+ id)
    //         .then(function (res) {
    //             $scope.single_experts = res.data;
    //
    //             console.log('single',$scope.single_experts);
    //         })
    //         .catch(function (res) {
    //             console.log(res);
    //         });
    // }





// // delete a expert after checking it
//     $scope.deleteExpert = function(id) {
//         $http.delete('/api/experts/' + id)
//             .then(function(data) {
//                 $scope.experts = data;
//                 console.log(data);
//             })
//         $http.get('/api/experts')
//             .then(function (value) {
//                 $scope.experts = value.data;
//                 // $scope.id = value.data.id;
//                 console.log($scope.experts);
//             })
//
//     };
});