import axios from "axios";
import Card from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

//get all cards
export function getCards() {
    return axios.get(api)
}

//get card by id
export function getCardById(id: number) {
    return axios.get(`${api}/${id}`)
}

//add new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard)
}

//delete card
export function deleteCard(id: number) {
    return axios.delete(`${api}/${id}`)
}

//update card
export function updateCard(updatedCard: Card, id: number) {
    return axios.put(`${api}/${id}`, updatedCard)
}