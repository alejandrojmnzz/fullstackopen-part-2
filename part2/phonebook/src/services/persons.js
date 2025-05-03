import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

function addPerson(name, number) {
    return axios.post(baseUrl, {name: name, number: number})
}

function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { addPerson, deletePerson }