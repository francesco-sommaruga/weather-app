//core modules
const path = require('path');
//npm modules
const express = require('express');
const hbs = require('hbs');
//local modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//express init
const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, './templates/views');
const partialsDirectoryPath = path.join(__dirname, './templates/partials');

//static files folder
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and views directory location
app.set('views', viewsDirectoryPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsDirectoryPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Jonni',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jonni',
        age: 25,
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jonni',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.location) return res.send({ error: 'Please provide a location' });

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });

        forecast(latitude, longitude, (error, { forecastData } = {}) => {
            if (error) return res.send({ error });
            res.send({ forecastData, location, address: req.query.location });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404help');
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log('Server up and running on port ' + port);
});
