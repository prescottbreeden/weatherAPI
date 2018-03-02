console.log('Power Overwhelming...');

function getWeather(){

    var city = $('input').val();

        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=695b0a235d913543bf21fff21ef4ed7a`, function(res){
            var fahr = Math.trunc(1.8*(res['main']['temp'] - 273) + 32);
            var fahrMax = Math.trunc(1.8*(res['main']['temp_max'] - 273) + 32);
            var fahrMin = Math.trunc(1.8*(res['main']['temp_min'] - 273) + 32);
            $('.wrapper').html(`
                <div class="search-box">
                    <input type="text" class="city" placeholder="enter a city">
                </div>
                <div class="header">
                    <div class="temp">
                        <h1>${fahr}°F</h1>
                    </div>
                    <div class="city">
                        <h2>${city}</h2>
                    </div>
                </div>
                <div class="row1">
                    <div class="high-low">
                        <h4>${fahrMax}°F / ${fahrMin}°F</h4>
                        <p>High/Low</p>
                    </div>
                    <div class="humidity">
                        <h4>${res['main']['humidity']}%</h4>
                        <p>Humidity</p>
                    </div>
                    <div class="clouds">
                        <h4>${res['weather']['0']['description']}</h4>
                        <p>Sky</p>
                    </div>
                </div>

            `);
            }, "json");
        
            var cityConcat = ""
            for(var i = 0; i < city.length; i++){
                if(city[i]===" "){
                    cityConcat += '-'
                    continue;
                }
                cityConcat += city[i];
            }
            cityConcat = cityConcat.toLowerCase();   
        
        $.get(`https://api.teleport.org/api/urban_areas/slug:${cityConcat}/images/`, function(res){
            $('.wrapper').css('background-image',`url(${res['photos']['0']['image']['web']})`)
        }, "json");    
}

$(document).ready(function(){

    getWeather();

    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
          getWeather();;
        }
    });

})