import Card from "./Card";

export default interface Fav {
    id?: number;
    userId: number;
    cards: Card[];
    active: boolean;
}