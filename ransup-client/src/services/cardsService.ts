import axios from "axios";
import Card from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

//get all cards
export function getCards() {
    return axios.get(api)
}

//get user's cards
export function getUsersCards() {
    return axios.get(`${api}/mycards`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token, }, })
}

//get card by id
export function getCardById(id: string) {
    return axios.get(`${api}/${id}`)
}

//add new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token, }, })
}

//delete card
export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token, }, })
}

//update card
export function updateCard(updatedCard: Card, id: string) {
    return axios.put(`${api}/${id}`, updatedCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token, }, })
}