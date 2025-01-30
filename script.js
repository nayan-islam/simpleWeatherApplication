let weather = document.querySelector(".weather")
let timeHTML = document.querySelector(".time")

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



const apiKey = "7fa45a1384797badf7762e757ec2f85f";
const city = "dhaka";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=bn&appid=${apiKey}`;



async function weatherApp() {
    try{
        const data = await fetch(apiUrl)
        const respons = await data.json()
        let tempreture = respons.main.temp
        let description = respons.weather[0].description
        let location = respons.name
        weather.innerHTML = `Location: <b>${location}</b>, Temperature: <b>${tempreture}°C</b>, Weather Description: <b>${description}</b>`
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

    let ampm = hour >= 12 ?"PM":"AM"

    hour = hour % 12
    hour = hour ? hour : 12

    let time = `Time: ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2,"0")} ${ampm}`

    timeHTML.innerHTML = `Today: ${days[day]}, ${date} ${months[month]}, ${year} । ${time}`
    
    
}

setInterval(()=> timeAndDate, 1000)

weatherApp()
timeAndDate()