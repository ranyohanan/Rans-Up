import { FunctionComponent, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { deleteCard } from "../services/cardsService";
import Card from "../interfaces/Card";
interface DeleteModalProps {
    onHide: Function;
    show: boolean;
    card: Card;
    productId: number;
    render: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ card, show, onHide, productId, render }) => {
    let [dataChanged, setDataChanged] = useState<boolean>(false)


    const handleDeleteClick = () => {
        deleteCard(productId)
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