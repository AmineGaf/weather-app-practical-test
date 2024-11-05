// API Key and Base URL
const apiKey = 'fe824cb856a37281c8c13e7a5fbbd488';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select HTML elements
const weatherContainer = document.getElementById('weather-container');
const cityInput = document.getElementById('city-data');
const searchButton = document.querySelector('button');
const cityName = document.querySelector('#weather-details h1');
const temperature = document.querySelector('#weather-details h2');
const description = document.querySelector('#weather-details .description');
const weatherIcon = weatherContainer.querySelector('img');

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    
    // Update HTML elements with data
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp} °C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    // Handle errors (e.g., city not found)
    alert('Error: ' + error.message);
  }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});
