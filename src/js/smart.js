var moods = [1, 2, 3, 34, 45, 47];


$(document).ready(function () {

    var div = $('#forecast');
    var count = 0;

    function changeForecast() {

        var forecast = "<i class='icon-" + moods[count++] + " iconContent'></i><span class='content-text'>Tuesday 31, Thunder Strom</span><span class='content-text'>21 &deg; C</span>";

        div.fadeIn(600).delay(3500).fadeOut(function () {
            changeForecast();
        }).html(forecast)
        if (count == moods.length) {
            count = 0;
        }
    }

    changeForecast();

});
