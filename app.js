const url = 'https://yahoo-weather5.p.rapidapi.com/weather?format=json&u=f&location=';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b0f8c73fb1msh58f0a8680a7159fp10d036jsna2857b6bc6b7',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
};
let nav = document.querySelector("nav");
let mainContent = document.querySelector("#main-content");
let days = document.querySelectorAll(".Day");
let CurrDate = document.querySelector(".CurrDate");
let CurrIcon = document.querySelector("#curr-weather-icon");
let DelhiIcon = document.querySelector("#delhi-weather-icon");
let KolIcon = document.querySelector("#kol-weather-icon");
let PuneIcon = document.querySelector("#pune-weather-icon");
let ChenIcon = document.querySelector("#chen-weather-icon");
let time = document.querySelector(".time");
let CurrTemp = document.querySelector(".CurrTemp");
let CurrTxt = document.querySelector(".CurrTxt");
let txt = document.querySelectorAll(".Txt");
let highs = document.querySelectorAll(".TempHigh");
let lows = document.querySelectorAll(".TempLow");
let btn = document.querySelector("#search");
let inp = document.querySelector("input");
let c = document.querySelector(".CurrCity");
let hum = document.querySelector("#hum");
let vis = document.querySelector("#vis");
let delhi = document.querySelector(".DelhiTemp");
let kol = document.querySelector(".KolTemp");
let pune = document.querySelector(".PuneTemp");
let chen = document.querySelector(".ChennaiTemp");
let delhiTx = document.querySelector(".DelhiTxt");
let kolTx = document.querySelector(".KolTxt");
let puneTx = document.querySelector(".PuneTxt");
let chenTx = document.querySelector(".ChenTxt");
let icons = document.querySelectorAll("#weather-icon");
let loc2 = "Delhi";
let loc3 = "Kolkata";
let loc4 = "Pune";
let loc5 = "Chennai";
btn.addEventListener("click", async () => {
    if (inp.value) { mainContent.classList.add('animate-pulse'); }
    let loc = inp.value;
    await fetch(url + loc, options)
        .then(async (res) => {
            await res.json().then((res) => {
                c.innerText = res.location.city;
                let timestamp = res.current_observation.pubDate;
                let date = new Date(timestamp * 1000);
                time.innerText = date.toLocaleTimeString();
                CurrDate.innerText = date.toLocaleDateString();
                CurrTemp.innerText = res.current_observation.condition.temperature;
                CurrTxt.innerText = res.current_observation.condition.text;
                setIcon(res.current_observation.condition.text, CurrIcon);
                hum.innerText = res.current_observation.atmosphere.humidity;
                vis.innerText = res.current_observation.atmosphere.visibility;
                for (let i = 0; i < 6; i++) {
                    days[i].innerText = res.forecasts[i].day;
                }
                for (let i = 0; i < 6; i++) {
                    highs[i].classList.remove('animate-pulse');
                    lows[i].classList.remove('animate-pulse');
                    highs[i].innerText = res.forecasts[i].high;
                    lows[i].innerText = res.forecasts[i].low;
                }
                for (let i = 0; i < 6; i++) {
                    txt[i].innerText = res.forecasts[i].text;
                    setIcon(res.forecasts[i].text, icons[i]);
                }
            });
        })
        .then(() => {
            return fetch(url + loc2, options)
                .then(async (res) => {
                    return res.json();
                })
                .then((res) => {
                    delhi.classList.remove('animate-pulse');
                    delhi.innerText = res.current_observation.condition.temperature;
                    delhiTx.innerText = res.current_observation.condition.text;
                    setIcon(res.current_observation.condition.text, DelhiIcon);
                });
        })
        .then(() => {
            return fetch(url + loc3, options)
                .then(async (res) => {
                    return res.json();
                })
                .then((res) => {
                    kol.classList.remove('animate-pulse');
                    kol.innerText = res.current_observation.condition.temperature;
                    kolTx.innerText = res.current_observation.condition.text;
                    setIcon(res.current_observation.condition.text, KolIcon);
                });
        })
        .then(() => {
            return fetch(url + loc4, options)
                .then(async (res) => {
                    return res.json();
                })
                .then((res) => {
                    pune.classList.remove('animate-pulse');
                    pune.innerText = res.current_observation.condition.temperature;
                    puneTx.innerText = res.current_observation.condition.text;
                    setIcon(res.current_observation.condition.text, PuneIcon);
                });
        })
        .then(() => {
            return fetch(url + loc5, options)
                .then(async (res) => {
                    return res.json();
                })
                .then((res) => {
                    chen.classList.remove('animate-pulse');
                    chen.innerText = res.current_observation.condition.temperature;
                    chenTx.innerText = res.current_observation.condition.text;
                    setIcon(res.current_observation.condition.text, ChenIcon);
                });
        })
        .catch((err) => {
            console.log(err);
        });
    mainContent.classList.remove('animate-pulse');
});

function setIcon(s, icon) {
    const condition = s.toLowerCase().trim();
    switch (condition) {
        case "showers":
            icon.classList.add('wi', 'wi-showers');
            break;
        case "sunny":
            icon.classList.add('wi', 'wi-day-sunny');
            break;
        case "fair":
            icon.classList.add('wi', 'wi-day-sunny');
            break;
        case "partly cloudy":
            icon.classList.add('wi', 'wi-day-cloudy');
            break;
        case "mostly cloudy":
            icon.classList.add('wi', 'wi-day-cloudy');
            break;
        case "cloudy":
            icon.classList.add('wi', 'wi - cloudy');
            break;
        case "mostly sunny":
            icon.classList.add('wi', 'wi-day-sunny');
            break;
        case "scattered showers":
            icon.classList.add('wi', 'wi-showers');
            break;
        case "thunderstorms":
            icon.classList.add('wi', 'wi-thunderstorm');
        default:
            icon.classList.add('wi', 'wi-na');
            break;
    }
}