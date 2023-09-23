import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";
import { addCard } from "../services/cardsService";
import { SiteTheme, SiteTheme2 } from "../App";
interface AddCardProps {
    userInfo: any;
    darkMode: any;
}

const AddCard: FunctionComponent<AddCardProps> = ({ userInfo, darkMode }) => {
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { title: "", subtitle: "", phone: "", email: "", description: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", web: "", houseNumber: 0, zipCode: "", coverImg: "", userId: userInfo.userId },
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
            zipCode: yup.string().min(5).required(),
            coverImg: yup.string().required().min(2),
            houseNumber: yup.number().required().min(1),
            web: yup.string().min(2)
        }), onSubmit: (values) => {
            addCard(values)
                .then((res) => {
                    navigate("/mycards/:userId")
                    successMsg("Your Card is completed successfully")
                })
                .catch((err) => console.log(err))
        }
    })

    return (<>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <h3 className={`${classes.color}`} id="addCardTitle">Add New Card</h3>
                <div className="row">
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingTitle" placeholder="Title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingTitle" className="ms-2">Title</label>
                        {formik.touched.title && formik.errors.title && (<p className="text-danger">{formik.errors.title}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingSubtitle" placeholder="Subtitle"
                            name="subtitle"
                            onChange={formik.handleChange}
                            value={formik.values.subtitle}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingLastName" className="ms-2">Subtitle</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (<p className="text-danger">{formik.errors.subtitle}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="Email Adress"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingEmail" className="ms-2">Email address</label>
                        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="phone" className="form-control" id="floatingPhone" placeholder="Phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        <label htmlFor="floatingPhone" className="ms-2">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingDescription" placeholder="Description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingDescription" className="ms-2">Description</label>
                        {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingImageUrl" placeholder="Image Url"
                            name="imageUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingImageUrl" className="ms-2">Image Url</label>
                        {formik.touched.imageUrl && formik.errors.imageUrl && (<p className="text-danger">{formik.errors.imageUrl}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingImageAlt" placeholder="Image Alt"
                            name="imageAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imageAlt}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingImageAlt" className="ms-2">Image Alt</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (<p className="text-danger">{formik.errors.imageAlt}</p>)}
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
                        {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingCity" placeholder="City"
                            name="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingCity" className="ms-2">City</label>
                        {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingStreet" placeholder="Street"
                            name="street"
                            onChange={formik.handleChange}
                            value={formik.values.street}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingStreet" className="ms-2">Street</label>
                        {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="number" className="form-control" id="floatingHouseNumber" placeholder="House Number"
                            name="houseNumber"
                            onChange={formik.handleChange}
                            value={formik.values.houseNumber}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingHouseNumber" className="ms-2">House Number</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingZipCode" placeholder="Zip Code"
                            name="zipCode"
                            onChange={formik.handleChange}
                            value={formik.values.zipCode}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingZipCode" className="ms-2">Zip Code</label>
                        {formik.touched.zipCode && formik.errors.zipCode && (<p className="text-danger">{formik.errors.zipCode}</p>)}
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
                        <input type="text" className="form-control" id="floatingCoverImg" placeholder="Cover Image"
                            name="coverImg"
                            onChange={formik.handleChange}
                            value={formik.values.coverImg}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingCoverImg" className="ms-2">Cover Image</label>
                        {formik.touched.coverImg && formik.errors.coverImg && (<p className="text-danger">{formik.errors.coverImg}</p>)}
                    </div>
                </div>
                <button className="btn btn-success mt-3 w-100 mb-3" type="submit" disabled={!formik.isValid || !formik.dirty}>Add Card</button>
            </form>
        </div>
    </>);
}

export default AddCard;