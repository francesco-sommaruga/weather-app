const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastElement = document.getElementById('forecast');
const errorElement = document.getElementById('error');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    forecastElement.textContent = 'Loading forecast for ' + search.value + '...';
    errorElement.textContent = '';

    fetch('http://localhost:3000/weather?location=' + search.value)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.error) {
                errorElement.textContent = response.error;
                forecastElement.textContent = '';
            }
            console.log(response);
            return response;
        })
        .then(({ location, forecastData, error } = {}) => {
            if (!error)
                forecastElement.textContent = `In ${location} is ${forecastData.weatherDescription.toLowerCase()}, the temperature is ${
                    forecastData.temperature
                } and feels like ${forecastData.feelslike}`;
        })
        .catch(error => {
            console.log(error);
        });
});