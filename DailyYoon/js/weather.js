const API_KEY = "e93c5c427772ae464bcf44221b613883";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {            
            const city = document.querySelector(".weather span:first-child");
            const weather = document.querySelector(".weather span:last-child");

            city.innerText = data.name;
            weather.innerText = `, ${Math.round(data.main.temp)}°C, ${data.weather[0].main}`;

        });
}

function onGeoError(){
    alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);