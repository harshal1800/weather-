const API_KEY = '277cb7ac400584b78e2a60de2fada6fb'; // Replace with your OpenWeather API key  

// Fetch current weather for the entered city
function fetchWeather(city) {
  clearErrorMessage(); // Clear any previous errors

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'277cb7ac400584b78e2a60de2fada6fb'}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${'277cb7ac400584b78e2a60de2fada6fb'}&units=metric`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      saveRecentCity(city);
    })
    .catch(error => {
      showErrorMessage(error.message);
      document.getElementById('weather-info').classList.add('hidden');
    });

  // Fetch 5-day forecast
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching forecast:', error);
    });
}

// Display the current weather
function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.classList.remove('hidden');
   
  console.log(data.weather[0].icon); // Check the icon code

  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

 


  // weatherInfo.innerHTML = `
  //   <h2 class="text-2xl font-bold" style="font-family: cursive;">Weather in ${data.name}</h2>
  //   <img src="${weatherIcon}" alt="${data.weather[0].description}" class="w-16 h-16">
  //   <p>Temperature: ${data.main.temp}°C</p>
  //   <p>Weather: ${data.weather[0].description}</p>
  //   <p>Humidity: ${data.main.humidity}%</p>
  //   <p>Wind Speed: ${data.wind.speed} m/s</p>
  // `;


  weatherInfo.innerHTML = `
  <h2 class="text-2xl font-bold" style="font-family: cursive;">Weather in ${data.name}</h2>
  <img src="${weatherIcon}" alt="${data.weather[0].description}" class="w-16 h-16">
  <p style="font-family: cursive;">Temperature: ${data.main.temp}°C</p>
  <p style="font-family: cursive;">Weather: ${data.weather[0].description}</p>
  <p style="font-family: cursive;">Humidity: ${data.main.humidity}%</p>
  <p style="font-family: cursive;">Wind Speed: ${data.wind.speed} m/s</p>
`;

}


// Display the 5-day forecast horizontally
function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast-info');
  const forecastCards = document.getElementById('forecast-cards');
  forecastDiv.classList.remove('hidden');
  forecastCards.innerHTML = ''; // Clear previous forecast

  // Filter forecast data to show one forecast per day at 12:00 PM
  const filteredForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  filteredForecast.forEach(forecast => {
    const date = new Date(forecast.dt_txt).toLocaleDateString();
    const weatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

    // Create forecast card as a block
    const card = `
      <div class="border p-4 rounded bg-gray-100 shadow-lg w-40 text-center">
        <p class="font-bold">${date}</p>
        <img src="${weatherIcon}" alt="${forecast.weather[0].description}" class="w-12 h-12 mx-auto">
        <p>Temp: ${forecast.main.temp}°C</p>
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind: ${forecast.wind.speed} m/s</p>
      </div>
    `;
    forecastCards.innerHTML += card;
  });
}

//  5-day forecast 
function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast-info');
  forecastDiv.classList.remove('hidden');
  //forecastDiv.innerHTML = '<h2 class="text-2xl font-bold">5-Day Forecast</h2>';
  forecastDiv.innerHTML = '<h2 class="text-2xl font-bold" style="font-family: cursive;">5-Day Forecast</h2>';


  const filteredForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  const forecastCardsContainer = document.createElement('div');
  forecastCardsContainer.id = 'forecast-cards';
  forecastCardsContainer.className = 'flex flex-wrap';
  

  filteredForecast.forEach(forecast => {
    const date = new Date(forecast.dt_txt).toLocaleDateString();
    const weatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

    const forecastCard = document.createElement('div');
    forecastCard.className = 'border p-4 rounded mb-2';
    forecastCard.style.backgroundColor = '#d7d1fa'; // Set background color

    // forecastCard.innerHTML = `
    //   <p class="font-bold">${date}</p>
    //   <img src="${weatherIcon}" alt="${forecast.weather[0].description}" class="w-16 h-16">
    //   <p>Temp: ${forecast.main.temp}°C</p>
    //   <p>Weather: ${forecast.weather[0].description}</p>
    //   <p>Humidity: ${forecast.main.humidity}%</p>
    //   <p>Wind Speed: ${forecast.wind.speed} m/s</p>
    // `;

    forecastCard.innerHTML = `
  <p class="font-bold" style="font-family: cursive;">${date}</p>
  <img src="${weatherIcon}" alt="${forecast.weather[0].description}" class="w-16 h-16">
  <p style="font-family: cursive;">Temp: ${forecast.main.temp}°C</p>
  <p style="font-family: cursive;">Weather: ${forecast.weather[0].description}</p>
  <p style="font-family: cursive;">Humidity: ${forecast.main.humidity}%</p>
  <p style="font-family: cursive;">Wind Speed: ${forecast.wind.speed} m/s</p>
`;


    forecastCardsContainer.appendChild(forecastCard);
  });

  forecastDiv.appendChild(forecastCardsContainer);
}


// Show error messages
function showErrorMessage(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Clear any existing error messages
function clearErrorMessage() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}

// Handle invalid city names and empty search fields
document.getElementById('search-btn').addEventListener('click', function() {
  const city = document.getElementById('city-input').value.trim();
  if (city === "") {
    showErrorMessage('Please enter a city name.');
  } else if (!/^[a-zA-Z\s]+$/.test(city)) {
    showErrorMessage('City name can only contain letters.');
  } else {
    fetchWeather(city);
  }
});

// Handle search button click for recent cities dropdown
document.getElementById('recent-cities').addEventListener('change', function() {
  const selectedCity = this.value;
  if (selectedCity) {
    fetchWeather(selectedCity);
  }
});

// Handle "Use Current Location" button
document.getElementById('current-location-btn').addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showLocationError);
  } else {
    showErrorMessage('Geolocation is not supported by your browser.');
  }
});

function fetchWeatherByLocation(position) {
  clearErrorMessage();
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'277cb7ac400584b78e2a60de2fada6fb'}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to fetch weather for your location.');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

function showLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      showErrorMessage('Location access denied by user.');
      break;
    case error.POSITION_UNAVAILABLE:
      showErrorMessage('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      showErrorMessage('The request to get user location timed out.');
      break;
    default:
      showErrorMessage('An unknown error occurred.');
      break;
  }
}

// Save recent city to localStorage
function saveRecentCity(city) {
  let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    updateRecentCitiesDropdown(recentCities);
  }
}

// Update the dropdown with recent cities
function updateRecentCitiesDropdown(cities) {
  const dropdown = document.getElementById('recent-cities');
  dropdown.classList.remove('hidden');
  // dropdown.innerHTML = '<option value="" disabled selected>Select a recent city</option>';
  dropdown.innerHTML = '<option value="" disabled selected style="font-family: cursive;">Select a recent city</option>';

  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });
}

// Load recent cities on page load
document.addEventListener('DOMContentLoaded', function() {
  const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
  if (recentCities.length > 0) {
    updateRecentCitiesDropdown(recentCities);
  }
});
