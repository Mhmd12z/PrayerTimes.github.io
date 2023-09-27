let cards = document.querySelectorAll(".prayerTimes li");
let cityTitle = document.querySelector(".main .title");
let fajr = document.querySelector(".fajr .time");
let duhur = document.querySelector(".duhur .time");
let asr = document.querySelector(".asr .time");
let maghreb = document.querySelector(".maghreb .time");
let ishaa = document.querySelector(".ishaa .time");
let dateTitle = document.querySelector(".location .date")
let leftTimeCount = document.querySelector(".main .leftTime");
let dayTitle = document.querySelector(".location .day")
let options = document.querySelector(".main .cities");
let cities = ["Saida", "Beirut", "Tripoli", "Tyre", "Nabatieh"];
let params = {
    country: "LB",
    city: "saida"
}
window.onload = function () {
    document.querySelector(".app").style.cssText = `
    animation-name:dropDown;
    animation-timing-function:ease-in-out;
    animation-duration: 1s;
    animation-fill-mode:both;
    `
}
let backgrounds = ["./images/fajr-large.jpg", "./images/duhur-large.jpg", "./images/asr-large.jpg", "./images/maghreb-large.jpg", "./images/ishaa-large.jpg"];
for (let i = 0; i < cities.length; i++) {
    let optionIt = document.createElement("option");
    optionIt.innerHTML = cities[i];
    options.appendChild(optionIt);
}
options.addEventListener("change", function () {
    params = {
        country: "LB",
        city: this.value
    };
    getTiming();
    cityTitle.innerHTML = this.value;
});
function getMinutes(time) {
    return Number(time.split(":")[1]);
}
function getHours(time) {
    return Number(time.split(":")[0]);
}
async function getTiming() {
    try {
        const response = await fetch('http://api.aladhan.com/v1/timingsByCity?' + new URLSearchParams(params).toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        times = data.data.timings;
        fajr.innerHTML = times.Fajr;
        duhur.innerHTML = times.Dhuhr;
        asr.innerHTML = times.Asr;
        maghreb.innerHTML = times.Maghrib;
        ishaa.innerHTML = times.Isha;
        let salatName = "";
        dateTitle.innerHTML = data.data.date.readable;
        dayTitle.innerHTML = data.data.date.hijri.weekday.ar;
        let minNow = new Date().getMinutes();
        let minDifference = 0;
        let hrsDifference = 0;
        let prayIndex = 0;
        let hrsNow = new Date().getHours();
        if (getHours(times.Fajr) >= hrsNow && getMinutes(times.Fajr) <= minNow) {
            document.querySelector(".fajr").classList.add("active");
            if (getHours(times.Fajr) > hrsNow) {
                hrsDifference = getHours(times.Fajr) - hrsNow;
            }
            sign = getMinutes(times.Fajr) - minNow;
            minDifference = Math.abs(getMinutes(times.Fajr) - minNow);
            prayIndex = 0;
            salatName = "Fajr";
        }
        else if (getHours(times.Dhuhr) >= hrsNow && getMinutes(times.Dhuhr) <= minNow) {
            document.querySelector(".duhur").classList.add("active");
            if (getHours(times.Dhuhr) > hrsNow) {
                hrsDifference = getHours(times.Dhuhr) - hrsNow;
            }
            sign = getMinutes(times.Dhuhr) - minNow;
            minDifference = Math.abs(getMinutes(times.Dhuhr) - minNow);
            prayIndex = 1;
            salatName = "Dhuhr";

        }
        else if (getHours(times.Asr) >= hrsNow && getMinutes(times.Asr) <= minNow) {
            document.querySelector(".asr").classList.add("active")
            if (getHours(times.Asr) > hrsNow) {
                hrsDifference = getHours(times.Asr) - hrsNow;
            }
            sign = getMinutes(times.Asr) - minNow;
            minDifference = Math.abs(getMinutes(times.Asr) - minNow);
            prayIndex = 2;
            salatName = "Asr";

        }
        else if (getHours(times.Maghrib) >= hrsNow && getMinutes(times.Maghrib) <= minNow) {
            document.querySelector(".maghreb").classList.add("active")
            if (getHours(times.Maghrib) > hrsNow) {
                hrsDifference = getHours(times.Maghrib) - hrsNow;
            }
            sign = getMinutes(times.Maghrib) - minNow;
            minDifference = Math.abs(getMinutes(times.Maghrib) - minNow);
            prayIndex = 3;
            salatName = "Maghrib";

        }
        else if (getHours(times.Isha) >= hrsNow && getMinutes(times.Isha) <= minNow) {
            document.querySelector(".ishaa").classList.add("active")
            if (getHours(times.Isha) > hrsNow) {
                hrsDifference = getHours(times.Isha) - hrsNow;
            }
            sign = getMinutes(times.Isha) - minNow;
            minDifference = Math.abs(getMinutes(times.Isha) - minNow);
            prayIndex = 4;
            salatName = "Ishaa";
        }
        else {
            document.querySelector(".fajr").classList.add("active");
            leftTimeCount.innerHTML = "Next Salah Is Al-Fajr";
            leftTimeCount.style.color = "gold";
        }
        if (hrsDifference != 0) {
            leftTimeCount.innerHTML = hrsDifference + " hr " + minDifference + " Min For " + salatName;
        } else {
            if (minDifference != 0) {
                if (sign >= 0) {
                    leftTimeCount.innerHTML = minDifference + " Min For " + salatName;
                } else {
                    leftTimeCount.innerHTML = minDifference + " Min From " + salatName;
                }
            }
            if (minDifference < 30 && minDifference > 0) {
                leftTimeCount.parentElement.style.color = "red";
            }
        }
        document.body.style.cssText = `
        background:url(${backgrounds[prayIndex]});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    `;
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
getTiming();
