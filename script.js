let weather = document.querySelector(".weather");
let timeHTML = document.querySelector(".time");
let findCities = document.querySelector(".findCities");
let cities = document.querySelector(".cities");

let months = [
  "January", "February", "March", "April", "May", "June", "July", "August", 
  "September", "October", "November", "December"
];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const apiKey = "7fa45a1384797badf7762e757ec2f85f";
let currentCity = "Dhaka";
let timezoneOffset = 21600; // Default to Dhaka (UTC+6)

// Fetch Weather and Timezone Data
async function weatherApp() {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;
        const data = await fetch(apiUrl);
        const response = await data.json();

        let temperature = response.main.temp;
        let description = response.weather[0].description;
        timezoneOffset = response.timezone; // Update timezone offset dynamically

        weather.innerHTML = `Location: <b class='capitalize'>${currentCity}</b>, Temperature: <b>${temperature}°C</b>, Weather Description: <b>${description}</b>`;

    } catch (error) {
        weather.innerHTML = "Something went wrong..!";
        console.log(error);
    }
}

// ✅ Display Time According to City Timezone
function timeAndDate() {
    let now = new Date();
    let utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC
    let localTime = new Date(utc + timezoneOffset * 1000); // Apply city-specific timezone offset
console.log(now.getTimezoneOffset());

    let day = localTime.getDay();
    let month = localTime.getMonth();
    let date = localTime.getDate();
    let year = localTime.getFullYear();
    let hour = localTime.getHours();
    let minute = localTime.getMinutes();
    let seconds = localTime.getSeconds();
    let ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    let time = `Time: <button class="bg-slate-800 text-slate-200 font-bold  px-2 rounded-md drop-shadow-2xl">${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}</button> ${ampm}`;
   
    timeHTML.innerHTML = `Today: ${days[day]}, ${date} ${months[month]}, ${year} । ${time}`;
}

// Fetch List of Cities
async function fetchCities() {
    try {
        let response = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities");
        let data = await response.json();

        cities.innerHTML = "";

        data.data.forEach(element => {
            let city = document.createElement("button");
            city.classList.add("bg-slate-800", "text-slate-200", "p-2", "my-2", "rounded-md", "drop-shadow-2xl");
            city.innerHTML = `${element.city}`;
            cities.append(city);
        });

    } catch (error) {
        cities.innerHTML = "Something went wrong..!";
        console.log(error);
    }
}

// ✅ Handle City Selection
findCities.addEventListener("input", function (e) {
    if (e.target.value.length > 0) {
        cities.classList.remove("opacity-0", "invisible");
        cities.classList.add("opacity-100", "visible");
    } else {
        cities.classList.remove("opacity-100", "visible");
        cities.classList.add("opacity-0", "invisible");
    }

    let value = e.target.value.toLowerCase();
    let citiesList = document.querySelectorAll(".cities button");

    citiesList.forEach(element => {
        if (element.innerHTML.toLowerCase().includes(value)) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });

    citiesList.forEach(element => {
        element.addEventListener("click", function () {
            currentCity = element.innerHTML.toString();
            findCities.value = "";
            cities.classList.remove("opacity-100", "visible");
            cities.classList.add("opacity-0", "invisible");

            weatherApp() // Update weather and time
            timeAndDate()
        });
    });
});

// ✅ Run Functions
setInterval(() => timeAndDate(), 1000);
weatherApp();
timeAndDate();
fetchCities();
