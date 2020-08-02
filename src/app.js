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
    if(!req.query.address){
        return res.send({
            error: "Please enter an address."
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location} = {}) => {

        console.log(latitude, longtitude, location)
        if (error) {
            return res.send({ error})
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
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