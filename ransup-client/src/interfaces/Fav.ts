import Card from "./Card";

export default interface Fav {
    id?: number;
    userId: string;
    cards: Card[];
    active: boolean;
}