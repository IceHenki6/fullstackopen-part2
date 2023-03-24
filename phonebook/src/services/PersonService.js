import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const createPerson = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(res=>res.data)
}

const updatePerson = (id, newPersonObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonObj)
    return request.then(res=>res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res=>res.data)
}
export default {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}