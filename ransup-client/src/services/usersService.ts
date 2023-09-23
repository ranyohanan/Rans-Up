import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

const api: string = `${process.env.REACT_APP_API}`;

//get all users
export function getUsers() {
    return axios.get(api)
}

//check user - login
export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck)
}

//add new user
export function addUser(newUser: User) {
    return axios.post(`${api}/register`, newUser)
}

//get user by id
export function getUserById(id: string) {
    return axios.get(`${api}/${id}`)
}

export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwt_decode(token)
}