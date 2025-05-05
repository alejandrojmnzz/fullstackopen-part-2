import { useState, useEffect } from 'react'
import countryServices from './services/country'

function Country({ countries, findCountry }) {
  if (countries.length === 0) {
    return
  }
  else if (countries.length === 1) {
    return (
      <>
        <h1>{countries[0].name.common}</h1>
        <p>Capital {countries[0].capital[0]}</p>
        <p>Area {countries[0].area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(countries[0].languages).map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        <p>Temperature {countries[0].main.temp}</p>
        <img src={`https://openweathermap.org/img/wn/${countries[0].weather[0].icon}@2x.png`}/>
        <p>Wind {countries[0].wind.speed} m/s</p>
      </>
    )
  }
  else if (countries.length < 10) {
    return (
      <ul>
        {
          countries.map((country) => (
            <li>{country.name} <button onClick={() => findCountry(country.name)}>Show</button></li>
          ))
        }
      </ul>
    )
  }
  else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}



function App() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  

  function filterCountries({ target }) {
    const newCountries = countries.filter((country) => country.name.toLowerCase().includes(target.value.toLowerCase()))

    if (newCountries.length === 1) {
      findCountry(newCountries[0].name)
    } else {
      setFilteredCountries(newCountries)

    }
  }

  function findCountry(name) {
    countryServices
      .getCountry(name)
        .then((response) => {
          const country = response
          
          countryServices
            .getWeather(response.capitalInfo.latlng[0], response.capitalInfo.latlng[1])
            .then((response) => {
              setFilteredCountries([{
                ...country,
                ...response
              }])
            })
        })
  }

  useEffect(() => {

    countryServices
      .getAllCountries()
      .then((allCountries) => {

        if (allCountries.length !== 0) {
          setCountries(allCountries)
        }
        else {
          countryServices
            .postAllCountries()
        }

      })

  }, [])

  return (
    <>
      <p>find countries <input onChange={filterCountries} /></p>
      <Country countries={filteredCountries} findCountry={findCountry} />
    </>
  )
}

export default App
