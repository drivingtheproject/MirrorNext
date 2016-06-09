var forecasts = [];
var stocks = [];
var divFooter;
var index = 0;
$(document).ready(function () {


    var divForecast = $('#forecast');
    divFooter = $("#footer");
    var count = 0;
    index = 0;
    updateDate();
    updateTime();
    getWeather();
    getStock();

    function rotateForecast() {

        divForecast.fadeIn(3000).delay(2500).fadeOut(3000, function () {
            rotateForecast();
        }).html(forecasts[count++])
        if (count == forecasts.length) {
            count = 0;
        }
    }

    function getWeather() {
        $.simpleWeather({
            location: 'Wiesloch',
            woeid: '',
            unit: 'c',
            success: function (weather) {
                var html = "<i class='icon-" + weather.code + " iconHeader'></i><span class='header-text'>" + weather.temp + "&deg;" + weather.units.temp + "</span>";
                $("#weather").html(html);
                forecasts = [];
                for (var i = 0; i < weather.forecast.length; i++) {
                    forecasts[i] = "<i class='icon-" + weather.forecast[i].code + " iconContent'></i><span class='content-text'>" + weather.forecast[i].day + "," + weather.forecast[i].date + "  |  " + weather.forecast[i].high + "&deg;" + weather.units.temp + ", " + weather.forecast[i].text + "</span>"
                }
                rotateForecast();
                //var timestamp = moment(weather.updated.substr(0, weather.updated.length - 5));
                //divFooter.html('<p>Weather updated ' + moment(timestamp).fromNow() + '&nbsp;&nbsp;</p>');
            },
            error: function (error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });
    }

    setInterval(updateTime, 1000);
    setInterval(getStock, 15 * 60 * 1000);



    /* var config = {
         apiKey: "AIzaSyDhRKy8MsehV3wjj_0dhksJvki6ODHmTWo",
         authDomain: "project-7701917495699723739.firebaseapp.com",
         databaseURL: "https://project-7701917495699723739.firebaseio.com",
         storageBucket: "project-7701917495699723739.appspot.com",
     };
     firebase.initializeApp(config);*/
});


function updateDate() {
    $("#date").html(moment().format("ddd, MMMM DD, YYYY"));
}

function updateTime() {
    $('#time').html(moment().format('HH:mm:ss'));

}

function getStock() {

    var $footer = $('.footer');
    $footer.marquee('destroy');
    $footer.html('');
    stocks = [];

    var symbol = ["SAP", "AAPL", "GOOG", "MSFT", "ORCL"];
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol="' + symbol + '"&format=json&env=store://datatables.org/alltableswithkeys&callback=';
    $.getJSON(url, function (data) {
        var items = [];
        var i = 0;
        if (data.query.count > 1) {
            $.each(data.query.results.quote, function (key, val) {
                if (val.Name) {
                    var icon = val.Change < 0 ? "<i class='icon-down common'></i>" : "<i class='icon-up common'></i>";
                    stocks[i++] = icon + "&nbsp;" + val.Name + "(" + val.LastTradePriceOnly + ")&nbsp;&nbsp;|&nbsp;&nbsp;";
                }

            });
        } else {
            var icon = data.query.results.quote.Change < 0 ? "<i class='icon-down common'></i>" : "<i class='icon-up common'></i>";
            stocks[i] = icon + "&nbsp;" + data.query.results.quote.Name + "(" + data.query.results.quote.LastTradePriceOnly + ")";
        }
        $footer.html(stocks);
        $footer.marquee({
            //speed in milliseconds of the marquee
            duration: 10000,
            //gap in pixels between the tickers
            gap: 0,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
        });
    });
}
