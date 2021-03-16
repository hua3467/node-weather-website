const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const cityName = document.querySelector("#city");
const temperatureDisplay = document.querySelector("#temperature_data");
const secondaryConditions = document.querySelectorAll(".condition p");
const description = document.querySelector("#description");
const unit = document.querySelector("#unit");
const btnUnitSwitch = document.querySelector("#btnUnitSwitch");
const weatherIcon = document.querySelector("#temperature img");
const timeLabel = document.querySelector("#time");

let isCurrentF = true;

let currentLocation = {
    lat: 46.8854672,
    lon: -96.8008658
}


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    fetch("/weather?address=" + location)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.error) {
                        messages[0].textContent = data.error;
                    } else {
                        cityName.textContent = data.location;
                        temperatureDisplay.textContent = data.mainTemp;
                        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.forecast.icon + "@2x.png";
                        secondaryConditions[0].textContent = "Pressure: " + data.pressure;
                        secondaryConditions[1].textContent = "Humidity: " + data.humidity;
                        secondaryConditions[2].textContent = "Wind Speed: " + data.windSpeed;
                        description.textContent = data.description;
                        console.log(data);
                    }
                });
        });
});

if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((result) => {
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

switchUnit();
updateTime()

const forecast = (latitude, longtitude, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=db52ff1d1ebc58e384ae214ed9750890`

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
    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

function switchUnit() {
    btnUnitSwitch.addEventListener("click", (e) => {
        if (isCurrentF) {
            temperatureDisplay.textContent = FtoC(temperatureDisplay.textContent);
            unit.innerHTML = "&#8451;";
            e.target.innerHTML = "Show &#8457;"
        } else {
            temperatureDisplay.textContent = CtoF(temperatureDisplay.textContent);
            
            unit.innerHTML = "&#8457;";
            e.target.innerHTML = "Show &#8451;"
        }
        isCurrentF = !isCurrentF;
    });
}

function displayTime() {
    var dateNow = new Date()
    var ampm = dateNow.getHours() >= 12 ? ' PM' : ' AM';
    hours = dateNow.getHours() % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().length == 1 ? 0 + hours.toString() : hours;

    var minutes = dateNow.getMinutes().toString()
    minutes = minutes.length == 1 ? 0 + minutes : minutes;

    var seconds = dateNow.getSeconds().toString()
    seconds = seconds.length == 1 ? 0 + seconds : seconds;

    var month = (dateNow.getMonth() + 1).toString();
    month = month.length == 1 ? 0 + month : month;

    var dt = dateNow.getDate().toString();
    dt = dt.length == 1 ? 0 + dt : dt;

    var currentDate = month + "/" + dt + "/" + dateNow.getFullYear();
    //currentDate = currentDate + " - " + hours + ":" + minutes + ":" + seconds + " " + ampm;
    timeLabel.innerHTML = hours + ":" + minutes + ":" + seconds + " " + ampm;
    updateTime();
}

function updateTime() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('displayTime()', refresh)
}
