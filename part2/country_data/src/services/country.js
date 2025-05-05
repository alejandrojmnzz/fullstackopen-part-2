import axios from 'axios'

function postAllCountries() {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
            response.data.map((country) => {
                const newCountry = { "name": country.name.common }
                axios.post('http://localhost:3001/countries', newCountry)
            })
        }
        )
}

function getAllCountries() {
    const request = axios.get('http://localhost:3001/countries')
    return request.then(response => response.data)
}

function getCountry(name) {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return request.then((response) => response.data)
}

function getWeather(lat, lon) {
    const apiKey = import.meta.env.VITE_SOME_KEY
    
    const request =axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    return request.then((response) => response.data)
}

export default { postAllCountries, getAllCountries, getCountry, getWeather }