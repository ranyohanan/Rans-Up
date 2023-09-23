import { FunctionComponent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersService";
import { successMsg } from "../services/feedbacksService";
import { SiteTheme, SiteTheme2 } from "../App";
interface RegisterProps {
    darkMode: any;
    setUserInfo: Function
    setIsLoggedIn: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ darkMode, setIsLoggedIn, setUserInfo }) => {
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { firstName: "", lastName: "", phone: "", email: "", password: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zipCode: "", userType: "" },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
            phone: yup.string().required().min(10),
            imageUrl: yup.string().required().min(2),
            imageAlt: yup.string().required().min(2),
            state: yup.string().min(2),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            zipCode: yup.string().min(5).required(),
            userType: yup.string().required().min(2),
            houseNumber: yup.number().required().min(1)
        }), onSubmit: (values) => {
            addUser(values)
                .then((res) => {
                    navigate("/")
                    successMsg("Your Sign up is Completed")
                    sessionStorage.setItem("token", JSON.stringify({ token: res.data }))
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: (getTokenDetails() as any).email,
                        userType: (getTokenDetails() as any).userType,
                        userId: (getTokenDetails() as any)._id,
                        imageUrl: (getTokenDetails() as any).imageUrl,
                    }))
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                    sessionStorage.setItem("isLoggedIn", "true");
                    setIsLoggedIn(true);
                })
                .catch((err) => console.log(err))
        }
    })

    return (<>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div id="registerTitle" className={`${classes.color}`}><h3>Sign Up</h3></div>
                <div className="row">
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name"
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingFirstName" className="ms-2">First Name</label>
                        {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name"
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingLastName" className="ms-2">Last Name</label>
                        {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
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
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <label htmlFor="floatingPassword" className="ms-2">Password</label>
                        {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                        <input type="text" className="form-control" id="floatingPhone" placeholder="Phone"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingPhone" className="ms-2">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
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
                    </div>
                    <div className="mb-3 col-md-6">
                        <select className="form-select h-100" aria-label="Default select example" name="userType"
                            onChange={formik.handleChange}
                            value={formik.values.userType}
                            onBlur={formik.handleBlur}>
                            <option value={""}>User Type</option>
                            <option value="Business">Business</option>
                            <option value="Standart">Standart</option>
                        </select>
                        {formik.touched.userType && formik.errors.userType && (<p className="text-danger">{formik.errors.userType}</p>)}
                    </div>
                </div>
                <button className="btn btn-success mt-3 w-100" type="submit" disabled={!formik.isValid || !formik.dirty}>Register</button>
            </form>
            <p className={`${classes.color}`}>Already have an Account? {<Link style={{ textDecoration: "none" }} to={"/login"}>login here</Link>}</p>
        </div>
    </>)
}

export default Register;



