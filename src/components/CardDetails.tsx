import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCardById, getCards } from "../services/cardsService";
import { SiteTheme, SiteTheme2 } from "../App";


interface CardDetailsProps {
    darkMode: any;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ darkMode }) => {
    let { id } = useParams();
    let [cards, setCards] = useState<Card[]>([])
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    let navigate = useNavigate();
    const filteredCards = cards.filter((card) => card.id === Number(id));
    return (<>
        <div className="container">
            {filteredCards.length > 0 ? (<div className="container">
                {filteredCards.map((card: Card) => (<div className={`card mb-3 ${classes.background} ${classes.color}`} key={card.id} id="cardDetails">
                    <img src={card.coverImg} className="card-img-top" alt={card.imageAlt} width={250} height={400} />
                    <div className={`card-header ${classes.background}`}>
                        <h5 className="card-title mt-3">{card.title}</h5>
                        <p className="card-text"><small className={`text ${classes.color}`}>{card.subtitle}</small></p>
                    </div>
                    <div className={`card-body ${classes.background}`}>
                        <p className="card-text">{card.description}</p>
                        <p className="card-text"><span style={{ fontWeight: "bold" }}>Our email:</span> {card.email}</p>
                        <a href={`${card.web}`} target="_blank" className={`${classes.color}`}><button className={`btn ${classes2.color} ${classes2.background}`}>Our website</button></a>
                    </div>
                    <div className={`card-footer ${classes.background}`}>
                        <p><span style={{ fontWeight: "bold" }}>Adress: </span> {card.country}, {card.state}, {card.city}, {card.street}</p> <p><span style={{ fontWeight: "bold" }}>Phone: </span>{card.phone}</p> <p><span style={{ fontWeight: "bold" }}>Zip Code: </span>{card.zipCode}</p>
                    </div>
                </div>))
                }</div>) : (<p>No Cards</p>)}

        </div>
    </>);
}

export default CardDetails;