'use strict';

// var angular = require('angular');
// var angularUiRouter = require('angular-ui-router');
// var uiRouter = require('@uirouter/angularjs');

// var dependencies = [uiRouter];

// angular.injector(modules);

var app = angular.module('meanApp', ["ngRoute", 'dx'
     // 'ngAnimate',
    // 'ngCookies',
    // 'ngMessages',
    // 'ngResource',
    // 'ngSanitize',
    // 'ngTouch',
    //  'ui.bootstrap',
    // 'colorpicker.module',
    // 'ui.router'
]);
app.config(function($routeProvider) {
    $routeProvider

          .when('/', {
            templateUrl: 'view/home.html',

        })
        .when('/centre', {
            templateUrl: 'view/centre.html',

        })
        .when('/expert', {
            templateUrl: 'view/expert.html',

        })
        .when('/patient', {
            templateUrl: 'view/patient.html',

        })
        .when('/adminCentre', {
            templateUrl: 'view/adminCentre.html',
        })
        .when('/oneExpert', {
            templateUrl: 'view/profileExpert.html',

        })
        .when('/calendar', {
            templateUrl: 'view/calendar.html',
        })
        .when('/dashboard', {
            templateUrl: 'view/dashboard.html',
        })
 .when('/dashboardExpert', {
            templateUrl: 'view/dashboardExpert.html',
        })

        .when('/example', {
            templateUrl: 'view/tui.calendar-master/examples/example.html',
        })
          .when('/CenterList', {
            templateUrl: 'view/CenterList.html',
        })
      .when('/expertList', {
            templateUrl: 'view/expertList.html',
        })

        .when('/patientList', {
            templateUrl: 'view/patientList.html',
        })

        .when('/singleCenter', {
            templateUrl: 'view/singleCenter.html',
        })
        .when('/singleExpert', {
            templateUrl: 'view/singleExpert.html',
        })

        .when('/singlePatient', {
            templateUrl: 'view/singlePatient.html',
        })
    .when('/profileExpert', {
            templateUrl: 'view/profileExpert.html',
        })
   .when('/profilePatient', {
            templateUrl: 'view/profilePatient.html',
        })
        .when('/patientAdd', {
            templateUrl: 'view/patientAdd.html',
        })
  .when('/updatePatient', {
            templateUrl: 'view/updatePatient.html',
        })

        .when('/updateExpert', {
            templateUrl: 'view/updateExpert.html',

        })
        .when('/singlePatient', {
            templateUrl: 'view/singlePatient.html',

        })
        .when('/anketa', {
            templateUrl: 'view/anketa.html',

        })
        .when('/ForgotPassword', {
            templateUrl: 'view/ForgotPassword.html',

        })  .when('/ForgotPasswordP', {
        templateUrl: 'view/ForgotPasswordP.html',

    })  .when('/ForgotPasswordC', {
        templateUrl: 'view/ForgotPasswordC.html',

    })
        .when('/profilePatient', {
            templateUrl: 'view/profilePatient.html',
        })
        .when('/adminCentre', {
            templateUrl: 'view/adminCentre.html',
        })


        .when('/updatePatient', {
            templateUrl: 'view/updatePatient.html',
        })
        .when('/updateanketa', {
            templateUrl: 'view/updateanketa.html',
        })


        .when('/updateCenter', {
            templateUrl: 'view/updateCenter.html',
        })

});

