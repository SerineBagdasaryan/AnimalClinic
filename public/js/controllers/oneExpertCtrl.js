app.controller('ProfileExpertController', function ($scope, $http, $location, $log, $window, $rootScope) {
    $scope.show=false;
    $scope.hide=false;
    var url=$location.url();
    console.log(url);
    var id=url.slice(11);
    console.log(id);

    $http.get('/api/experts/'+id)
        .then(function (res) {
            $scope.profile=res.data;
            console.log('no', $scope.profile.username);
            centreId=$scope.profile.centre;
            console.log('hn',centreId);
            $http.get('/centres/'+centreId)
                .then(function (res){
                    $scope.d = res.data
                    console.log( $scope.d.centreName,"y");

                })

            (function(){
                var element = function(id){
                    return document.getElementById(id);
                }

                // Get Elements
                status = element('status');
                var messages = element('messages');
                var textarea = element('textarea');
                var username = element('username');
                var clearBtn = element('clear');

                // Set default status
                var statusDefault = status.textContent;
                console.log(statusDefault);

                var setStatus = function(s){
                    // Set status
                    status.textContent = s;

                    if(s !== statusDefault){
                        var delay = setTimeout(function(){
                            setStatus(statusDefault);
                        }, 4000);
                    }
                }

                // Connect to socket.io
                var socket = io.connect('http://127.0.0.1:4000');

                // Check for connection
                if(socket !== undefined){
                    console.log('Connected to socket...');

                    // Handle Output
                    socket.on('output', function(data){
                        //console.log(data);
                        if(data.length){
                            for(var x = 0;x < data.length;x++){
                                // Build out message div
                                var message = document.createElement('div');
                                message.setAttribute('class', 'chat-message');
                                message.textContent = data[x].name+": "+data[x].message;
                                messages.appendChild(message);
                                messages.insertBefore(message, messages.lastChild);
                            }
                        }
                    });

                    // Get Status From Server
                    socket.on('status', function(data){
                        // get message status
                        setStatus((typeof data === 'object')? data.message : data);

                        // If status is clear, clear text

                    });

                    // Handle Input
                    textarea.addEventListener('keydown', function(event){
                        if(event.which === 13 && event.shiftKey == false){
                            // Emit to server input
                            socket.emit('input', {
                                name:username.value=$scope.profile.username,
                                message:textarea.value
                            });

                            event.preventDefault();
                        }
                    })


                }

            })();

        })

    // //	Image
    $scope.changeImg = document.getElementById("changeImg");

    $scope.changeImg.addEventListener("mouseover", function( event ) {
        document.getElementById("image").style.display = "block";

        setTimeout(function() {
            document.getElementById("image").style.display = "none";
        }, 5000);
    }, false);



    //	Post image
    var formData;

    $scope.changeImg = function() {
        formData = new FormData;
        var file=$("#image")[0].files[0];

        formData.append("image",file);
        formData.append("id",id);


        $http.post('/changeImg',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
            $scope.errors = res.data;

            console.log($scope.errors);
        });


    }




    var obj={
        id:id
    }



    // find_patient
    $http.get('/find_patient')
        .then(function (res) {
            $scope.prof=res.data;
            console.log('hy', $scope.profile);

            $http.post('/expertPatient',obj)
                .then(function (res) {
                    $scope.patients=res.data;
                    console.log('hy', res.data);
                    $scope.z=$scope.patients.length*100/$scope.prof.length;
                    console.log($scope.z,"%")
                })
        })
        .catch(function (res) {
            // console.log(res);
        })


    $scope.delete=function(id){
        console.log(id,"chto");
        $http.delete('/patientAnketa/'+id)
            .then(function(data) {
                // $scope.patientAnketa = data;
                console.log(data);
            })

    }
    $scope.anketaPatient=function(id){
        $scope.show=true;
        $scope.hide=true;
        $http.post('/expertPatientanketa/'+id)
            .then(function(res) {
                // var arr=[];
                $scope.anketa=res.data;
                console.log( $scope.anketa,"llaaa")

            })
    }


    $scope.deletePatient= function(id) {
        $http.delete('/api/patientAdd/'+id)
            .then(function(data) {
                $scope.patientAdds = data;
                console.log(data);
            })

    };


    $scope.logOut=function () {
        $location.url('expert');
    }
});













