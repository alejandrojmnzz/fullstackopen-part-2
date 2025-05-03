import axios from "axios";

function addPerson(name, number) {
    return axios.post('http://localhost:3001/persons', {name: name, number: number})
}

export default { addPerson }