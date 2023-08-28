let headerTopHeight = document.querySelector('.header_top').offsetHeight;
let menu = document.querySelector('.header_top_links');
let moreBtn = document.querySelector('.more__btn');

let header  = document.querySelector('.header_bottom');
let headerNav = document.querySelector('.header_bottom-menu');
let headerHeight = header.getBoundingClientRect().bottom;
let menuBurger = document.querySelector('.header_bottom-burger');


//set date
const days = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'štvrtok', 'piatok', 'sobota' ];
const months = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'];
const date = new Date();
let dateParagpraph = document.querySelector('.header_data');
dateParagpraph.textContent = `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]}, ${date.getFullYear()}`;


//top menu dropdown


addEventListener("resize", () => {
    headerTopHeight = document.querySelector('header').offsetHeight;
    menu.style.top=`${headerTopHeight}px`;
    headerHeight = header.getBoundingClientRect().bottom;
    headerNav.style.top = headerHeight + 'px';
});

moreBtn.addEventListener('click', function(e){
    menu.classList.toggle('active');
});


//menu header 

headerNav.style.top = headerHeight + 'px';

menuBurger.addEventListener('click', ()=>headerNav.classList.toggle('active'));

//weather 

const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=Bratislava';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '893a6717b6msh67cf0c39e328d75p16e37ajsn139ee8302d67',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
let weatherData = [];
async function getWeather(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

let weatherBtn = document.querySelector('.weather-btn');
let weatherBlock = document.querySelector('.weather');
weatherBtn.addEventListener('click', function(){
    weatherBlock.classList.toggle('active')
})

function displayWeather(data){
    console.log(data)
    const {country, region } = data.location; 
    const {humidity, feelslike_c: temp, gust_mph:wind} = data.current;
    const {icon, text} =data.current.condition
    console.log(humidity, temp)
    console.log(country)
    weatherBlock.innerHTML = 
        `<div class="weather__body">
            <div class="">${country}, ${region}</div>
            <img src=${icon} alt='weather'>
            <div class="">Feels like ${temp}°C</div>
            <div class="">Humidity: ${humidity}%</div>
            <div class="">Wind: ${wind}(mph)</div>
        </div>`
}

window.addEventListener("load", async function (event) {
    let data = await getWeather()
    displayWeather(data)
  });

//footer-btn

let footerBtn = document.querySelector('.footer-btn');
footerBtn.addEventListener('click', function(e){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
});