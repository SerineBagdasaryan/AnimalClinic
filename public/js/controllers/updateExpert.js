app.controller('UpdateExpertController', function ($scope,$http,$location) {
    // $( function() {
    //     $( "#datepicker" ).datepicker();
    // } );

    var url= $location.url();//    /updateExpert?5bed9ae6185a731044510fea
    var expertId = $location.url().slice(14); //5bed9ae6185a731044510fea
    console.log(expertId);
    $http.get('/api/experts/'+expertId)
        .then(function (res) {
            $scope.object = res.data;
            $scope.firstname=$scope.object.firstname;
            $scope.lastname=$scope.object.lastname;
            $scope.username=$scope.object.username;
            $scope.password=$scope.object.password;
            $scope.phone=$scope.object.phone;
            $scope.profession=$scope.object.profession;
            $scope.cell=$scope.object.cell;
            $scope.address=$scope.object.address;
            $scope.centre=$scope.object.centre;
            $scope.image=$scope.object.image;

        })
    $http.get('/find_centers')
        .then(function (result) {
            $scope.centres = result.data;
            console.log($scope.centres);
        })

    $scope.expert={};
        $scope.updateExpert = function() {
            $scope.expert =
                {
                    firstname : $scope.firstname,
                    lastname : $scope.lastname,
                    username : $scope.username,
                    password : $scope.password,
                    phone : $scope.phone,
                    profession : $scope.profession,
                    cell : $scope.cell,
                    address : $scope.address,
                    centre : $scope.centre,
                    file : $scope.file,
                };
            console.log($scope.expert);
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

