// app/routes.js

// load the todo model
var express=require('express');
var router=express.Router();
var multer = require('multer');

var path = require('path');

const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(port).sockets;
var port = require('port');
var uploadCentres = multer({dest:'images/centres'});
var uploadExperts = multer({dest:'images/experts'});
var uploadPatients = multer({dest:'images/patients'});
var Centre = require('./models/centre');
var Expert = require('./models/expert');
var Patient = require('./models/patient');
var Anceta = require('./models/anketa');
var fs = require('fs');
var ObjectId = require("objectid");




mongo.connect('mongodb://127.0.0.1/mongochat', { useNewUrlParser: true }, function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insertOne({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.DeleteOne({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});



// ========  expose the routes to our app with module.exports =========================
module.exports = function(app) {



    app.get('/api/anketa/:id', function (req, res, next) {
        Anceta.findById(req.params.id, function (err, data) {

            if (err)
                console.log("Data does not found!");

            res.json(data);
            next();

        });

    });

  app.post('/api/centres', uploadCentres.any(), function (req, res, next) {
        var regname=/^[A-Za-z]+$/;
        var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var regaddress=/^[a-zA-Z0-9\s\,\''\-]*$/;
        var regphone=/^[0-9]*$/;
        var errorObj = {};
        success = true;
        if(req.body.name==undefined){
            errorObj.nameErr="Please enter your center name"
            success = false;

            }
            // else {
        //     if (!req.body.name(regname)) {
        //         errorObj.nameErr = 'Write only leters';
        //         success = false;
        //     }
        // }
        if(req.body.owner==undefined){
            errorObj.ownerErr="Please enter owner name"
            success = false;
        }
        // else {
        //     if (!req.body.owner(regname)) {
        //         errorObj.ownerErr = 'Write only leters';
        //         success = false;
        //     }
        // }

        if(req.body.email==undefined){
            errorObj.emailErr="Please enter your email"
            success = false;
        }
        // else {
        //     if (!req.body.email(regEmail)) {
        //         errorObj.emailErr = 'Please enter example@gmail.com';
        //         success = false;
        //     }
        // }
        if(req.body.ownerEmail==undefined){
            errorObj.ownerEmailErr="Please enter ownerEmail"
            success = false;
        }
        // else {
        //     if (!req.body.ownerEmail(regEmail)) {
        //         errorObj.ownerEmailErr = 'Please enter example@gmail.com';
        //         success = false;
        //     }
        // }

        if(req.body.password==undefined){
            errorObj.passwordErr="Please enter your password"
            success = false;
        }
        if(req.body.address==undefined){
            errorObj.addressErr="Please enter your address"
            success = false;
        }
        // else {
        //     if (!req.body.address(regaddress)) {
        //         errorObj.addressErr = 'Enter correct address';
        //         success = false;
        //     }
        // }
        if(req.body.phone==undefined){
            errorObj.phoneErr="Please enter your phone"
            success = false;
        }
        // else {
        //     if (!req.body.phone(regphone)) {
        //         errorObj.phoneErr = 'Enter correct phone';
        //         success = false;
        //     }
        // }
        if(req.body.ownerPhone==undefined){
            errorObj.ownerPhoneErr="Please enter ownerPhone"
            success = false;
        }
        // else {
        //     if (!req.body.ownerPhone(regphone)) {
        //         errorObj.ownerPhoneErr = 'Enter correct owner phone';
        //         success = false;
        //     }
        // }
        // if(req.files[0] === undefined) {
        //
        //     errors.imageError = "Image is empty";
        //     success = false;
        // }
        // if(req.body.file==undefined){
        //     errorObj.originalnameErr="Please choose image"
        //     success = false;
        // }
        if (success == false)  {
            res.send(errorObj);
        } else {
            if (req.files) {
                req.files.forEach(function (file) {
                    console.log(file);
                    var filename = (new Date).valueOf() + "_" + file.originalname
                    fs.rename(file.path, 'public/images/centres/' + file.originalname, function (err) {
                        if (err) throw err;
                        var centre = new Centre({
                            centreName: req.body.name,
                            centreOwnerName: req.body.owner,
                            centreEmail: req.body.email,
                            centreOwnerEmail: req.body.ownerEmail,
                            centrePassword: req.body.password,
                            centreAddress: req.body.address,
                            centrePphone: req.body.phone,
                            centreOwnerPphone: req.body.ownerPhone,
                            image: file.originalname
                        })
                        centre.save(function (err, result) {
                            if (err) {
                            }
                            res.json(result);

                        });

                    });
                });
            }
        }


    });


    app.post('/clinic', function (req, res, next) {
        // console.log("centres",req.body);
        console.log("email", req.body.email);
        console.log("password", req.body.password);

        var errD = {};
        errD.success = true;
        errD.href = "";

        Centre.find(function (err, centeres) {
            if (err)

                console.log("Error 2");

            for (var key = 0; key < centeres.length; key++) {

                if (req.body.email == centeres[key].centreEmail && req.body.password == centeres[key].centrePassword) {
                    console.log(centeres[key].centreEmail + " " + centeres[key].centrePassword);
                    errD.success = true;
                    errD.href = `${centeres[key]._id}`;
                    errD.message = "";
                    break;
                } else {
                    console.log("Email or password incorrectly!");
                    errD.success = false;
                    errD.href = "";
                    errD.message = "Email or password incorrectly!";
                }
            }
            res.json(errD);
        });

    });


    app.get('/find_centers', function (req, res) {
        Centre.find(function (err, centeres) {
            if (err)
            // res.send(err)
                console.log("Error 2");
            res.json(centeres);
        });
    })


    app.get('/centres/:id', function (req, res, next) {
        Centre.findById(req.params.id, function (err, data) {

            if (err)
                console.log("Data does not found!");

            res.json(data);
            next();

        });

    });


    app.get('/api/patientAdd', function (req, res) {

        // use mongoose to get all patients in the database
        Patient.find(function (err, patients) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(patients); // return all patients in JSON format
        });
    });


    app.get('/api/patient/:patient_id', function (req, res) {
        console.log('hopa', req.params.patient_id);
        var id = (req.params.patient_id);

        // use mongoose to get a single nerd in the database
        Patient.findById(id, function (err, data) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            //res.send( data);
            res.json(data); //  res.json(data);

        });
    });


    app.get('/find_patient', function (req, res) {
        Patient.find(function (err, patients) {
            for (var i in patients) {
                // console.log(patients[i].expert,"hello");
            }

            if (err)
            // res.send(err)
                console.log("Error 2");
            res.json(patients);

        });
    })


    app.post('/patientsInsert', uploadPatients.any(), function (req, res, next) {

        console.log(req.body);
        console.log(req.files);
        var regname=/^[A-Za-z]+$/;
        var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var regaddress=/^[a-zA-Z0-9\s\,\''\-]*$/;
        var regphone=/^[0-9]*$/;
        var errorObj = {};
        success = true;
        if(req.body.petsName==undefined){
            errorObj.fullnameErr="Please enter your fullname"
            success = false;
        }
        if(req.body.ownername==undefined){
            errorObj.ownernameErr="Please enter ownername"
            success = false;
        }
        if(req.body.birthday==undefined){
            errorObj.birthdayErr="Please enter your pet birthday"
            success = false;
        }


        if(req.body.animals==undefined){
            errorObj.animalsErr="Please enter your pet type"
            success = false;
        }
        // else {
        //     if (!req.body.animals.obj(regname)) {
        //         errorObj.animalsErr = 'Write only leters';
        //         success = false;
        //     }
        // }
        if(req.body.expert==undefined){
            errorObj.expertErr="Please enter your expert"
            success = false;
        }



        if(req.body.username==undefined){
            errorObj.emailErr="Please enter your email"
            success = false;
        }
            // else {
        //     if (!req.body.username.obj(regEmail)) {
        //         errorObj.emailErr = 'Please enter example@gmail.com';
        //         success = false;
        //     }
        // }


        if(req.body.password==undefined){
            errorObj.passwordErr="Please enter your password"
            success = false;
        }
        if(req.body.address==undefined){
            errorObj.addressErr="Please enter your address"
            success = false;
        }
        // else {
        //     if (!req.body.address.obj(regaddress)) {
        //         errorObj.addressErr = 'Enter correct address';
        //         success = false;
        //     }
        // }
        if(req.body.phone==undefined){
            errorObj.phoneErr="Please enter your phone"
            success = false;
        }
        // else {
        //     if (!req.body.phone.obj(regphone)) {
        //         errorObj.phoneErr = 'Enter correct phone';
        //         success = false;
        //     }
        // }

        // if(req.files[0] === undefined) {
        //
        //     errors.imageError = "Image is empty";
        //     success = false;
        // }req.files
        // if(req.body.files==undefined){
        //     errorObj.originalnameErr="Please choose image"
        //     success = false;
        // }
        if (success == false)  {
            res.send(errorObj);
        } else {



            if (req.files) {
                req.files.forEach(function (file) {
                    console.log(file);
                    var filename = (new Date).valueOf() + "_" + file.originalname
                    fs.rename(file.path, 'public/images/patients/' + file.originalname, function (err) {
                        if (err) throw err;
                        var patient = new Patient({
                            petsName: req.body.petsName,
                            ownername: req.body.ownername,
                            birthday: req.body.birthday,
                            phone: req.body.phone,
                            username: req.body.username,
                            expert: req.body.expert,
                            password: req.body.password,
                            animals: req.body.animals,
                            address: req.body.address,
                            // count:req.body.count,
                            image: file.originalname
                        })
                        patient.save(function (err, result) {
                            if (err) {
                                console.log("Data does not save!")
                            }
                            console.log("It's OK!")
                            res.json(result);

                        });

                    });
                });
            }
        }

    });


    app.post('/patient', function (req, res, next) {
        // console.log("centres",req.body);
        console.log("email", req.body.email);
        console.log("password", req.body.password);

        var errD = {};
        errD.success = true;
        errD.href = "";

        Patient.find(function (err, patients) {
            if (err)

                console.log("Error 2");

            for (var key = 0; key < patients.length; key++) {

                if (req.body.email == patients[key].username && req.body.password == patients[key].password) {
                    console.log(patients[key].expertEmail + " " + patients[key].expertPassword);
                    errD.success = true;
                    errD.href = `${patients[key]._id}`;
                    errD.message = "";
                    break;
                } else {
                    console.log("Email or password incorrectly!");
                    errD.success = false;
                    errD.href = "";
                    errD.message = "Email or password incorrectly!";
                }
            }
            res.json(errD);
        });

    });




    app.get('/patients/:id', function (req, res, next) {
        Patient.findById(req.params.id, function (err, data) {

            if (err)
                console.log("Data does not found!");

            res.json(data);
            next();

        });

    });


    app.delete('/api/patientAdd/:patientAdd_id', function (req, res) {
        console.log(req.body,"hy")
        Patient.deleteOne({
            _id: req.params.patientAdd_id
        }, function (err, patientAdd) {
            if (err)
                res.send(err);

            // get and return all the Expert after you create another
            Patient.find(function (err, patientAdds) {
                if (err)
                    res.send(err)
                res.json(patientAdds);
            });
        });
    });
    // patientsCenter

    app.post('/patientsCenter', function (req, res) {
        console.log(req.body.id,"py");
        var id = req.body.id;
        //
        Patient.find({expert: id}, function (err, patients) {
            if (err)
            // res.send(err);

                console.log(patients);
            for (var key in patients) {
                console.log(patients[key], "helloooooooooooo");

            }

            res.send(patients);

        });

    });
    //
   app.post('/expertPatient', function (req, res) {
        console.log(req.body.id);
        var id = req.body.id;
        Patient.find({expert: id}, function (err, patients) {
            if (err)
            // res.send(err);

                console.log(patients);
            for (var key in patients) {
                console.log(patients[key], "helloooooooooooo");

            }

            res.send(patients);

        });

    });
    //



    app.post('/centerExpert', function (req, res) {
        console.log(req.body.id);
        var id = req.body.id;
        Expert.find({centre: id}, function (err, centres) {
            if (err)
            // res.send(err);
            // console.log(patients);
                for (var key in centres) {
                    console.log(centres[key], "helloooooooooooo");

                }

            res.send(centres);

        });

    });

    app.get('/centerExpert', function (req, res) {
        console.log(req.body.id,'b@');
        var id = req.body.id;
        Expert.find({centre: id}, function (err, centres) {
            if (err)
                for (var key in centres) {
                    console.log(centres[key], "helloooooooooooo");

                }

            res.send(centres);

        });

    });





    app.post('/changeCentre', uploadCentres.any(), function (req, res, next) {
        console.log(req.body,"vvvvvvvvooooooooo");

        errImg = {};
        errImg.success = true;
        errImg.message = "";

        if (req.files) {
            req.files.forEach(function (file) {
                console.log(file);
                var filename = (new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/centres/' + file.originalname, function (err) {
                    if (err) console.log("image_error");
                    Centre.findOne({_id: req.body.id}, function (err, centere) {
                        if (err) console.log("Error");
                        centere.centreName =req.body.name ;
                        centere.centreOwnerName =req.body.owner ;
                        centere.centreEmail =req.body.email ;
                        centere.centreOwnerEmail =req.body.ownerEmail;
                        centere.centrePassword =req.body.password ;
                        centere.centreAddress =req.body.address;
                        centere.centrePphone =req.body.phone;
                        centere.centreOwnerPphone =req.body.ownerPhone;
                        centere.image = file.originalname;
                        centere.save(function (err, result) {
                            if (err)

                                res.send(err);
                            res.json(result);

                        });


                    });


                });
            });
        }


    });
    //changExpert


    app.post('/changExpert', uploadExperts.any(), function (req, res, next) {
        console.log(req.body);
        errImg = {};
        errImg.success = true;
        errImg.message = "";
        if (req.files) {
            req.files.forEach(function (file) {
                console.log(file);
                var filename = (new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/experts/' + file.originalname, function (err) {
                    if (err) console.log("image_error");
                    Expert.findOne({_id: req.body.id}, function (err, expert) {
                        if (err) console.log("Error");
                        expert.firstname=req.body.firstname;
                        expert.lastname=req.body.lastname;
                        expert.username=req.body.username;
                        expert.password=req.body.password;
                        // expert.workPlace=req.body.workPlace;
                        expert.phone=req.body.phone;
                        expert.profession=req.body.profession;
                        expert.cell=req.body.cell;
                        expert.address=req.body.address;
                        expert.centre=req.body.centre;
                        expert.image = file.originalname;
                        expert.save(function (err, result) {
                            if (err)

                                res.send(err);
                            res.json(result);

                        });


                    });


                });
            });
        }

    });


    app.post('/changePatient', uploadPatients.any(), function (req, res, next) {
        console.log(req.body);

        errImg = {};
        errImg.success = true;
        errImg.message = "";

        if (req.files) {
            req.files.forEach(function (file) {
                console.log(file);
                var filename = (new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/patients/' + file.originalname, function (err) {
                    if (err) console.log("image_error");
                    Patient.findOne({_id: req.body.id}, function (err, patient) {
                        if (err) console.log("Error");
                        patient.petsName =req.body.petsName ;
                        patient.ownername =req.body.ownername ;
                        patient.birthday =req.body.birthday ;
                        patient.phone =req.body.phone ;
                        patient.animals =req.body.animals ;
                        patient.expert =req.body.expert;
                        patient.username =req.body.username ;
                        patient.password =req.body.password;
                        patient.address =req.body.address;
                        patient.image = file.originalname;
                        patient.save(function (err, result) {
                            if (err)

                                res.send(err);
                            res.json(result);

                        });


                    });


                });
            });
        } else {
            console.log("Please enter only image");
        }


    });

    app.post('/patientsAnketa/', function (req, res) {
        console.log('patientsAnket', req.body.id);
        var email;
       var id=req.body.id;
        Anceta.create({
            vaccine_name: req.body.scopp.vaccine_name,
            vaccine_date: req.body.scopp.vaccine_date,
            second_vaccine_name: req.body.scopp.second_vaccine_name,
            second_vaccine_date: req.body.scopp.second_vaccine_date,
            disease: req.body.scopp.disease,
            prescription: req.body.scopp.prescription,
            patient: req.body.id,
        }, function (err, patient) {
            if (err)
                res.send(err);
            console.log(patient);
            // res.json(patient);
        });
        Patient.findOne({_id:id}, function (err, patients) {
            if (err)
                res.send(err);

            console.log(patients.username,"username");
            email=patients.username;

            // res.send(patients);



        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fornodejstest@gmail.com',
                pass: 'ooo111'
            }
        });

        const mailOptions = {

            to:email, // list of receivers
            subject: 'Anceta', // Subject line
            html: '<p> Dear ' + req.body.scopp.vaccine_name + " " + req.body.scopp.vaccine_date + '</p>'// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)  {
                // console.log(err)
            }
            else {
                // console.log(info);
            }

        });

        var resultat ={resultat :"Patient Anceta send to email"};
        res.send(resultat);
        });


    });


    app.post('/expertPatientanketa/:id', function (req, res) {
        console.log(req.params.id, "hyt");
        var id = req.params.id;
        Anceta.find({patient: id}, function (err, patients) {
            if (err)
                res.send(err);

            console.log(patients);
            for (var key in patients) {
                console.log(patients[key], "helloooooooooooo");

            }

            res.send(patients);

        });

    });


    // create Expert and send back all Expert after creation


