import { useState, useEffect } from 'react'
import countryServices from './services/country'
import axios from 'axios'

function Country({countries}) {
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
          {Object.values(countries[0].languages).map((item) => {
            console.log(item)
            return (
              <li>{item}</li>
            )
          })}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt}/>
      </>
    )
  }
  else if (countries.length < 10) {
    return (
      <ul>
        {
          countries.map((country) => (
            <li>{country.name}</li>
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
      countryServices
      .getCountry(newCountries[0].name)
      .then((response) => setFilteredCountries([response]))
    } else {
      setFilteredCountries(newCountries)
    }
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
      <p>find countries <input onChange={filterCountries}/></p>
      <Country countries={filteredCountries} />
    </>
  )
}

export default App
