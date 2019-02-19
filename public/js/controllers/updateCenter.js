app.controller('UpdateCenterController', function ($scope,$http,$location) {
    var y=$location.url();
    var page=y.slice(14);
console.log(page,"gt")
    $http.get('/centres/'+page)
        .then(function (res) {
               $scope.object =res.data;
               $scope.name=$scope.object.centreName;
               $scope.owner=$scope.object.centreOwnerName;
               $scope.email=$scope.object.centreEmail;
               $scope.ownerEmail=$scope.object.centreOwnerEmail;
               $scope.password=$scope.object.centrePassword;
               $scope.address=$scope.object.centreAddress;
               $scope.phone=$scope.object.centrePphone;
              $scope.ownerPhone=$scope.object.centreOwnerPphone;
               $scope.image=$scope.object.image;

                console.log( $scope.object.image,"cent");


$scope.updateCenters=function () {
    $scope.centre =
        {
            name : $scope.name,
            owner : $scope.owner,
            email : $scope.email,
            ownerEmail : $scope.ownerEmail,
            password : $scope.password,
            address : $scope.address,
            phone : $scope.phone,
            ownerPhone : $scope.ownerPhone,
            file : $scope.file,
        };
    console.log($scope.centre);




    var formData;
    formData = new FormData;
    for (var key in $scope.centre){
        formData.append(key,$scope.centre[key]);
    }
    // for (var key in  $scope.object){
    //     formData.append(key, $scope.object[key]);
    // }
    var file=$("#centreImage")[0].files[0];
    formData.append("image",file);
    formData.append("id",page);
    $http.post('/changeCentre',formData,{
        transformRequest:angular.identity,
        headers:{
            'Content-Type':undefined
        }}).then(function(res){
        // $scope.errors = res.data;

        console.log( formData,"cv");
    });


}
        })

});
