var clientId = '107442237915-vgh7scnebat6j2dlga90e7uol10kf4n5.apps.googleusercontent.com';
var apiKey = 'AIzaSyDhRKy8MsehV3wjj_0dhksJvki6ODHmTWo';
var scopes = 'https://www.googleapis.com/auth/calendar';


var forecasts = [];

$(document).ready(function () {

    updateDate();
    var div = $('#forecast');
    var count = 0;
    getWeather();

    function rotateForecast() {

        div.fadeIn(3000).delay(2500).fadeOut(3000, function () {
            rotateForecast();
        }).html(forecasts[count++])
        if (count == forecasts.length) {
            count = 0;
        }
    }

    function getWeather() {
        $.simpleWeather({
            location: 'Wiesloch'
            , woeid: ''
            , unit: 'c'
            , success: function (weather) {
                var html = "<i class='icon-" + weather.code + " iconHeader'></i><span class='header-text'>" + weather.temp + "&deg;" + weather.units.temp + "</span>";
                $("#weather").html(html);
                for (var i = 0; i < weather.forecast.length; i++) {
                    forecasts[i] = "<i class='icon-" + weather.forecast[i].code + " iconContent'></i><span class='content-text'>" + weather.forecast[i].day + "," + weather.forecast[i].date + "  |  " + weather.forecast[i].high + "&deg;" + weather.units.temp + ", " + weather.forecast[i].text + "</span>"
                }
                rotateForecast();
                var timestamp = moment(weather.updated.substr(0, weather.updated.length - 5));
                $("#footer").html('<p>Weather updated ' + moment(timestamp).fromNow() + '&nbsp;&nbsp;</p>');
            }
            , error: function (error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });
    }
    setInterval(updateTime, 1000);
});


function updateDate() {
    $("#date").html(moment().format("ddd, MMMM do"));
}

function updateTime() {
    $('#time').html(moment().format('HH:mm:ss'));

}