const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//Conversion of Celsius to Farenheight
const cToF = (celsius) => {
    let cTemp = celsius;
    let cToFahr = cTemp * 9 / 5 + 32;
    let message = `${cToFahr}`;
    return message;
}

const fToC = (fahrenheit) => {
    let fTemp = fahrenheit;
    let fToCel = (fTemp - 32) * 5 / 9;
}

const updateUI = (data) => { 
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //Destructuring Properties
    const { cityDets, weather } = data;
    const currentTemp = weather.Temperature.Metric.Value;
    const currentF = cToF(currentTemp);
    
    //Update Details Template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <hr class="divide"></hr>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
     </div>
     <hr class="divide"></hr>
     <div class="display-4 my-4">
        <span>${currentF}</span>
        <span>&deg;F</span>
     </div>
    `;

    

    
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // update night.day and icon images
    let timeSrc = null;
    if(weather.isDayTime === true){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //Remove the D-none class if presetn
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {
    //prevent the default action
    e.preventDefault();

    //get city values
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //updating the UI with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


    //Set Local Storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
