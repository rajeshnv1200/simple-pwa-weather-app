if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
    });
  }
  
  async function getWeather() {

    const city = document.getElementById('city').value;
    const apiKey = '1852a8a0d03ab7dc6d18752ce3e43b7d';  // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.cod === '404') {
        throw new Error('City not found');
      }

      document.getElementById('weather').innerText = `Temperature in ${data.name}: ${data.main.temp} °C`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather').innerText = 'Error fetching weather data. Please check the console for details.';
    }
  }
  