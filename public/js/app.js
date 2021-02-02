const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const cityName = document.querySelector("#city");
const temperatureDisplay = document.querySelector("#temperature_data");
const secondaryConditions = document.querySelectorAll(".condition p");
const unitF = document.querySelector("#unitF");
const unitC = document.querySelector("#UnitC");


weatherForm.addEventListener( "submit", (e) => {
    e.preventDefault();

    const location = search.value;

    fetch("/weather?address=" + location)
    .then( response => {
        response.json()
        .then( data => {
            if (data.error) {
                messages[0].textContent = data.error;
            } else {
                cityName.textContent = data.location;
                temperatureDisplay.textContent = data.mainTemp;
                secondaryConditions[0].textContent = "Pressure: " + data.pressure;
                secondaryConditions[1].textContent = "Humidity: " + data.humidity;
                secondaryConditions[2].textContent = "Wind Speed: " + data.windSpeed;
            }
        });
    });
});

function getLocation() {
    function success (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }
}

const forecast = (latitude, longtitude, callback) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=db52ff1d1ebc58e384ae214ed9750890`
    
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
                windDegree: body.wind.deg
            });
        }
    });
}