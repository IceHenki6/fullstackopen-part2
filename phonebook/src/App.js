import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import PersonService from './services/PersonService'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(()=>{
    PersonService.getAll()
      .then(persons=>{
        setPersons(persons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const [notification, setNotification]  = useState(null)
  const [error, setError] = useState(null)

  const addPerson = (event)=>{
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }


    let alreadyExists = false;
    persons.forEach(person => {
      if(person.name === personObj.name){
        alreadyExists = true
        personObj.id = person.id
      }
    })
    if(!alreadyExists){
      PersonService.createPerson(personObj)
      .then(person=>{
        setPersons(persons.concat(person))
        setNotification(`Added ${person.name}`)
        setTimeout(() => {
          setNotification(null)
        },4000)
      })
    }else{
      // alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${personObj.name} 
        is already added to the phonebook, replace the old number with a new one?`)){
          PersonService.updatePerson(personObj.id, personObj).then(res=>{
            setPersons(persons.map(person => person.id !== personObj.id? person : res))
          }).catch(err => {
            console.log(err)
            setError(`Information of ${personObj.name} has already been removed from the server`)
            setTimeout(() => {
              setError(null)
            },5000)
          })
        }
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filter = (event) => {
    let filtered = []
    const input = event.target.value
    const expression = new RegExp(event.target.value, 'i')
    persons.forEach(person => {
      if(expression.test(person.name)){
        filtered.push(person)
      }
    })
    
    input.length > 0 ? setFilteredPersons(filtered) : setFilteredPersons([])
  }

  const handleDelete = person => {
    if(window.confirm(`Delete ${person.name}?`)){
      PersonService.deletePerson(person.id).then(
        setPersons(persons.filter(p=>p.id!==person.id))
      ).catch(err=>console.log(err))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={error}/>
      <Filter filter={filter}/>

      <h2>add a new</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>

      <Persons persons={persons} filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App