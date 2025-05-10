const apiKey = 'a04838d88cbe4676bfe62007251005';
const location = 'New York';
const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (!data || !data.forecast || !data.forecast.forecastday) {
      document.getElementById('weather-container').innerText = 'Failed to fetch weather data.';
      return;
    }

    const forecastDays = data.forecast.forecastday;
    let html = '';

    forecastDays.forEach((dayData, index) => {
      const dayName = new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'long' });
      const date = dayData.date;
      const icon = `https:${dayData.day.condition.icon}`;
      const maxTemp = dayData.day.maxtemp_c;
      const minTemp = dayData.day.mintemp_c;
      const chanceOfRain = dayData.day.daily_chance_of_rain;
      const windKph = dayData.day.maxwind_kph;
      const windDir = dayData.day.maxwind_dir;

      html += `
        <div class="forecast${index === 0 ? ' today' : ''}">
          <div class="forecast-header">
            <div class="day">${dayName}</div>
            ${index === 0 ? `<div class="date">${date}</div>` : ''}
          </div>
          <div class="forecast-content">
            ${index === 0 ? `<div class="location">${data.location.name}</div>` : ''}
            <div class="degree">
              <div class="num">${maxTemp}<sup>o</sup>C</div>
              <div class="forecast-icon">
                <img src="${icon}" alt="" width="48">
              </div>
            </div>
            ${index === 0 ? `
              <span><img src="images/icon-umberella.png" alt="">${chanceOfRain}%</span>
              <span><img src="images/icon-wind.png" alt="">${windKph}km/h</span>
              <span><img src="images/icon-compass.png" alt="">${windDir}</span>
            ` : `<small>${minTemp}<sup>o</sup></small>`}
          </div>
        </div>
      `;
    });

    document.getElementById('weather-container').innerHTML = html;
  })
  .catch(err => {
    console.error('Error:', err);
    document.getElementById('weather-container').innerText = 'Error fetching weather data.';
  });
