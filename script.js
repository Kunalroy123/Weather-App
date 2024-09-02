const BASE_URL = "http://api.weatherapi.com/v1/current.json?key=6a231fe301384b7fbc373330240209&q=New Delhi&aqi=no";


const search = document.querySelector(".search-area");
const form = document.querySelector("form");
const temperature = document.querySelector(".temp");
const place = document.querySelector(".place");
const date = document.querySelector(".date");
const weather = document.querySelector(".weather");


form.addEventListener("submit", searchForLocation)



const fetchresult = async (targetlocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=6a231fe301384b7fbc373330240209&q=${targetlocation}&aqi=no`;

    const response = await fetch(url);
    const data =  await response.json();

    let locationName = data.location.name 

    let time = data.location.localtime

    let temp = data.current.temp_c

    let condition = data.current.condition.text
    
    let weatherIcon = `${data.current.condition.icon}`;
    console.log(weatherIcon)

   updateDetails(temp, locationName, time, condition, weatherIcon)
    
}

let updateDetails = (temp, locationName, time, condition, weatherIcon) => {

    let splitDate = time.split(" ")[0]
    let splitTime = time.split(" ")[1]

    let currentDay = getDayName(new Date(splitDate).getDay())

    temperature.innerText = temp
    temperature.innerText += "°C"
    place.innerText = locationName
    date.innerText = `${splitTime} - ${currentDay} - ${splitDate}`
    weather.innerText = condition
    document.getElementById("icon").src = weatherIcon

}

function searchForLocation(e){
    e.preventDefault()
    target = search.value

    fetchresult(target)
}


function getDayName(number){
    switch (number){
        case 0 :
            return "Sunday"
            
        case 1:
            return "Monday"
            
        case 2 :
            return "Tuesday"
            
        case 3 :
            return "Wednesday"
            
        case 4 :
            return "Thursday"
            
        case 5 :
            return "Friday"
            
        case 6 :
            return "Saturday"
            
    }
}