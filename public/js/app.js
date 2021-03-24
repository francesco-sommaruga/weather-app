const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastElement = document.getElementById('forecast');
const errorElement = document.getElementById('error');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    forecastElement.textContent = 'Loading forecast for ' + search.value + '...';
    errorElement.textContent = '';

    fetch('/weather?location=' + search.value)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.error) {
                errorElement.textContent = response.error;
                forecastElement.textContent = '';
            }
            return response;
        })
        .then(({ location, forecastData, error } = {}) => {
            if (!error)
                forecastElement.textContent = `In ${location} is ${forecastData.weatherDescription.toLowerCase()},the humidity level is at ${
                    forecastData.humidity
                }%, the temperature is ${forecastData.temperature} °C and feels like ${forecastData.feelslike} °C.`;
        })
        .catch(error => {
            console.log(error);
        });
});
