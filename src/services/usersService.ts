import axios from "axios";
import User from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

//get all users
export function getUsers() {
    return axios.get(api)
}

//check user
export function checkUser(userToCheck: User) {
    return axios.get(`${api}?email=${userToCheck.email}&password=${userToCheck.password}`)
}

//add new user
export function addUser(newUser: User) {
    return axios.post(api, newUser)
}