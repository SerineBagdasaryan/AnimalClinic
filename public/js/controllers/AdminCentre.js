// app.controller('DirectorController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {
//
//     $scope.director = "This is director page";
//
//
//
//     $scope.url = document.URL;
//             console.log("documentURL",$scope.url);
//
//     $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);
//             console.log($scope.id);
//
//
//     var cn;
//     $http.get("/centres/" + $scope.id)
//         .then(function(response) {
//             $scope.center = response.data;
//             // console.log($scope.center.centreName);
//             cn = $scope.center.centreName;
//         });
//
//
//     (function(){
//         var element = function(id){
//             return document.getElementById(id);
//         }
//
//         // Get Elements
//         status = element('status');
//         var messages = element('messages');
//         var textarea = element('textarea');
//         var username = element('username');
//         var clearBtn = element('clear');
//
//         // Set default status
//         var statusDefault = status.textContent;
//         console.log(statusDefault);
//
//         var setStatus = function(s){
//             // Set status
//             status.textContent = s;
//
//             if(s !== statusDefault){
//                 var delay = setTimeout(function(){
//                     setStatus(statusDefault);
//                 }, 4000);
//             }
//         }
//
//         // Connect to socket.io
//         var socket = io.connect('http://127.0.0.1:4000');
//
//         // Check for connection
//         if(socket !== undefined){
//             console.log('Connected to socket...');
//
//             // Handle Output
//             socket.on('output', function(data){
//                 //console.log(data);
//                 if(data.length){
//                     for(var x = 0;x < data.length;x++){
//                         // Build out message div
//                         var message = document.createElement('div');
//                         message.setAttribute('class', 'chat-message');
//                         message.textContent = data[x].name+": "+data[x].message;
//                         messages.appendChild(message);
//                         messages.insertBefore(message, messages.lastChild);
//                     }
//                 }
//             });
//
//             // Get Status From Server
//             socket.on('status', function(data){
//                 // get message status
//                 setStatus((typeof data === 'object')? data.message : data);
//
//                 // If status is clear, clear text
//                 if(data.clear){
//                     textarea.value = '';
//                 }
//             });
//
//             // Handle Input
//             textarea.addEventListener('keydown', function(event){
//                 if(event.which === 13 && event.shiftKey == false){
//                     // Emit to server input
//                     socket.emit('input', {
//                         name:username.value,
//                         message:textarea.value
//                     });
//
//                     event.preventDefault();
//                 }
//             })
//
//
//         }
//
//     })();
//
//
//
//     $scope.send = function () {
//
//     }
//
//  var show = true;
//     $scope.logOut = function () {
//         var show = false;
//         // localStorage.clear();
//         var url = "http://" + $window.location.host + `/#!/centre`;
//         console.log(url);
//         $window.location.href = url;
//
//     }
//
// });


