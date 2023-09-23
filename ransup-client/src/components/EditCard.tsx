import { FunctionComponent, useContext, useEffect, useState } from "react";
import { successMsg } from "../services/feedbacksService";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getCardById, updateCard } from "../services/cardsService";
import Card from "../interfaces/Card";
import { SiteTheme, SiteTheme2 } from "../App";
interface EditCardProps {
    userInfo: any;
    darkMode: any;
}

const EditCard: FunctionComponent<EditCardProps> = ({ userInfo, darkMode }) => {
    let { id } = useParams();
    let [card, setCard] = useState<Card>({
        title: "", subtitle: "", phone: "", email: "", description: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", web: "", houseNumber: 0, zipCode: "", coverImg: "", userId: userInfo.userId
    });
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
        getCardById(String(id))
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err)
            )
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            title: card.title, subtitle: card.subtitle, phone: card.phone, email: card.email, description: card.description, imageUrl: card.imageUrl, imageAlt: card.imageAlt, state: card.state, country: card.country, city: card.city, street: card.street, web: card.web, houseNumber: card.houseNumber, zipCode: card.zipCode, coverImg: card.coverImg, userId: card.userId
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string().required().min(2),
            email: yup.string().required().email(),
            phone: yup.string().required().min(10),
            description: yup.string().required().min(2),
            imageUrl: yup.string().required().min(2),
            imageAlt: yup.string().required().min(2),
            state: yup.string().min(2),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            zipCode: yup.string().min(5),
            coverImg: yup.string().required().min(2),
            houseNumber: yup.number().required().min(1),
            web: yup.string().min(2)
        }), onSubmit: (values) => {
            updateCard(values, String(id))
                .then((res) => {
                    navigate("/mycards/:userId")
                    successMsg("Your Card has edited successfully")
                })
                .catch((err) => console.log(err))
        }
    })
    return (<>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <h3 className={`${classes.color}`} id="editTitle">Edit Card</h3>
                <div className="row">
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingTitle" placeholder="Title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingTitle" className="ms-2">Title</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingSubtitle" placeholder="Subtitle"
                            name="subtitle"
                            onChange={formik.handleChange}
                            value={formik.values.subtitle}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingLastName" className="ms-2">Subtitle</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="Email Adress"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingEmail" className="ms-2">Email address</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="phone" className="form-control" id="floatingPhone" placeholder="Phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        <label htmlFor="floatingPassword" className="ms-2">Phone</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingDescription" placeholder="Description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingDescription" className="ms-2">Description</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingImageUrl" placeholder="Image Url"
                            name="imageUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingImageUrl" className="ms-2">Image Url</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingImageAlt" placeholder="Image Alt"
                            name="imageAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imageAlt}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingImageAlt" className="ms-2">Image Alt</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingState" placeholder="State"
                            name="state"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingState" className="ms-2">State</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingCountry" placeholder="Country"
                            name="country"
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingCountry" className="ms-2">Country</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingCity" placeholder="City"
                            name="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingCity" className="ms-2">City</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingStreet" placeholder="Street"
                            name="street"
                            onChange={formik.handleChange}
                            value={formik.values.street}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingStreet" className="ms-2">Street</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="number" className="form-control" id="floatingHouseNumber" placeholder="House Number"
                            name="houseNumber"
                            onChange={formik.handleChange}
                            value={formik.values.houseNumber}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingHouseNumber" className="ms-2">House Number</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingZipCode" placeholder="Zip Code"
                            name="zipCode"
                            onChange={formik.handleChange}
                            value={formik.values.zipCode}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingZipCode" className="ms-2">Zip Code</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingWeb" placeholder="Web"
                            name="web"
                            onChange={formik.handleChange}
                            value={formik.values.web}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingWeb" className="ms-2">Web</label>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control mb-3" id="floatingCoverImg" placeholder="Cover Image"
                            name="coverImg"
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.coverImg}
                        />
                        <label htmlFor="floatingCoverImg" className="ms-2">Cover Image</label>
                    </div>
                </div>
                <button className="btn btn-success mt-3 w-100 mb-3" type="submit">Save</button>
            </form>
        </div>
    </>);
}

export default EditCard;