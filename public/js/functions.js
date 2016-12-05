
//globals
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//get the timestamp based on the calendar view
function getCalendarTimestamp(){
    switch (calendar.options.view){
        case 'year':
            return calendar.options.position.start.getFullYear();
            break;
        case 'day':
            return weekdays[calendar.options.position.start.getDay()]+', '+
                    months[calendar.options.position.start.getMonth()]+' '+
                    calendar.options.position.start.getDate()+' '+
                    calendar.options.position.start.getFullYear();
            break;
        default:
            return months[calendar.options.position.start.getMonth()]+', '+
                        calendar.options.position.start.getFullYear();
    }
}

//get todays timestamp
function getDateToday(){
    var today = new Date();
        var min = today.getMinutes();
        var hr = today.getHours();
        var ampm = "AM";
        if (hr>12){
            hr = hr - 12;
            ampm = "PM";
        }
        if (hr<10){
            hr='0'+hr;
        }
        if (min<10){
            min='0'+min;
        }
        var dd = today.getDate();
        
        var mm = today.getMonth(); //January is 0!
        mm = months[mm];
        
        var wd = today.getDay();
        wd = weekdays[wd];

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        var today = wd+', '+mm+' '+dd+' '+yyyy+' - '+hr+':'+min+' '+ampm;
        return today;
}
