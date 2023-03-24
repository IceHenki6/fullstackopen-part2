import { useState, useEffect } from "react"
import './index.css'
import Countries from "./components/Countries"
import axios from "axios"
const App = () => {
  const [countryList, setCountryList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(()=>{

    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setCountryList(res.data)
    }).catch(err=>{
      console.log(err)
      setCountryList([])
    })

  },[])

  const handleInput = (event) => {
    const input = event.target.value 
    const exp = new RegExp(input, 'i')
    input.length>0? 
      setFilteredCountries(countryList.filter(country=>exp.test(country.name.common))) 
      : setFilteredCountries([])
  }
  return (
    <div>
      <div>
        <label>find countries <input onChange={handleInput} type="text"/></label>
      </div>
      <Countries countries={filteredCountries}/>
    </div>
  )
}

export default App