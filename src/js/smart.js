var moods = [1, 2, 3, 34, 45, 47];


$(document).ready(function () {

    var div = $('#forecast');
    var count = 0;

    function changeNews() {

        var forecast = "<i class='icon-" + moods[count++] + " icon'></i><span class='row-text'>Tuesday 31, Thunder Strom</span><span class='row-text'>21 &deg; C</span>";

        div.fadeIn().delay(3500).fadeOut(function () {
            changeNews();
        }).html(forecast)
        if (count == moods.length) {
            count = 0;
        }
    }

    changeNews();

});