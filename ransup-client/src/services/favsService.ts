import axios from "axios";
import Card from "../interfaces/Card";
import _ from "lodash";

const api: string = `${process.env.REACT_APP_API}/favs`;

//get fav by id
export function getFav() {
    return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token, }, })
}

//create fav
export function createFav(userId: string) {
    return axios.post(api, { userId: userId, cards: [], active: true })
}

// add to fav / update fav
export async function addToFav(favToAdd: Card) {
    try {
        let card = _.pick(favToAdd, [
            "_id",
            "title",
            "subtitle",
            "email",
            "phone",
            "description",
            "imageUrl",
            "coverImg",
            "imageAlt",
            "city",
            "country",
            "state",
            "street",
            "houseNumber",
            "web",
            "zipCode",
        ]);
        return axios.post(api, card, {
            headers: {
                Authorization: JSON.parse(sessionStorage.getItem("token") as string)
                    .token,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

//delete card from fav
export async function deleteCardFromFav(id: string) {
    try {
        // 1. search for the exising fav cards
        let res = await getFav();
        // 2. delete the card from favs
        /* let indexToDelete = res.data[0].cards.findIndex((card: Card) => card._id == id); */
        // 3. update the fav - put or patch
        return axios.delete(`${api}/${id}`, {
            headers: {
                Authorization: JSON.parse(sessionStorage.getItem("token") as string)
                    .token,
            },
        })
    } catch (error) {
        console.log(error);
    }
}