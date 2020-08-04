const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engin and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Aaron Yang"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About the App",
        name: "Aaron Yang"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Aaron Yang"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter an address."
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longtitude,
        location
    } = {}) => {

        console.log(latitude, longtitude, location)
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // });
});


app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Help article not fount."
    });
});

app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        });
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        message: "The page you are looking for is not found."
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});


const sample = {
    request: {
        type: "LatLon",
        query: "Lat 23.34 and Lon -94.23",
        language: "en",
        unit: "f"
    },
    location: {
        name: null,
        country: null,
        region: null,
        lat: null,
        lon: null,
        timezone_id: "America/Rankin_Inlet",
        localtime: "2020-08-02 16:15",
        localtime_epoch: 1596384900,
        utc_offset: "-5.0"
    },
    current: {
        observation_time: "09:15 PM",
        temperature: 84,
        weather_code: 116,
        weather_icons: [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
        ],
        weather_descriptions: [
            "Partly cloudy",
            "Sunny",
            "Light Rain",
            "Overcast",
            "Mostly Cloudy",
            "Cloudy",
            "Clear"
        ],
        wind_speed: 7,
        wind_degree: 86,
        wind_dir: "E",
        pressure: 1012,
        precip: 0,
        humidity: 73,
        cloudcover: 18,
        feelslike: 91,
        uv_index: 7,
        visibility: 6,
        is_day: "yes"
    }
}