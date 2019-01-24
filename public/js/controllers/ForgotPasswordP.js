app.controller('ForgotPasswordPController', function ($scope,$http,$location,$rootScope) {
    $scope.show=true;
    $scope.hide=false;
$scope.sendEmail=function () {
    var obj = {
        username: $scope.username,
    }
    console.log(obj);
    $http.post('/sendP',obj)
        .then(function (res) {

            if (res.data) {
                $scope.show=false;
                $scope.hide=true;

                // console.log(res.data);
            }else {
                $scope.show=true;
                $scope.hide=false;
                // console.log(res.data.usernameError,"hy");
            }

        })

    $scope.sendPassword=function () {
        var ob={
            username: $scope.username,
            password: $scope.password,
        }
        // console.log($scope.password,"opo");
        console.log(ob);
        $http.post('/changePasswordP',ob)
            .then(function (res) {
                console.log(res.data);

            })
    }
    $scope.formData={};
}



});