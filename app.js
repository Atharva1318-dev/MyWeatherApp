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
let time = document.querySelector(".time");
let temps = document.querySelectorAll(".Temp");
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
                temps[0].classList.remove('animate-pulse');
                temps[0].innerText = res.current_observation.condition.temperature;
                txt[0].innerText = res.current_observation.condition.text;
                for (let i = 0; i < 6; i++) {
                    days[i].innerText = res.forecasts[i].day;
                }
                for (let i = 0; i < 6; i++) {
                    temps[i].classList.remove('animate-pulse');
                    highs[i].classList.remove('animate-pulse');
                    lows[i].classList.remove('animate-pulse');
                    highs[i].innerText = res.forecasts[i].high;
                    lows[i].innerText = res.forecasts[i].low;
                }
                for (let i = 0; i < 7; i++) {
                    txt[i].innerText = res.forecasts[i].text;
                }

                hum.innerText = res.current_observation.atmosphere.humidity;
                vis.innerText = res.current_observation.atmosphere.visibility;

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
                });
        })
        .catch((err) => {
            console.log(err);
        });
    mainContent.classList.remove('animate-pulse');
});
