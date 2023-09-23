import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme, SiteTheme2 } from "../App";


interface NavBarProps {
    userInfo: any;
    setUserInfo: Function;
    setIsLoggedIn: Function;
    isLoggedIn: any;
    setDarkMode: Function;
    darkMode: any;
}

const NavBar: FunctionComponent<NavBarProps> = ({ setUserInfo, userInfo, setIsLoggedIn, isLoggedIn, setDarkMode, darkMode }) => {
    let navigate = useNavigate()
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);

    return (<>
        <nav className={`navbar navbar-expand-lg fixed-top ${classes.color} ${classes.background}`} id="menu">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={darkMode ? require("../ranUpBlack2.png") : require("../RansUp2.png")} alt="ran's up" width={300} height={130} />
                </NavLink>
                <button className={`navbar-toggler ${classes2.color} ${classes2.background}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/about" className={`nav-link ${classes.color}`} aria-current="page">About</NavLink>
                        </li>
                        {userInfo.userType === "Standart" && <li className="nav-item">
                            <NavLink to={`/favCards/`} className={`nav-link ${classes.color}`} aria-current="page">Fav Cards</NavLink>
                        </li>}
                        {userInfo.userType === "Business" && <li className="nav-item">
                            <NavLink to={`/favCards/`} className={`nav-link ${classes.color}`} aria-current="page">Fav Cards</NavLink>
                        </li>}
                        {userInfo.userType === "Business" && <li className="nav-item">
                            <NavLink to={`/mycards/${userInfo.userId}`} className={`nav-link ${classes.color}`} aria-current="page">My Cards</NavLink>
                        </li>}
                        {userInfo.userType === "admin" && <li className="nav-item">
                            <NavLink to={`/favCards/`} className={`nav-link ${classes.color}`} aria-current="page">Fav Cards</NavLink>
                        </li>}
                        {userInfo.userType === "admin" && <li className="nav-item">
                            <NavLink to={`/mycards/${userInfo.userId}`} className={`nav-link ${classes.color}`} aria-current="page">My Cards</NavLink>
                        </li>}
                    </ul>
                    <form className="d-flex" role="search">
                        <div className={`form-check form-switch ${classes.color} mt-3`}>
                            <i className="fa-solid fa-moon" style={{ marginRight: "2rem", marginLeft: "0.5rem", fontSize: "1.5rem" }}></i> <input className="form-check-input" style={{ width: "45px" }} type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                onChange={() => {
                                    setDarkMode(!darkMode)
                                    sessionStorage.setItem("darkMode", darkMode ? "false" : "true")
                                }}
                            /></div>
                        {isLoggedIn == false &&
                            <div>
                                <button className={`btn ${classes2.color} ${classes2.background}`} onClick={() => {
                                    navigate("/login")
                                }}>Login</button>
                                <button className={`btn ${classes2.color} ${classes2.background}`} onClick={() => {
                                    navigate("/register")
                                }}>Sign Up</button>
                            </div>
                        }
                        {isLoggedIn == true &&
                            <div>
                                <img src={`${userInfo.imageUrl}`} alt={`${userInfo.email}`} style={{ width: "50px", height: "50px", borderRadius: "100px" }} />
                                <button className={`btn ${classes2.color} ${classes2.background}`} onClick={() => {
                                    sessionStorage.removeItem("userInfo");
                                    setUserInfo({ email: false, userType: false });
                                    sessionStorage.setItem("isLoggedIn", "false");
                                    navigate("/login")
                                }}>Logout</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </nav>
    </>);
}

export default NavBar;