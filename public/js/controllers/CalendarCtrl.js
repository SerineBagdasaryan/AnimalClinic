app.controller('CalendarController', function ($scope,$http) {
      var PUBLIC_KEY = "AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k",
        CALENDAR_ID = "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com";
    
    $scope.options = {
        dataSource: new DevExpress.data.DataSource({
            store: new DevExpress.data.CustomStore({
                load: function(options) {
                    var result = $.Deferred();
                    $.ajax({
                        data: {showDeleted: false},
                        dataType: "json",
                        url: [
                            "https://www.googleapis.com/calendar/v3/calendars/",
                            CALENDAR_ID,
                            "/events?key=",
                            PUBLIC_KEY
                        ].join("")
                    }).done(function(response) {
                        result.resolve(response.items);
                    });
    
                    return result.promise();
                }
            })
        }),
        // editing: false,
        startDateExpr: "start.dateTime",
        endDateExpr: "end.dateTime",
        textExpr: "summary",
        startDayHour: 7,
        timeZone: "America/Los_Angeles",
        showAllDayPanel: false,
        views: ['day', 'workWeek', 'month'],
        currentView: 'workWeek',
        currentDate: new Date(),
        height: 500
    };

});


