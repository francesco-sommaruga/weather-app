const request = require('postman-request');

const access_key = 'c74cc0f4fd3b259855509988dc218c21';

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) callback('Unable to connect to the service.', undefined);

        if (!body.current) callback('Unable to finde location. Please try again.', undefined);

        if (body.current) {
            callback(undefined, {
                forecastData: {
                    weatherDescription: body.current.weather_descriptions[0],
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                },
                location: body.location.name + ', ' + body.location.country,
            });
        }
    });
};

module.exports = forecast;
