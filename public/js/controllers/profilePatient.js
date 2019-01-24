app.controller('ProfilePatientController', function ($scope, $http, $location, $log, $window, $rootScope) {

    var url=$location.url();
    console.log(url);
    var id=url.slice(16);
    console.log(id);
    var expertId;
    $http.get('/patients/'+id)
        .then(function (res) {
            $scope.profile=res.data;
            expertId=$scope.profile.expert;
            console.log('hn',expertId);
            $http.get('/api/experts/'+expertId)
                .then(function (res){
                    $scope.d = res.data
                    console.log( $scope.d.firstname,"y");

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
        .catch(function (res) {
            console.log(res);
        })
    $scope.logOut=function () {
        $location.url('/patient');

    }

    $scope.deletePatient= function(id) {
        $http.delete('/api/patientAdd/' + id)
            .then(function(data) {
                $scope.patientAdds = data;
                console.log(data);
            })


    };
    $scope.anketaPatient=function(id){
        $http.post('/expertPatientanketa/'+id)
            .then(function(res) {
                // var arr=[];
                $scope.anketa=res.data;
                console.log(res.data,"llaaa")


            })
    }


});