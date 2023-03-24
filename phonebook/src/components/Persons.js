
const Persons = ({persons, filteredPersons,handleDelete}) => {
    return (
        <div>
            <div>
                {filteredPersons.length>0 ? filteredPersons.map(person => 
                    <div key={person.id}>
                         <p>{person.name} {person.number}</p>
                         <button onClick={()=>handleDelete(person)}>Delete</button>
                    </div>
                ) 
                : persons.map(person => 
                    <div key={person.id}>    
                        <p>{person.name} {person.number}</p> 
                        <button onClick={()=>handleDelete(person)}>Delete</button> 
                    </div>    
                )}
            </div>
        </div>
    )
}


export default Persons