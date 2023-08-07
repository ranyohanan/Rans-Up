import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getCards } from "../services/cardsService";
import Card from "../interfaces/Card";
import { SiteTheme, SiteTheme2 } from "../App";
interface AboutProps {
    darkMode: any;
}

const About: FunctionComponent<AboutProps> = ({ darkMode }) => {
    let [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err));
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    return (<>
        <div className="container">
            <nav id="aboutNav" className={`${classes.background} ${classes.color}`}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className={`nav-link active ${classes.color}`} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About Us</button>
                    <button className={`nav-link ${classes.color}`} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Contact</button>
                    <button className={`nav-link ${classes.color}`} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Our Clients</button>
                </div>
            </nav>
            <div className={`tab-content ${classes.color}`} id="nav-tabContent" >
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="content">
                        <p className="text-start mt-3" >Welcome to Ran's Up.</p>
                        <p className="text-start mt-3" >We are the best solution for you to promote your business.</p>
                        <p className="text-start mt-3" >With Ran's Up you can be sure that all the characteristics of your Business will come out directly and clearly right in front of  your clients.</p>
                        <p className="text-start mt-3" >Join us today, to Ran your business</p>
                    </div></div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <h2 className="text-start mt-3">Contact us:</h2>
                    <p className="text-start mt-3" ><span style={{ fontWeight: "bold" }}>Phone:</span> 055-8822746</p>
                    <p className="text-start mt-3" ><span style={{ fontWeight: "bold" }}>Adress:</span> Ma'ale Adumim, Hut hashani 52</p>
                    <p className="text-start mt-3" ><span style={{ fontWeight: "bold" }}>Email:</span> yohananran3@gmail.com</p>
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" >
                    {cards.length ? (<div> {cards.map((card: Card) => (<p className="text-start mt-3" style={{ padding: "1rem" }}><span style={{ fontWeight: "bold" }}>{card.title}:</span> {card.email} </p>))} </div>) : (<p>No Clients To Show</p>)}
                </div>
            </div></div>
    </>);
}

export default About;