//
//
// app.controller('ProfileExpertController', function ($scope, $http, $location, $log, $window, $rootScope) {
//     var url=$location.url();
//     console.log(url);
//     var id=url.slice(15);
//     console.log(id);
//     // $http.get('/experts/'+id)
//     //     .then(function (res) {
//     //         $scope.profile=res.data;
//     //         console.log('no', $scope.profile.username);
//     //
//     //
//     //         (function(){
//     //             var element = function(id){
//     //                 return document.getElementById(id);
//     //             }
//     //
//     //             // Get Elements
//     //             status = element('status');
//     //             var messages = element('messages');
//     //             var textarea = element('textarea');
//     //             var username = element('username');
//     //             var clearBtn = element('clear');
//     //
//     //             // Set default status
//     //             var statusDefault = status.textContent;
//     //             console.log(statusDefault);
//     //
//     //             var setStatus = function(s){
//     //                 // Set status
//     //                 status.textContent = s;
//     //
//     //                 if(s !== statusDefault){
//     //                     var delay = setTimeout(function(){
//     //                         setStatus(statusDefault);
//     //                     }, 4000);
//     //                 }
//     //             }
//     //
//     //             // Connect to socket.io
//     //             var socket = io.connect('http://127.0.0.1:4000');
//     //
//     //             // Check for connection
//     //             if(socket !== undefined){
//     //                 console.log('Connected to socket...');
//     //
//     //                 // Handle Output
//     //                 socket.on('output', function(data){
//     //                     //console.log(data);
//     //                     if(data.length){
//     //                         for(var x = 0;x < data.length;x++){
//     //                             // Build out message div
//     //                             var message = document.createElement('div');
//     //                             message.setAttribute('class', 'chat-message');
//     //                             message.textContent = data[x].name+": "+data[x].message;
//     //                             messages.appendChild(message);
//     //                             messages.insertBefore(message, messages.lastChild);
//     //                         }
//     //                     }
//     //                 });
//     //
//     //                 // Get Status From Server
//     //                 socket.on('status', function(data){
//     //                     // get message status
//     //                     setStatus((typeof data === 'object')? data.message : data);
//     //
//     //                     // If status is clear, clear text
//     //
//     //                 });
//     //
//     //                 // Handle Input
//     //                 textarea.addEventListener('keydown', function(event){
//     //                     if(event.which === 13 && event.shiftKey == false){
//     //                         // Emit to server input
//     //                         socket.emit('input', {
//     //                             name:username.value=$scope.profile.username,
//     //                             message:textarea.value
//     //                         });
//     //
//     //                         event.preventDefault();
//     //                     }
//     //                 })
//     //
//     //
//     //             }
//     //
//     //         })();
//     //
//     //     })
//
//
//
//     //
//     // //	Image
//     // $scope.changeImg = document.getElementById("changeImg");
//     //
//     // $scope.changeImg.addEventListener("mouseover", function( event ) {
//     //     document.getElementById("image").style.display = "block";
//     //
//     //     setTimeout(function() {
//     //         document.getElementById("image").style.display = "none";
//     //     }, 5000);
//     // }, false);
//     //
//     //
//     //
//     // //	Post image
//     // var formData;
//     //
//     // $scope.changeImg = function() {
//     //     formData = new FormData;
//     //     var file=$("#image")[0].files[0];
//     //
//     //     formData.append("image",file);
//     //     formData.append("id",$scope.id);
//     //
//     //
//     //     $http.post('/changeImg',formData,{
//     //         transformRequest:angular.identity,
//     //         headers:{
//     //             'Content-Type':undefined
//     //         }}).then(function(res){
//     //         $scope.errors = res.data;
//     //
//     //         console.log($scope.errors);
//     //     });
//     //
//     //
//     // }
//
//
//
//
// var obj={
//         id:id
// }
//
//     $http.post('/expertPatient',obj)
//         .then(function (res) {
//             $scope.patients=res.data;
//             console.log('hy', res.data);
//             // console.log('hy', $scope.patient.animals);
//
//             // for ($scope.key in $scope.patient.animals)  {
//             //     console.log($scope.patient.animals[$scope.key]);
//             // }
//
//             $scope.update = function (id) {
//                 $scope.yesUpdate = function () {
//                     $scope.ancheta._id = id;
//                     console.log("$scope.ancheta ", $scope.ancheta);
//
//
//                     $http.post('/change', $scope.ancheta).then(function (res) {
//                         console.log("All ok");
//                         $scope.ResData =  res.data;
//                         console.log( $scope.ResData );
//                         //alert ($scope.ResData.id + "ID ունեցող պացիենին մերժվել է մուտք գործել համակարգ");
//                         //$route.reload();
//                     });
//
//                 };
//
//             };
//
//         })
//         .catch(function (res) {
//             console.log(res);
//         })
//
//
//
//
//     $scope.deletePatient= function(id) {
//         $http.delete('/api/patientAdd/' + id)
//             .then(function(data) {
//                 $scope.patientAdds = data;
//                 console.log(data);
//             })
//         // $http.get('/api/patientAdd')
//         //     .then(function (value) {
//         //         $scope.patientAdds = value.data;
//         //         console.log($scope.patientAdds);
//         //     })
//
//     };
//
//
//
//
//
//
//
//     $scope.logOut=function () {
//         $location.url('expert');
//         }
//
//
//
//
// });