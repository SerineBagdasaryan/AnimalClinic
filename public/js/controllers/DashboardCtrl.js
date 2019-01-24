app.controller('DashboardController', function ($scope,$http,$rootScope) {


    $http.get("/find_centers")
        .then(function(response) {
            $scope.centersData = response.data;
            console.log($scope.centersData);


            for (var i  in  $scope.centersData) {

                var info = $scope.centersData[i].centreName;
                console.log(info);

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "dark1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "Desktop Browser Market Share in 2016"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b style='color: red'>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [
                            { y: 51.08, label: "Chrome" },
                            { y: 27.34, label: "Internet Explorer" },
                            { y: 10.62, label: "Firefox" },
                            { y: 5.02, label: "Microsoft Edge" },
                            { y: 4.07, label: "Safari" },
                            { y: 1.22, label: "Opera" },
                            { y: 0.44, label: "Others" }
                               // { y: 5.08, label: info}
                        ]
                    }]
                });

                chart.render();
            }

        })
        .catch(function(response) {
           console.error('Gists error', response.status);
        })




});


