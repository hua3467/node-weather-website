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