import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCardFromFav, getFav } from "../services/favsService";
import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import { SiteTheme, SiteTheme2 } from "../App";
interface FavCardsProps {
    userInfo: any;
    darkMode: any;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo, darkMode }) => {
    let [cardsInFav, setCardsInFav] = useState<Card[]>([])
    let [dataChanged, setDataChanged] = useState<boolean>(false);
    let render = () => setDataChanged(!dataChanged);
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getFav()
            .then((res) => {
                setCardsInFav(res.data)
            })
            .catch((err) => console.log(err))
    }, [dataChanged, darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    return (<>
        <div className="container">
            <div id="favTitle"><h3 className={`fade-in ${classes.color}`}>Favorite Cards</h3></div>
            {cardsInFav.length ? (
                <div>
                    {cardsInFav.map((card: Card) =>
                    (<div className={`card mb-3 mt-2 w-100 ${classes.background} ${classes.color}`} key={card._id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={card.imageUrl} className="img-fluid rounded-start" alt={card.imageAlt} />
                            </div>
                            <div className="col-md-8">
                                <div className={`card-header ${classes.background}`}>
                                    <NavLink className="navbar-brand" to={`/${card._id}`}><h5 className="card-title">{card.title}</h5></NavLink>
                                    <p className="card-text"><small className={`text ${classes.color}`}>{card.subtitle}</small></p>
                                </div>
                                <div className={`card-body text-start ${classes.background}`}>
                                    <p className="card-text">Phone: {card.phone}</p>
                                    <p className="card-text">Adress: {card.country}, {card.city}, {card.street}</p>
                                    <p className="card-text">Card Number: {card._id}</p>
                                </div>
                                <div className={`card-footer text-start ${classes.background}`}>
                                    <a href={`tel:${card.phone}`}><i className={`fa-solid fa-phone ${classes.color}`} style={{ fontSize: "1.5rem", marginRight: "1rem" }}></i></a>{ }
                                    <button className={`btn ${classes2.color} ${classes2.background}`} onClick={() => {
                                        deleteCardFromFav(card._id as string)
                                            .then((res) => (render()))
                                            .catch((err) => console.log(err))
                                    }}>Remove Card From Favourites</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                    }</div>) : (<p>No favorite Cards</p>)}</div>
    </>);
}

export default FavCards;