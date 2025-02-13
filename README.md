# weather-
# Weather Forecast Application

This is a simple Weather Forecast Application that allows users to view the current weather and a 5-day weather forecast for any city. Users can also fetch weather data for their current location.

## Features
- Search weather by city name.
- Display current weather information (temperature, weather condition, humidity, wind speed).
- Display a 5-day weather forecast.
- Use current location to fetch weather.
- View previously searched cities from a dropdown menu.
- Error handling for invalid city names and empty search fields.

## Technologies Used
- **HTML**
- **CSS** (with Tailwind CSS)
- **JavaScript**
- **OpenWeather API**

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/harshal1800/weather-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-forecast-application
   ```
3. Open `index.html` in your browser.

## Usage
1. Enter a city name in the input field and click the "Search" button to view the weather information.
2. Click the "Use Current Location" button to fetch the weather for your current location.
3. Select a previously searched city from the dropdown to quickly view its weather data.

## Screenshots
  ![ss](<ss and screen recording/sss1.png>)
## Screen recording 
<video controls src="ss and screen recording/weather.mp4" title="screen recording"></video>
## API Key Setup
This project uses the OpenWeather API. You can replace the placeholder `API_KEY` in `script.js` with your own OpenWeather API key.

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

## File Structure
- `index.html`: The main HTML structure of the application.
- `style.css`: Custom styles for the application.
- `script.js`: JavaScript logic to fetch and display weather data.

## Known Issues
- Ensure that your API key is valid and the OpenWeather API service is running.
- Location access may require user permission.

## License
This project is licensed under the MIT License.

## done by Harshal Chavhan 
## Email : harshalchavhank18@gmail.com