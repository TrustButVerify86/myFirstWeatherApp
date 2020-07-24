/*
----------------------------
Create the date information
---------------------------- 
*/

//creates a new date instance
let nowDate = new Date();

let currentDate =null;

//Creates an Array with all Days of the Week
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//Varible that calls current Day
let currentDay = daysOfWeek[nowDate.getDay()];

//Create an Array with all Months in the year
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

function formatCurrentTime(){
  currentDate = nowDate.getDate();
  let hours= nowDate.getHours();
  if (hours < 10){
    hours=`0${hours}`;
  }
  let minutes= nowDate.getMinutes();
  if (minutes < 10){
    minutes= `0${minutes}`;
  }

  return`${hours}:${minutes}`;
}
//Variable that calls Current Month
let currentMonth = months[nowDate.getMonth()];

//Variable that calls current date
//let currentDate = nowDate.getDate();

// Create variable for Current Full Year
let currentYear = nowDate.getFullYear();

//variable that calls current hour
//let currentHour = nowDate.getHours();

//variable that calls current Minutes
let currentMinutes = nowDate.getMinutes();

let timeStamp = document.querySelector("#time");
let dateStamp = document.querySelector("#date");





function formatForecastTime(timestamp){
  let date = new Date(timestamp);
  let hours= date.getHours();
  if (hours < 10){
    hours=`0${hours}`;
  }
  let minutes= date.getMinutes();
  if (minutes < 10){
    minutes= `0${minutes}`;
  }

  return`${hours}:${minutes}`;
}
//alert(`${currentDay} ${currentMonth}/${currentDate}/${currentYear}   ${currentHour}:${currentMinutes}`);


// Assign Weather API Key
let apiKey = `521fd1b5ef6e42ccdfdc9927e13ee035`;
//Assign Search Bar Api Url
let currentDayUrlApi =null;
//Assign the input from the citySearch Form
let userCity=null;
//Assign API Data Points
let humidity=null;
let wind=null;
let condition=null;
let apiTemp=null;
let apiCity=null;
let apiCountry=null;
let farenTemp=null;
let celsTemp=null;
let locApi=null;
let lat=null;
let lon=null;
let mainEmoji=null;
let apiForecastTemp=null;
let forecastDayUrlApi=null;
let forecastLocApi=null;
let forecastElement=null;
let forecast=null;
let forecastApiTemp=null;
let forecastTemp=null;
let forecastIcon=null;
let forecastDate=null;
let forecastHours=null;
let forecastMinutes=null;


  



  //Collect current City from user

  function CitySearch(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#inlineFormInputName");
    userCity= currentCity.value;
    //Call Current Day Forecast API
    currentDayUrlApi =`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${apiKey}`;
    axios.get(currentDayUrlApi).then(GetWeatherInfo);
    //Call 5 Day Forecast API
    forecastDayUrlApi=`https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=imperial&appid=${apiKey}`;
    axios.get(forecastDayUrlApi).then(showForecast);
  }
  
  let clkMe = document.querySelector("#submitCity");
  
  clkMe.addEventListener("click", CitySearch);
  
  //Call Weather using current location
  function logPosition(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    //Call Current Day Forecast API
    locApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    axios.get(locApi).then(GetWeatherInfo);

    //Call Hourly Forecast API
    forecastLocApi=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
     
     axios.get(forecastLocApi).then(showForecast);

  
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(logPosition);
    
  }
  let getLoc=document.querySelector("#geoLoc");
  getLoc.addEventListener("click", getCurrentPosition);
  
  function showForecast(response){
    forecastElement=document.querySelector("#Forecast");
    forecast=null;
    forecastElement.innerHTML=null;
    for(let i=0;i<6;i++)
  {
    console.log(response.data);
    forecast=response.data.list[i];
   forecastApiTemp=forecast.main.temp_max;
   forecastTemp=Math.round(forecastApiTemp);
   forecastIcon=forecast.weather[0].icon;

   
   
   forecastElement.innerHTML+=`	
      <div class="space">
        <div class="col-sm-auto  text-center hightemp ">
        ${formatForecastTime(forecast.dt*1000)} <br/>
          <img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png"/>
          <br/>
          <span class="hightemp " id="highTemp">${forecastTemp}°</span>
          </div>
   `;
  }
}


//Call all API data into variables
function GetWeatherInfo(response){
  apiCity=response.data.name;
  apiCountry=response.data.sys.country;
  apiTemp=response.data.main.temp;
  humidity=response.data.main.humidity;
  wind=response.data.wind.speed;
  condition=response.data.weather[0].main;
  farenTemp=Math.round(apiTemp);
  let convertTemp=(farenTemp-32)*.55;
  celsTemp=Math.round(convertTemp);
  mainEmoji=response.data.weather[0].icon;
  DisplayWeatherInfo()
}

function DisplayWeatherInfo(event){
  
  //Change city Element to current call
  let cityElement=document.querySelector("#cityName");
  cityElement.innerHTML=`${apiCity},${apiCountry}`

  //Change Weather element to current call
  let weatherElement=document.querySelector("#currentTemp");
  weatherElement.innerHTML=`${Math.round(farenTemp)}`

  //Change Humidity element to current call
  let humidityElement=document.querySelector("#humidity");
  humidityElement.innerHTML=`Humidity: ${humidity}%`

  //Change wind element to current call
  let windElement=document.querySelector("#windSpeed");
  windElement.innerHTML=`Wind Speed: ${Math.round(wind)}mph`

  //Change Condition element to current call
  let conditionElement=document.querySelector("#condition");
  conditionElement.innerHTML=`Condition: ${condition}`

    //Change weather Emoji element to current call
    let emojiElement=document.querySelector("#emoji");
    emojiElement.setAttribute("src",`https://openweathermap.org/img/wn/${mainEmoji}@2x.png`);
    

  //Update Time in time element
  timeStamp.innerHTML = `${formatCurrentTime()}`;
  //`${currentHour}:${currentMinutes}`;
 //Update Date in date element
 dateStamp.innerHTML = `${currentDay} ${currentMonth}/${currentDate}/${currentYear}`;
}
 



/*
--------------------------------------------
Changing the temp rating between F/C   
-------------------------------------------- 
*/
let celsiusDeg = document.querySelector("#celsius");
let farenDeg = document.querySelector("#faren");

function Cdegrees(event) {
  event.preventDefault();
  let cDeg = document.querySelector("#currentTemp");
  cDeg.innerHTML = `${celsTemp}`;
  cDeg.classList.add("active");
  
}
celsiusDeg.onclick = Cdegrees;

function Fdegrees(event) {
  event.preventDefault();
  let fDeg = document.querySelector("#currentTemp");
  fDeg.innerHTML = `${farenTemp}`;
  
  fDeg.classList.add("active");
}
farenDeg.onclick = Fdegrees;


