import axios from "axios";
import Card from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/favs`;

//get fav by id
export function getFav(userId: number) {
    return axios.get(`${api}/?userId=${userId}&active=true`)
}

//create fav
export function createFav(userId: number) {
    return axios.post(api, { userId: userId, cards: [], active: true })
}

// add to fav / update fav
export async function addToFav(userId: number, favToAdd: Card) {
    try {
        // 1. search for the exising fav cards
        let res = await getFav(userId);
        // 2. add the new card to the cards array
        res.data[0].cards.push(favToAdd);
        // 3. update the fav - put or patch
        return axios.patch(`${api}/${res.data[0].id}`, {
            cards: res.data[0].cards,
        });
    } catch (error) {
        console.log(error);
    }
}

//delete card from fav
export async function deleteCardFromFav(userId: number, id: number) {
    try {
        // 1. search for the exising fav cards
        let res = await getFav(userId);
        // 2. delete the card from favs
        let indexToDelete = res.data[0].cards.findIndex((card: Card) => card.id == id)
        res.data[0].cards.splice(indexToDelete, 1);
        // 3. update the fav - put or patch
        return axios.patch(`${api}/${res.data[0].id}`, {
            cards: res.data[0].cards,
        });

    } catch (error) {
        console.log(error);
    }
}