const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messages = document.querySelectorAll(".message");

weatherForm.addEventListener( "submit", (e) => {
    e.preventDefault();

    const location = search.value;

    messages[0].textContent = "Loading...";
    messages[1].textContent = "";

    fetch("/weather?address=" + location)
    .then( response => {
        response.json()
        .then( data => {
            if (data.error) {
                messages[0].textContent = data.error;
            } else {
                messages[0].textContent = data.location;
                messages[1].textContent = data.forecast;
            }
        });
    });
});