
import { useState } from "react"
import SingleCountry from "./SingleCountry"


const Countries = ({countries}) => {
    const [singleCountry, setSingleCountry] = useState(null)

    const handleShow = (country) => {
        setSingleCountry(country)
    }

    const handleClose = () => {
        setSingleCountry(null)
    }

    if(countries.length === 1){
        const country = countries[0]
        return(
            <div>
                <SingleCountry country={country}/>
            </div>
        )
    }
    else if(countries.length <= 10){
        return(
            <div>
                {countries.map(country => {
                    return (
                        <div key={country.name.common} className="country-items">
                            {country.name.common}
                            <button onClick={()=>handleShow(country)}>show</button>
                        </div>
                    )
                })}
                {singleCountry && <div className="single-country"><button onClick={handleClose}>Close</button><SingleCountry country={singleCountry}/></div>}
            </div>
        )
    }else{
        return(
            <div>Too many matches, specify another filter</div>
        )
    }

}

export default Countries