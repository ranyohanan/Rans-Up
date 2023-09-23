import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCardById } from "../services/cardsService";
import { SiteTheme, SiteTheme2 } from "../App";


interface CardDetailsProps {
    darkMode: any;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ darkMode }) => {
    let { id } = useParams();
    let [cards, setCards] = useState<Card>()
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCardById(id as string)
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);

    return (<>
        <div className="container">
            {cards ? (<div className="container">
                <div className={`card mb-3 ${classes.background} ${classes.color}`} key={cards._id} id="cardDetails">
                    <img src={cards.coverImg} className="card-img-top" alt={cards.imageAlt} width={250} height={400} />
                    <div className={`card-header ${classes.background}`}>
                        <h5 className="card-title mt-3">{cards.title}</h5>
                        <p className="card-text"><small className={`text ${classes.color}`}>{cards.subtitle}</small></p>
                    </div>
                    <div className={`card-body ${classes.background}`}>
                        <p className="card-text">{cards.description}</p>
                        <p className="card-text"><span style={{ fontWeight: "bold" }}>Our email:</span> {cards.email}</p>
                        <a href={`${cards.web}`} target="_blank" className={`${classes.color}`}><button className={`btn ${classes2.color} ${classes2.background}`}>Our website</button></a>
                    </div>
                    <div className={`card-footer ${classes.background}`}>
                        <p><span style={{ fontWeight: "bold" }}>Adress: </span> {cards.country}, {cards.state}, {cards.city}, {cards.street}</p> <p><span style={{ fontWeight: "bold" }}>Phone: </span>{cards.phone}</p> <p><span style={{ fontWeight: "bold" }}>Zip Code: </span>{cards.zipCode}</p>
                    </div>
                </div>
            </div>) : (<p>No Cards</p>)}

        </div>
    </>);
}

export default CardDetails;