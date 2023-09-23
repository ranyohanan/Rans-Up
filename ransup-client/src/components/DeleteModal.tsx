import { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { deleteCard } from "../services/cardsService";
import Card from "../interfaces/Card";
interface DeleteModalProps {
    onHide: Function;
    show: boolean;
    card: Card;
    cardId: string;
    render: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ card, show, onHide, cardId, render }) => {
    let [dataChanged, setDataChanged] = useState<boolean>(false)

    useEffect(() => {

    }, [dataChanged]);
    const handleDeleteClick = () => {
        deleteCard(cardId)
            .then((res) => {
                render();
                onHide();
                successMsg("Card Deleted successfully");
            })
            .catch((err) => console.log(err));
    };

    return (<>
        <Modal show={show} onHide={() => onHide()}>
            <ModalHeader closeButton>
                Delete Card
            </ModalHeader>
            <ModalBody>
                Are you sure?
            </ModalBody>
            <ModalFooter>
                <Button variant="success" onClick={handleDeleteClick}>
                    Yes
                </Button>
                <Button variant="danger" onClick={() => onHide()}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal >
    </>);
}

export default DeleteModal;