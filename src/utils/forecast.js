const request = require("postman-request");


const forecast = (latitude, longtitude, callback) => {
    // const url = `http://api.weatherstack.com/current?access_key=8441b2bd3f37eb45c9637e4247b44961&query=${latitude},${longtitude}&units=f`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=db52ff1d1ebc58e384ae214ed9750890`
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather server.", undefined)
        } else if (body.error) {
            callback("Unable to find the location.", undefined);
        } else {
            // callback(undefined, `The weather is ${body.weather[0].main}. It feels like ${body.main.feels_like} degrees`);
            callback(undefined, {
                mainTemp: KtoF(body.main.temp),
                feelsLike: KtoF(body.main.feel_like),
                description: body.weather[0].description,
                humidity: body.main.humidity,
                pressure: body.main.pressure,
                windSpeed: body.wind.speed,
                windDegree: body.wind.deg,
                icon: body.weather[0].icon
            });
        }
    });
}

function KtoF(k){
    return Math.floor((k - 273.15) * 1.8 + 32)
}

module.exports = forecast;