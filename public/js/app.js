const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const cityName = document.querySelector("#city");
const temperatureDisplay = document.querySelector("#temperature_data");
const secondaryConditions = document.querySelectorAll(".condition p");
const description = document.querySelector("#description");
const unitF = document.querySelector("#unitF");
const unitC = document.querySelector("#unitC");
const weatherIcon = document.querySelector("#temperature img");

let currentLocation = {
    lat: 46.8854672,
    lon: -96.8008658
}


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

if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition( (result) => {
        currentLocation.lat = result.coords.latitude;
        currentLocation.lon = result.coords.longitude;
        forecast(currentLocation.lat, currentLocation.lon, (obj) => {
            console.log(obj);
            showInfo(obj);
        })
    }, (e) => {
        console.log(e);
    });
} 

const forecast = (latitude, longtitude, callback) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=db52ff1d1ebc58e384ae214ed9750890`

    fetch(url)
    .then(response => response.json())
    .then(data => callback(data));
    
}

function showInfo(data) {
    cityName.textContent = data.name;
    mainData = data.main;
    temperatureDisplay.textContent = KtoF(mainData.temp);
    secondaryConditions[0].textContent = "Pressure: " + mainData.pressure;
    secondaryConditions[1].textContent = "Humidity: " + mainData.humidity;
    secondaryConditions[2].textContent = "Wind Speed: " + data.wind.speed;
    description.textContent = data.weather[0].main;
    weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    unitC.addEventListener("click", (e) => {
        temperatureDisplay.textContent = KtoC(mainData.temp);
        unitC.classList.remove("unitActive");
        unitF.classList.add("unitActive");
    });
    unitF.addEventListener("click", (e) => {
        temperatureDisplay.textContent = KtoF(mainData.temp);
        unitC.classList.add("unitActive");
        unitF.classList.remove("unitActive");
    });
}

