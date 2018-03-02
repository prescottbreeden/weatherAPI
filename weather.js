console.log('Power Overwhelming...');


function getWeather(){
    // $('.weather').html(`<div class="loader"></div>
    //     </div><p>Gathering clouds...</p>`)
    var city = $('input').val();
    // setTimeout(function(){
        $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=695b0a235d913543bf21fff21ef4ed7a`, function(res){
            console.log(res);
            var fahr = Math.trunc(1.8*(res['main']['temp'] - 273) + 32);
            var fahrMax = Math.trunc(1.8*(res['main']['temp_max'] - 273) + 32);
            var fahrMin = Math.trunc(1.8*(res['main']['temp_min'] - 273) + 32);
            $('.weather').html(`
                <h2>${city}</h2>
                <h3>Temperature: ${fahr} °F</h3>
                <p>Humidity: ${res['main']['humidity']}</p>
                <p>High: ${fahrMax} °F</p>
                <p>Low: ${fahrMin} °F</p>
                <p>Wind: ${res['wind']['speed']} mph</p>
            `);
            }, "json");
    // },2000);
   
}



$(document).ready(function(){

    $('body').html(`
        <div class="wrapper">
            <h1>Current Weather</h1>
            <input type="text" class="city" placeholder="enter a city">
            <button class="submit-btn">Search for Weather</button>
            <div class="weather"></div>
        </div>
    `)

    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
          getWeather();;
        }
    });

    $(document).on('click','.submit-btn', function(){
        getWeather();
    })


// console.log('clicked',$('input').val())

})