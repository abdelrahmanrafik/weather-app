let locationInput = document.querySelector("#locationInput");
let toDay = document.querySelector("#toDay");
let sDay = document.querySelector("#sDay");
let thDay = document.querySelector("#thDay");
let data = [];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function searchByCoordinates(latitude, longitude) {
  let weatherApi = await fetch(`
      https://api.weatherapi.com/v1/forecast.json?key=b2ad9179d846456bb90211758240401&q=${latitude} ,${longitude}&days=3
      `);
  let response = await weatherApi.json();

  data = response;
  console.log(response);
  weatherTodays();
  secondDay();
  thirdDay();
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        searchByCoordinates(latitude, longitude);
      },
      function (error) {
        console.error("Error getting user location:", error);
        searchByCoordinates(30.0444, 31.2357);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    searchByCoordinates(30.0444, 31.2357);
  }
}
getUserLocation();

async function searchCity(cityName) {
  let weatherApi = await fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=b2ad9179d846456bb90211758240401&q=${cityName}&days=3
    `);
  let response = await weatherApi.json();
  if (!response.error) {
    data = response;
    console.log(response);
    weatherTodays(cityName);
    secondDay(cityName);
    thirdDay(cityName);
    
  }
}

locationInput.addEventListener("input", function () {
  let city = locationInput.value;
  if (city.length >= 3) {
    searchCity(city);
  } else {
    return;
  }
});

function weatherTodays() {
  let today =data.forecast.forecastday[0];
  let todayDate= new Date(today.date);
  let dayOfWeek = daysOfWeek[todayDate.getDay()];
  let dayNumber = todayDate.getDate();
  let month = monthName[todayDate.getMonth()];
  
  let weatherData=``
  weatherData+=`
  <div class="card bg-dark text-white bg-opacity-50">
                    <div class="card-header d-flex justify-content-between">
                      <h6 class="day">${dayOfWeek}</h6>
                      <p class="date">${dayNumber} ${month}</p>
                    </div>
                    <div class="card-body p-4 text-center d-flex flex-column justify-content-center gap-2">
                      <h5 class="location" title="City">${data.location.name}</h5>
                
                      <div class="degree d-flex gap-2 justify-content-center align-items-center">
                        <h4 class="h1 mb-0" title="Max-Temperature">${today.day.maxtemp_c}°C</h4>
                        <img src="https:${today.day.condition.icon}" alt="">
                      </div>
                        <h6 class=" mb-0 text-white-50" title="Min-Temperature">${today.day.mintemp_c}°C</h6>
                      <p class="status">${today.day.condition.text}</p>
                      <div class="info d-flex gap-4 justify-content-center">
                        <span title="Chance of rain">
                          <i class="fa-solid fa-umbrella pe-1"></i>${today.day.daily_chance_of_rain}%</span>
                        <span title="Wind speed">
                          <i class="fa-solid fa-wind pe-1"></i>${today.day.maxwind_kph}km/h</span>
                        <span title="Average Humidity">
                          <i class="fa-solid fa-droplet pe-1"></i>${today.day.avghumidity}%</span>
                      </div>
                    </div>
                    
                  </div>
  `
  toDay.innerHTML=weatherData;
  
}

function secondDay() {
  let today =data.forecast.forecastday[1];
  let todayDate= new Date(today.date);
  let dayOfWeek = daysOfWeek[todayDate.getDay()];
  let dayNumber = todayDate.getDate();
  let month = monthName[todayDate.getMonth()];
  
  let weatherData=``
  weatherData+=`
  <div class="card bg-dark text-white bg-opacity-50">
                    <div class="card-header d-flex justify-content-between">
                      <h6 class="day">${dayOfWeek}</h6>
                      <p class="date">${dayNumber} ${month}</p>
                    </div>
                    <div class="card-body p-4 text-center d-flex flex-column justify-content-center gap-2">
                      
                      <div class="degree d-flex gap-2 justify-content-center align-items-center">
                        <h4 class="h1 mb-0" title="Max-Temperature">${today.day.maxtemp_c}°C</h4>
                        <img src="https:${today.day.condition.icon}" alt="">
                      </div>
                        <h6 class=" mb-0 text-white-50" title="Min-Temperature">${today.day.mintemp_c}°C</h6>
                      <p class="status">${today.day.condition.text}</p>
                      <div class="info d-flex gap-4 justify-content-center">
                        <span title="Chance of rain">
                          <i class="fa-solid fa-umbrella pe-1"></i>${today.day.daily_chance_of_rain}%</span>
                        <span title="Wind speed">
                          <i class="fa-solid fa-wind pe-1"></i>${today.day.maxwind_kph}km/h</span>
                        <span title="Average Humidity">
                          <i class="fa-solid fa-droplet pe-1"></i>${today.day.avghumidity}%</span>
                      </div>
                    </div>
                    
                  </div>
  `
  sDay.innerHTML=weatherData;
  
}
function thirdDay() {
  let today =data.forecast.forecastday[2];
  let todayDate= new Date(today.date);
  let dayOfWeek = daysOfWeek[todayDate.getDay()];
  let dayNumber = todayDate.getDate();
  let month = monthName[todayDate.getMonth()];
  
  let weatherData=``
  weatherData+=`
  <div class="card bg-dark text-white bg-opacity-50">
                    <div class="card-header d-flex justify-content-between">
                      <h6 class="day">${dayOfWeek}</h6>
                      <p class="date">${dayNumber} ${month}</p>
                    </div>
                    <div class="card-body p-4 text-center d-flex flex-column justify-content-center gap-2">
                     
                      <div class="degree d-flex gap-2 justify-content-center align-items-center">
                        <h4 class="h1 mb-0" title="Max-Temperature">${today.day.maxtemp_c}°C</h4>
                        <img src="https:${today.day.condition.icon}" alt="">
                      </div>
                        <h6 class=" mb-0 text-white-50" title="Min-Temperature">${today.day.mintemp_c}°C</h6>
                      <p class="status">${today.day.condition.text}</p>
                      <div class="info d-flex gap-4 justify-content-center">
                        <span title="Chance of rain">
                          <i class="fa-solid fa-umbrella pe-1"></i>${today.day.daily_chance_of_rain}%</span>
                        <span title="Wind speed">
                          <i class="fa-solid fa-wind pe-1"></i>${today.day.maxwind_kph}km/h</span>
                        <span title="Average Humidity">
                          <i class="fa-solid fa-droplet pe-1"></i>${today.day.avghumidity}%</span>
                      </div>
                    </div>
                    
                  </div>
  `
  thDay.innerHTML=weatherData;
  
}
