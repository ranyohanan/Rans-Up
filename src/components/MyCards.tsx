import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { SiteTheme, SiteTheme2 } from "../App";
interface MyCardsProps {
    userInfo: any;
    darkMode: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo, darkMode }) => {
    let { userId } = useParams();
    let [cards, setCards] = useState<Card[]>([])
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    const filteredCards = cards.filter((card) => card.userId === userInfo.userId);
    return (<>
        <div className="container">
            <div id="myCardsTitle"><h3 className={`fade-in ${classes.color}`}>My Cards</h3></div>
            {filteredCards.length ? (
                <div className="container">
                    {filteredCards.map((card: Card) =>
                    (<div className={`card mb-3 mt-2 w-100 ${classes.color} ${classes.background}`}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={card.imageUrl} className="img-fluid rounded-start" alt={card.imageAlt} />
                            </div>
                            <div className="col-md-8">
                                <div className={`card-header ${classes.background}`}>
                                    <NavLink className="navbar-brand" to={`/carddetails/${card.id}`}><h5 className="card-title">{card.title}</h5></NavLink>
                                    <p className="card-text"><small className={`text ${classes.color}`}>{card.subtitle}</small></p>
                                </div>
                                <div className={`card-body text-start ${classes.background}`}>
                                    <p className="card-text">Phone: {card.phone}</p>
                                    <p className="card-text">Adress: {card.country}, {card.city}, {card.street}</p>
                                    <p className="card-text">Card Number: {card.id}</p>
                                </div>
                                <div className={`card-footer text-start ${classes.background}`}>
                                    <a href={`tel:${card.phone}`}><i className={`fa-solid fa-phone ${classes.color}`} style={{ fontSize: "1.5rem", marginRight: "1rem" }}></i></a>
                                    <NavLink to={`/cards/edit/${card.id}`}><i className={`fa-regular fa-pen-to-square ${classes.color}`} style={{ fontSize: "1.5rem", marginRight: "1rem" }}></i></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>)
                    )}
                </div>
            ) : (<p>No Cards To Show</p>)}
        </div>
    </>);
}

export default MyCards;