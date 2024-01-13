// Call
// http://api.weatherapi.com/v1/current.json?key=cf37042c431d4f0391b151643232602&q=London&aqi=no
let searchBtn =document.querySelector(".find");

let inputvalue =document.getElementById("find");
let day = document.getElementById("day");
let month = document.getElementById("day-month");
let area = document.getElementById("location")
let temprature =document.getElementById("temprature")
let weatherIcon =document.getElementById("temp-icon")
let conditionText =document.getElementById("text")
let show1 =document.querySelector(".show1");
let prompt1=document.querySelector(".prompt1");
let show =document.querySelectorAll(".show");
let removePrompt = document.querySelectorAll(".prompt");


let nextDay= document.querySelectorAll(".day");
let nextTemprature =document.querySelectorAll(".temprature")
let nextMinTemprature =document.querySelectorAll(".minTemprature")
let nextIcon =document.querySelectorAll(".temp-icon")
let nextCondition =document.querySelectorAll(".condition")

let response ;
let dayArr  = ["sunday" ,"monday","tuesday","wednesday","thursday","friday","saturday"];
let monthArr = ["january","february","march","april","may","june","july","august","september","october","november","december" ];

let date = new Date();

async function getRequest(country){
   let request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3bdb58edaa474090891123757230811&q=${country}&days=3&aqi=no&alerts=no`)
    response =await request.json()
    prompt1.classList.add("d-none");
    show1.classList.remove("d-none");
    console.log(response);
    console.log(response.location.name); 
}


async function getWeather(country){
        await getRequest(country);
        getFirstDay();
        getOtherDays()
        
} 
inputvalue.addEventListener("keydown",function () {
    getWeather(inputvalue.value)
    
})
getWeather("Egypt");




function getFirstDay(){
    month.innerText= `${date.getDate()} ${monthArr[date.getMonth()]} `;
    day.innerText = `${dayArr[date.getDay()]}`;
    area.innerText =`${response.location.name}`;
    temprature.innerHTML=`${response.current.temp_c} <span class="fs-2 fw-bold">°C</span>`;
    weatherIcon.setAttribute("src",`https:${response.current.condition.icon}`);
    conditionText.innerHTML =` <p > ${response.current.condition.text}</p> 
                                <p >  <i class="fa-regular fa-compass"></i> ${response.current.wind_dir}</p>
                                 <p ><i class="fa-solid fa-wind"> </i>${response.current.wind_kph} km/h</p>
                                <p > <i class="fa-solid fa-umbrella"></i>  ${response.current.humidity} %</p>`;
}

function getOtherDays(){
for(let i =0 ; i<nextDay.length ;i++)
{

    nextDay[i].innerText = dayArr[new Date(response.forecast.forecastday[i+1].date).getDay()] ;
    nextIcon[i].setAttribute("src",`https:${response.forecast.forecastday[i+1].day.condition.icon}`) ;
    nextTemprature[i].innerHTML=`${response.forecast.forecastday[i+1].day.maxtemp_c} <span class="fs-2 fw-bold">°C</span>` ;
    nextMinTemprature[i].innerHTML=`${response.forecast.forecastday[i+1].day.mintemp_c} <span class="fs-2 fw-bold">°</span>` ;
    nextCondition[i].innerHTML=`<p>${response.forecast.forecastday[i+1].day.condition.text}</p>`;
    removePrompt[i].classList.add("d-none");
    show[i].classList.remove("d-none");

}

}
