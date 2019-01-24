app.controller('UpdateExpertController', function ($scope,$http,$location) {
    // $( function() {
    //     $( "#datepicker" ).datepicker();
    // } );
    $http.get('/find_centers')
        .then(function (result) {
            $scope.centres = result.data;
            console.log($scope.centres);
        })
    var url= $location.url();//    /updateExpert?5bed9ae6185a731044510fea
    var expertId = $location.url().slice(14); //5bed9ae6185a731044510fea
    console.log(expertId);
    $scope.expert={};
        $scope.updateExpert = function() {
            var formData;
                formData = new FormData;
                for (var key in $scope.expert){
                    formData.append(key,$scope.expert[key]);
                }
                var file=$("#file")[0].files[0];
                formData.append("image",file);
                formData.append("id",expertId);
                $http.post('/changExpert',formData,{
                    transformRequest:angular.identity,
                    headers:{
                        'Content-Type':undefined
                    }}).then(function(res){
                    $scope.errors = res.data;

                    console.log($scope.errors);
                });



        }



});

