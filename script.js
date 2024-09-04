const BASE_URL = "https://api.weatherapi.com/v1/current.json?key=6a231fe301384b7fbc373330240209&q=New Delhi&aqi=no";


const search = document.querySelector(".search-area");
const form = document.querySelector("form");
const temperature = document.querySelector(".temp");
const place = document.querySelector(".place");
const date = document.querySelector(".date");
const weather = document.querySelector(".weather");


document.addEventListener('DOMContentLoaded', function(){
    fetchresult("New Delhi")
})

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const targetlocation = search.value
    fetchresult(targetlocation);
    reduceBtnSize();
})


function reduceBtnSize() {
    const submitBtn = document.querySelector(".btn");
  
    if (submitBtn && !submitBtn.classList.contains("reduced")) { // Check for button existence and prevent multiple reductions
      submitBtn.style.transform = "scale(0.8)";
      submitBtn.style.transition = "transform 0.2s ease-in-out";
      submitBtn.classList.add("reduced"); // Add a class for easier management
    }
  }
  
  function resetBtnSize() {
    const submitBtn = document.querySelector(".btn");
  
    if (submitBtn && submitBtn.classList.contains("reduced")) {
      submitBtn.style.transform = "scale(1)";
      submitBtn.classList.remove("reduced");
    }
  }



  const fetchresult = async (targetlocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=6a231fe301384b7fbc373330240209&q=${targetlocation}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        let weatherIcon = `${data.current.condition.icon}`;

        updateDetails(temp, locationName, time, condition, weatherIcon);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please check the location and try again.");
    } finally {
        resetBtnSize();
    }
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

function getDayName(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}
