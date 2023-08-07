import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { deleteCard, getCards } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";
import CardItem from "./CardItem"; // Import the CardItem component
import DeleteModal from "./DeleteModal";
import { SiteTheme, SiteTheme2 } from "../App";

interface HomeProps {
    userInfo: any;
    darkMode: any;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, darkMode }) => {
    let navigate = useNavigate();
    let [cards, setCards] = useState<Card[]>([]);
    let [dataChanged, setDataChanged] = useState<boolean>(false);
    let render = () => setDataChanged(!dataChanged);
    useEffect(() => {
        getCards()
            .then((res) => {
                setCards(res.data)
                render()
            })
            .catch((err) => console.log(err));
    }, [dataChanged]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    return (
        <>
            <div className={`${classes.background}`}>
                <div className="container col-md" id="title">
                    <div className="row">
                        <div className={`col-md-10 ${classes.color}`} style={{ marginTop: "6rem" }} >
                            <h1 className="fade-in">Ran's Up</h1>
                            <p className="fade-in2">Ran Your Business</p>
                        </div>
                        <div className="col-md-2" style={{ marginTop: "6rem" }} id="title2">
                            <i className={`fa-solid fa-briefcase ${classes.color}`} style={{ fontSize: "16rem" }}></i>
                            {userInfo.userType == "Business" && <button className={`btn ${classes2.color} ${classes2.background}`} id="addBtn" onClick={() => navigate("/addcard")}>Add New Card</button>}
                            {userInfo.userType == "admin" && <button className={`btn ${classes2.color} ${classes2.background}`} id="addBtn" onClick={() => navigate("/addcard")}>Add New Card</button>}
                        </div>
                    </div>
                </div>
                <div className="conntainer">
                    <h2 className={`${classes.color}`}>Our Cards</h2>
                    {cards.length ? (
                        <div className="container">
                            {cards.map((card: Card) => (
                                <CardItem key={card.id} card={card} userType={userInfo.userType} userId={userInfo.userId} darkMode={darkMode} />
                            ))}
                        </div>
                    ) : (
                        <p>No Cards found</p>
                    )}
                </div></div>
        </>
    );
};

export default Home;