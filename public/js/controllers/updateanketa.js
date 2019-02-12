app.controller('UpdateanketaController', function ($scope,$http,$location) {
    var url= $location.url();
    var expertId = $location.url().slice(14);
    console.log(expertId);
    var o;
    var patientId;
    $http.get('/api/anketa/'+expertId)
        .then(function (value) {
            $scope.anketa = value.data;
            // $scope.id = value.data.id;
            console.log($scope.anketa.patient);
            patientId = $scope.anketa.patient;


            $scope.animal={};
            o={
                id: expertId,
                s: $scope.animal,
                patient:patientId
            };
            $scope.updateanketa = function() {
                $http.put('/updatePatientanketa', o).then(function (res) {
                    $scope.updated = res.data;
                });
            };
        })

});