//
    app.post('/send', function (req, res) {
        console.log(req.body.username);
        Expert.find(function (err, expert) {
            if (err)
                res.send(err);
            for (var key = 0; key < expert.length; key++) {
                if (req.body.username === expert[key].username) {
                    res.send(expert[key].username)
                }
                else {
                    // res.send("");
                }
            }

        });


    })
    app.post('/sendP', function (req, res) {
        console.log(req.body.username);
        Patient.find(function (err, patient) {
            if (err)
                res.send(err);
            for (var key = 0; key < patient.length; key++) {
                if (req.body.username === patient[key].username) {
                    res.send(patient[key].username)
                }
                else {
                    // res.send("");
                }
            }

        });


    })
    app.post('/sendC', function (req, res) {
        console.log(req.body.username);
        Centre.find(function (err, centre) {
            if (err)
                res.send(err);
            for (var key = 0; key < centre.length; key++) {
                if (req.body.username === centre[key].centreEmail) {
                    res.send(centre[key].centreEmail)
                }
                else {
                    // res.send("");
                }
            }

        });


    })




    app.post('/expert', function(req, res,next) {
        // console.log("centres",req.body);
        console.log("email",req.body.email);
        console.log("password",req.body.password);

        var errD = {};
        errD.success = true;
        errD.href = "";

        Expert.find(function(err, experts) {
            if (err)

                console.log("Error 2");

            for (var key = 0; key < experts.length; key++) {

                if (req.body.email ==  experts[key].username && req.body.password ==  experts[key].password)  {
                    console.log(experts[key].expertEmail + " " + experts[key].expertPassword);
                    errD.success = true;
                    errD.href = `${experts[key]._id}`;
                    errD.message = "";
                    break;
                } else {
                    console.log("Email or password incorrectly!");
                    errD.success = false;
                    errD.href = "";
                    errD.message = "Email or password incorrectly!";
                }
            }
            res.json(errD);
        });

    });






    app.post('/changePassword', function (req, res) {
        console.log(req.body, "mo");
        var username = req.body.username;
        Expert.findOne({username: username}, function (err, expert) {
            if (err)
                res.send(err);
            expert.password = req.body.password;
            // console.log( expert.password);
            expert.save(function (err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });
            // for (var key in expert) {
            //     console.log(expert[key],"helloooooooooooo");
            //
            // }

            // res.send(expert.password);

        });

    })

    app.post('/changePasswordP', function (req, res) {
        console.log(req.body, "mo");
        var username = req.body.username;
        Patient.findOne({username: username}, function (err, patient) {
            if (err)
                res.send(err);
            patient.password = req.body.password;
            // console.log( expert.password);
            patient.save(function (err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });
            // for (var key in expert) {
            //     console.log(expert[key],"helloooooooooooo");
            //
            // }

            // res.send(expert.password);

        });

    })

    app.post('/changePasswordC', function (req, res) {
        console.log(req.body, "mo");
        var username = req.body.username;
        Centre.findOne({centreEmail: username}, function (err, centre) {
            if (err)
                res.send(err);
            centre.centrePassword = req.body.password;
            // console.log( expert.password);
            centre.save(function (err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });
            // for (var key in expert) {
            //     console.log(expert[key],"helloooooooooooo");
            //
            // }

            // res.send(expert.password);

        });

    })


    // delete a Expert
    app.delete('/api/patientAdd/:patientAdd_id', function (req, res) {
        Patient.deleteOne({
            _id: req.params.patientAdd_id
        }, function (err, patientAdd) {
            if (err)
                res.send(err);

            // get and return all the Expert after you create another
            Patient.find(function (err, patientAdds) {
                if (err)
                    res.send(err)
                res.json(patientAdds);
            });
        });
    });

    app.delete('/patientAnketa/:patientAdd_id', function (req, res) {
        Anceta.deleteOne({
            _id: req.params.patientAdd_id
        }, function (err, patientAdd) {
            if (err)
                res.send(err);
            res.json(patientAdd);
            // get and return all the Expert after you create another
            // Anceta.find(function (err, patientAdds) {
            //     if (err)
            //         res.send(err)
            //     res.json(patientAdds);
            // });
        });
    });

    app.put('/updatePatientanketa', function (req, res) {
        console.log(req.body.id,"cet");
        Anceta.findOne({_id: req.body.id}, function (err, anceta) {
            if (err) console.log("Err");
            anceta.vaccine_name =req.body.s.vaccine_name ;
            anceta.vaccine_date =req.body.s.vaccine_date ;
            anceta.second_vaccine_date =req.body.s.second_vaccine_date ;
            anceta.second_vaccine_name =req.body.s.second_vaccine_name;
            anceta.disease =req.body.s.disease ;
            anceta.prescription =req.body.s.prescription;
            anceta.patient =req.body.patient;
            anceta.save(function (err, result) {
                if (err)

                    res.send(err);
                res.json(result);

            });


        });

    })






    // ============= get all experts ===========================


    app.get('/find_experts', function (req, res) {

        // use mongoose to get all todos in the database
        Expert.find(function (err, experts) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.send(experts); // return all todos in JSON format
        });
    });

    //
    app.get('/api/experts/:expert_id', function (req, res) {
        console.log('hopa', req.params.expert_id);
        var id = (req.params.expert_id);
        Expert.findById(id, function (err, data) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            //res.send( data);
            res.json(data); //  res.json(data);

        });
    });


    // create Expert and send back all Expert after creation


    app.post('/api/experts',uploadExperts.any(),function(req, res,next) {

        console.log(req.body);
        console.log(req.files);
        var errorObj = {};
        success = true;
        if(req.body.firstname==undefined){
            errorObj.firstnameErr="Please enter your firstname"
            success = false;
        }

        if(req.body.lastname==undefined){
            errorObj.lastnameErr="Please enter your lastname"
            success = false;
        }

        if(req.body.centre==undefined){
            errorObj.centreErr="Please enter your centre"
            success = false;
        }
        //expert


        if(req.body.username==undefined){
            errorObj.emailErr="Please enter your email"
            success = false;
        }

        if(req.body.password==undefined){
            errorObj.passwordErr="Please enter your password"
            success = false;
        }
        if(req.body.address==undefined){
            errorObj.addressErr="Please enter your address"
            success = false;
        }

        if(req.body.phone==undefined){
            errorObj.phoneErr="Please enter your phone"
            success = false;
        }
        if(req.body.profession==undefined){
            errorObj.professionErr="Please enter your profession"
            success = false;
        }
        if(req.body.cell==undefined){
            errorObj.cellErr="Please enter your cell"
            success = false;
        }

        if (success == false)  {
            res.send(errorObj);
        } else {
        if(req.files){
            req.files.forEach(function(file){
                console.log(file);
                var filename=(new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/experts/' + file.originalname ,function(err){
                    if(err)throw err;
                    var expert = new Expert({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        username:req.body.username,
                        password:req.body.password,
                        phone:req.body.phone,
                        profession:req.body.profession,
                        cell:req.body.cell,
                        address:req.body.address,
                        centre:req.body.centre,
                        image:file.originalname
                    })
                    expert.save(function (err,result) {
                        if (err) {
                            console.log("Data does not save!")
                        }
                        console.log("It's OK!")
                        res.json(result);

                    });

                });
            });
        }
        }
    });




    // delete a Expert
    app.delete('/api/experts/:expert_id', function (req, res) {
        Expert.deleteOne({
            _id: req.params.expert_id
        }, function (err, expert) {
            if (err)
                res.send(err);

            // get and return all the Expert after you create another
            Expert.find(function (err, experts) {
                if (err)
                    res.send(err)
                res.json(experts);
            });
        });
    });




// //     // update a Expert
    app.put('/api/expertss', function (req, res) {
        console.log('hy', req.body);
        Expert.updateOne(
            {_id: req.body.expert_id},
            {
                name: req.body.name,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                gender: req.body.gender,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                profession: req.body.profession,
                workPhone: req.body.workPhone,
                filename: req.body.filename
            }, function (err, expert) {
                if (err)
                    res.send(err);
                res.send(expert);

            });

    })

};


