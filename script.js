let weather = document.querySelector(".weather")
let timeHTML = document.querySelector(".time")
let findCities = document.querySelector(".findCities")
let cities = document.querySelector(".cities")

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



const apiKey = "7fa45a1384797badf7762e757ec2f85f";
let currentCity = "dhaka";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&lang=bn&appid=${apiKey}`;



async function weatherApp() {
    try{
        const data = await fetch(apiUrl)
        const respons = await data.json()
        let tempreture = respons.main.temp
        let description = respons.weather[0].description
        // let location = respons.name
        weather.innerHTML = `Location: <b class='capitalize'>${currentCity}</b>, Temperature: <b>${tempreture}°C</b>, Weather Description: <b>${description}</b>`
    }
    catch(error){
        weather.innerHTML = "Something went wrong..!"
        console.log(error);
    }
}

function timeAndDate(){
    let now = new Date()

    let day = now.getDay()
    let month = now.getMonth()
    let date = now.getDate()
    let year = now.getFullYear()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let seconds = now.getSeconds()

    let ampm = hour >= 12 ?"PM":"AM"

    hour = hour % 12
    hour = hour ? hour : 12

    let time = `Time: <button class="bg-slate-800 text-slate-200 font-bold  px-2 rounded-md drop-shadow-2xl">${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}</button> ${ampm}`

    timeHTML.innerHTML = `Today: ${days[day]}, ${date} ${months[month]}, ${year} । ${time}`
    
    
}

async function fetchCities() {
    try {

        let respons = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities") 
        let data = await respons.json()

        cities.innerHTML = ""

        data.data.forEach(element => {
            let city = document.createElement("button")
            city.classList.add("bg-slate-800", "text-slate-200", "p-2", "my-2", "rounded-md", "drop-shadow-2xl")
            city.innerHTML = `${element.city}`
            cities.append(city)
        });  
    } catch (error) {
        cities.innerHTML = "Something went wrong..!"
        console.log(error);
    }
}

findCities.addEventListener("input", function(e){

    if(e.target.value.length > 0){
        cities.classList.remove("opacity-0")
        cities.classList.add("opacity-100")
        cities.classList.remove("invisible")
        cities.classList.add("visible")
    }
    else{
        cities.classList.remove("opacity-100")
        cities.classList.add("opacity-0")
        cities.classList.remove("visible")
        cities.classList.add("invisible")
    }


    let value = e.target.value.toLowerCase()
    let citiesList = document.querySelectorAll(".cities button")

    citiesList.forEach(element => {
        if(element.innerHTML.toLowerCase().includes(value)){
            element.classList.remove("hidden")
        }
        else{
            element.classList.add("hidden")
        }
    })


    citiesList.forEach(element => {
        element.addEventListener("click", function(){
            currentCity = element.innerHTML.toString().toLowerCase()
            findCities.value = ""
            cities.classList.remove("opacity-100")
            cities.classList.add("opacity-0") 
            cities.classList.remove("visible")
            cities.classList.add("invisible")
            weatherApp()
        })
    });
     
})


setInterval(()=> timeAndDate(), 1000)

weatherApp()
timeAndDate()
fetchCities()