const request = require("postman-request");


const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8441b2bd3f37eb45c9637e4247b44961&query=${latitude},${longtitude}&units=f`;
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather server.", undefined)
        } else if (body.error) {
            callback("Unable to find the location.", undefined);
        } else {
            callback(undefined, `The weather is ${body.current.weather_descriptions}. It feels like ${body.current.feelslike} degrees`);
        }
    });
}

module.exports = forecast;