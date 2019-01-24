app.controller('SingleCenterController', function ($scope,$http,$location) {
var url=$location.url();
console.log(url);
var id=url.slice(14);
console.log(id);
$http.get('/centres/'+id)
    .then(function (res) {
        $scope.singleCenter=res.data;
        console.log('hy', $scope.singleCenter);

    })
    .catch(function (res) {
        console.log(res);
    })
});