const appKey = "aa9707c0f3e8b884e4bc82d60815ea13";

let searchButton = document.getElementById("search_btn");
let searchInput = document.getElementById("search_text");
let cityName = document.getElementById("city_name");
let icon = document.getElementById("icon");
let tempreature = document.getElementById("temp");
let humidity = document.getElementById("humidity_div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter")
        findWeatherDetails();
}

function findWeatherDetails() {
    if (searchInput.value !== "") {
        let searchLink = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, getResponse);
    }
}

function getResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    tempreature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
    console.log(callback);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET",url,true);
    httpRequest.send();
}