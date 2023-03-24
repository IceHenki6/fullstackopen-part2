import { useState, useEffect } from "react"
import axios from "axios"


const SingleCountry = ({country}) => {
    const [weather,setWeather] = useState(null)
    const lat = country.capitalInfo.latlng[0]
    const long = country.capitalInfo.latlng[1]
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`).then(res => {
            setWeather(res.data)
          }).catch(err=>{
            console.log(err)
            setWeather([])
          })
    }, [lat,long,api_key])

    if(weather){
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
                <div>
                    <h3>Languages</h3>
                    <ul>
                        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                    </ul>                 
                </div>
                <img className="flag" src={country.flags.svg} alt={country.flags.alt}/>

                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Icon describing the current weather"/>
                <h1>Wind {weather.wind.speed} m/s</h1>
            </div>
        )
    }

}

export default SingleCountry