

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = 'a04d2dac54c9b04ed5b32c739042f27b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            document.getElementById('weatherInfo').textContent = 'Failed to fetch weather data. Please try again.';
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherInfo');
    const weatherImageDiv = weatherContainer.querySelector('.weather-image');
    const weatherDetailsDiv = weatherContainer.querySelector('.weather-details');


    weatherImageDiv.innerHTML = '';
    weatherDetailsDiv.innerHTML = '';

  
    const weatherCondition = data.weather[0].main.toLowerCase();
    const backgroundImageUrl = getWeatherBackgroundImage(weatherCondition);
    weatherImageDiv.style.backgroundImage = `url('${backgroundImageUrl}')`;

    weatherDetailsDiv.innerHTML = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function getWeatherBackgroundImage(condition) {
    switch (condition) {
        case 'clear':
            return 'image/sunny.png';
        case 'clouds':
            return 'image/cloudy.webp'; 
        case 'rain':
            return 'image/rainy.webp'; 
        default:
            return 'image/default.jpg';
    }
}