app.controller('DirectorController', function ($scope, $http, $location, $log, $window, $rootScope, $q) {

    $scope.director = "This is director page";

    $scope.url = document.URL;

    $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);

    var obj={
        id: $scope.id
    }



    $http.post('/centerExpert',obj)
        .then(function (res) {
            $scope.experts=res.data;
            for(var i in $scope.experts){
                console.log($scope.experts[i]._id,"hop")
            }



            $http.get('/find_patient')
                .then(function (res) {
                    $scope.patients=res.data;
                    console.log($scope.experts[i]._id,"ex");
                    // for (var  i in $scope.patients)
                    // console.log($scope.patients[i].expert);
                    // if($scope.patients[i].expert==$scope.experts[i]._id){
                    //     console.log($scope.experts[i]._id,"ex");
                    // }
                    //     // else {
                    //     console.log('chexav');
                    // }

                })
        })
    $http.get("/centres/" + $scope.id)
        .then(function(response) {
            $scope.data = response.data;
            console.log( $scope.data.centreName,"go");

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
                    if(data.clear){
                        textarea.value = '';
                    }
                });

                // Handle Input
                textarea.addEventListener('keydown', function(event){
                    if(event.which === 13 && event.shiftKey == false){
                        // Emit to server input
                        socket.emit('input', {
                            name:username.value=$scope.data.centreEmail,
                            message:textarea.value
                        });

                        event.preventDefault();
                    }
                })


            }

        })();

        })





    //	Post image
    var formData;

    $scope.changeImg = function() {
        formData = new FormData;
        var file=$("#image")[0].files[0];

        formData.append("image",file);
        formData.append("id",$scope.id);


        $http.post('/changeImg',formData,{
            transformRequest:angular.identity,
            headers:{
                'Content-Type':undefined
            }}).then(function(res){
            $scope.errors = res.data;

            console.log($scope.errors);
        });


    }

    $scope.deleteExpert = function(id) {
        $http.delete('/api/experts/' + id)
            .then(function(data) {
                $scope.experts = data;
                console.log(data);
            })
        $http.get('/api/experts')
            .then(function (value) {
                $scope.experts = value.data;
                // $scope.id = value.data.id;
                console.log($scope.experts);
            })

    }



    // $scope.director = "This is director page";
    //
    //
    //
    // $scope.url = document.URL;
    //         console.log("documentURL",$scope.url);
    //
    // $scope.id = $scope.url.substring($scope.url.lastIndexOf('?')+1);
    //         console.log($scope.id);
    //
    //
    // var cn;
    // $http.get("/centres/" + $scope.id)
    //     .then(function(response) {
    //         $scope.center = response.data;
    //         // console.log($scope.center.centreName);
    //         cn = $scope.center.centreName;
    //     });


    // (function(){
    //     var element = function(id){
    //         return document.getElementById(id);
    //     }
    //
    //     // Get Elements
    //     status = element('status');
    //     var messages = element('messages');
    //     var textarea = element('textarea');
    //     var username = element('username');
    //     var clearBtn = element('clear');
    //
    //     // Set default status
    //     var statusDefault = status.textContent;
    //     console.log(statusDefault);
    //
    //     var setStatus = function(s){
    //         // Set status
    //         status.textContent = s;
    //
    //         if(s !== statusDefault){
    //             var delay = setTimeout(function(){
    //                 setStatus(statusDefault);
    //             }, 4000);
    //         }
    //     }
    //
    //     // Connect to socket.io
    //     var socket = io.connect('http://127.0.0.1:4000');
    //
    //     // Check for connection
    //     if(socket !== undefined){
    //         console.log('Connected to socket...');
    //
    //         // Handle Output
    //         socket.on('output', function(data){
    //             //console.log(data);
    //             if(data.length){
    //                 for(var x = 0;x < data.length;x++){
    //                     // Build out message div
    //                     var message = document.createElement('div');
    //                     message.setAttribute('class', 'chat-message');
    //                     message.textContent = data[x].name+": "+data[x].message;
    //                     messages.appendChild(message);
    //                     messages.insertBefore(message, messages.lastChild);
    //                 }
    //             }
    //         });
    //
    //         // Get Status From Server
    //         socket.on('status', function(data){
    //             // get message status
    //             setStatus((typeof data === 'object')? data.message : data);
    //
    //             // If status is clear, clear text
    //             if(data.clear){
    //                 textarea.value = '';
    //             }
    //         });
    //
    //         // Handle Input
    //         textarea.addEventListener('keydown', function(event){
    //             if(event.which === 13 && event.shiftKey == false){
    //                 // Emit to server input
    //                 socket.emit('input', {
    //                     name:username.value,
    //                     message:textarea.value
    //                 });
    //
    //                 event.preventDefault();
    //             }
    //         })
    //
    //
    //     }
    //
    // })();


    // var show = true;
    $scope.logOut = function () {
        // var show = false;
        // localStorage.clear();
        var url = "http://" + $window.location.host + `/#!/centre`;
        console.log(url);
        $window.location.href = url;

    }

});


