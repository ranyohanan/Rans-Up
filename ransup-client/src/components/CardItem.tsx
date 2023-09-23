import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Card from "../interfaces/Card";
import { addToFav } from "../services/favsService";
import { successMsg } from "../services/feedbacksService";
import { getCards } from "../services/cardsService";
import DeleteModal from "./DeleteModal";
import { SiteTheme, SiteTheme2 } from "../App";

interface CardItemProps {
    card: Card;
    userType: string;
    userId: string;
    darkMode: any;
    cardId: string;
    render: Function;
}

const CardItem: React.FC<CardItemProps> = ({ card, userType, userId, darkMode, cardId, render }) => {
    let [isLiked, setIsLiked] = useState(true);
    let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    let [id, setId] = useState<string>("");
    let [cards, setCards] = useState<Card[]>([]);
    let [dataChanged, setDataChanged] = useState<boolean>(false)
    const handleLikeClick = (card: Card) => {
        addToFav(card)
            .then((res) => {
                successMsg("Card added to your favorites cards");
                setIsLiked(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteClick = () => {
        setId(card._id as string)
        setOpenDeleteModal(true)
    };
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [dataChanged, darkMode]);

    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    return (
        <div className={`card mt-2 w-100 ${classes.background} ${classes.color}`}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={card.imageUrl} className="img-fluid rounded-start" alt={card.imageAlt} />
                </div>
                <div className="col-md-8">
                    <div className={`card-header ${classes.background}`} id="cardHeader">
                        <NavLink className="navbar-brand" to={`/${card._id}`}><h5 className="card-title">{card.title}</h5></NavLink>
                        <p className="card-text"><small className={`${classes.color}`}>{card.subtitle}</small></p>
                    </div>
                    <div className={`card-body text-start  ${classes.background}`}>
                        <p className="card-text">Phone: {card.phone}</p>
                        <p className="card-text">Adress: {card.country}, {card.city}, {card.street}</p>
                        <p className="card-text">Card Number: {card._id}</p>
                    </div>

                    <div className={`card-footer text-start ${classes.background} ${classes.color}`}>
                        <a href={`tel:${card.phone}`}>
                            <i className={`fa-solid fa-phone ${classes.color}`} style={{ fontSize: "1.5rem", marginRight: "1rem" }}></i>
                        </a>

                        {userType === "admin" && (
                            <i
                                className={isLiked ? `fa-regular fa-heart ${classes.color}` : `fa-solid fa-heart fa-disabled ${classes.color}`}
                                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                                onClick={() => handleLikeClick(card)}
                            ></i>
                        )}

                        {userType == "Standart" &&
                            <i className={isLiked ? `fa-regular fa-heart ${classes.color}` : `fa-solid fa-heart fa-disabled ${classes.color}`}
                                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                                onClick={() => handleLikeClick(card)}></i>
                        }
                        {userType == "Business" &&
                            <i className={isLiked ? `fa-regular fa-heart ${classes.color}` : `fa-solid fa-heart fa-disabled ${classes.color}`}
                                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                                onClick={() => handleLikeClick(card)}></i>
                        }

                        {userType === "admin" && (
                            <Link to={""} onClick={handleDeleteClick}>
                                <i
                                    className={`fa-solid fa-trash-can ${classes.color}`}
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            </Link>
                        ) || userId === card.userId && (<Link to={""} onClick={handleDeleteClick}>
                            <i
                                className={`fa-solid fa-trash-can ${classes.color}`}
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                        </Link>)}
                    </div></div></div>   <DeleteModal
                cardId={id}
                show={openDeleteModal}
                onHide={() => setOpenDeleteModal(false)} card={card} render={render} />
        </div>
    );

};

export default CardItem;