const API_KEY = '8q0uldk3HqicmzdWe7WE4e61naSl1zkZfo2EGi3J'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const previousWeatherToggle = document.querySelector('.show-previous-weather');

const previousWeather = document.querySelector('.previous-weather')

previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
})

const getWeather = () => {
    return fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const { sol_keys, validity_checks, ...solData } = data
        return Object.entries(solData).map(([sol, data]) => {
            return {
                sol: sol,
                maxTemp: data.PRE.mx,
                minTemp: data.PRE.mn,
                windSpeed: data.PRE.av,
                windDirectionDegrees: data.WD.most_common == null ? null : data.WD.most_common.compass_degrees,
                windDirectionCardinal: data.WD.most_common == null ? null : data.WD.most_common.compass_point,
                date: new Date(data.First_UTC)
            }
        })
    })
}

getWeather().then(sols => {
    console.log(sols)
})