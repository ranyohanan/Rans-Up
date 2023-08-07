import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { SiteTheme, SiteTheme2 } from "../App";

interface LoginProps {
    setUserInfo: Function
    setIsLoggedIn: Function;
    darkMode: any;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo, setIsLoggedIn, darkMode }) => {
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {
                        navigate("/");
                        successMsg("Login Successfully")
                        sessionStorage.setItem("userInfo",
                            JSON.stringify({
                                email: res.data[0].email,
                                userType: res.data[0].userType,
                                userId: res.data[0].id,
                                imageUrl: res.data[0].imageUrl
                            }))
                        setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                        sessionStorage.setItem("isLoggedIn", "true");
                        setIsLoggedIn(true);
                    } else (errorMsg("Wrong Email or Password"))
                })
                .catch((err) => console.log(err))
        }
    })
    return (<>
        <div className={`container `}>
            <form onSubmit={formik.handleSubmit}>
                <div id="loginTitle" className={`${classes.color}`}><h3>LOGIN</h3></div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="Email Adress"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                </div>
                <button className={`btn btn-success mt-3 w-75`} type="submit" disabled={!formik.isValid || !formik.dirty}>Login</button>
            </form>
            <p className={`${classes.color}`}>New User?{<Link to={"/register"} style={{ textDecoration: "none" }}> register here</Link>}</p>
        </div>
    </>);
}

export default Login;