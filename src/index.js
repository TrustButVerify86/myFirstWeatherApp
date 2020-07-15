/*
----------------------------
Create the date information
---------------------------- 
*/

//creates a new date instance
let nowDate = new Date();

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

//Variable that calls Current Month
let currentMonth = months[nowDate.getMonth()];

//Variable that calls current date
let currentDate = nowDate.getDate();

// Create variable for Current Full Year
let currentYear = nowDate.getFullYear();

//variable that calls current hour
let currentHour = nowDate.getHours();

//variable that calls current Minutes
let currentMinutes = nowDate.getMinutes();

let timeStamp = document.querySelector("#time");
let dateStamp = document.querySelector("#date");

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

  

function ShowConsole(response){
  console.log(response);
}

  //Collect current City from user

  function CitySearch(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#inlineFormInputName");
    userCity= currentCity.value;
    console.log(userCity);
    currentDayUrlApi =`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${apiKey}`;
    axios.get(currentDayUrlApi).then(GetWeatherInfo);
  }
  
  let clkMe = document.querySelector("#submitCity");
  
  clkMe.addEventListener("click", CitySearch);
  

  function logPosition(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    locApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    axios.get(locApi).then(GetWeatherInfo);
  
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(logPosition);
    
  }
  let getLoc=document.querySelector("#geoLoc");
  getLoc.addEventListener("click", getCurrentPosition);
  
 


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
  conditionElement.innerHTML=`${condition}`

  //Update Time in time element
  timeStamp.innerHTML = `${currentHour}:${currentMinutes}`;
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
}
celsiusDeg.onclick = Cdegrees;

function Fdegrees(event) {
  event.preventDefault();
  let fDeg = document.querySelector("#currentTemp");
  fDeg.innerHTML = `${farenTemp}`;
}
farenDeg.onclick = Fdegrees;

