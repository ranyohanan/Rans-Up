import { FunctionComponent, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";


interface FooterProps {
    userInfo: any;
    setUserInfo: Function;
    setIsLoggedIn: Function;
    isLoggedIn: any;
}

const Footer: FunctionComponent<FooterProps> = ({ setUserInfo, userInfo, setIsLoggedIn, isLoggedIn }) => {
    let navigate = useNavigate()
    let classes = useContext(SiteTheme)
    return (<>
        <nav className={`navbar navbar-expand-lg ${classes.color} ${classes.background}`} id="footer">
            <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link" aria-current="page"><i className={`fa-solid fa-info ${classes.color}`}></i></NavLink>
                </li>
                {userInfo.userType == "Standart" && <li className="nav-item">
                    <NavLink to={`/favCards/${userInfo.userId}`} className="nav-link" aria-current="page"><i className={`fa-solid fa-heart ${classes.color}`}></i></NavLink>
                </li>}
                {userInfo.userType == "Business" && <li className="nav-item">
                    <NavLink to={`/favCards/${userInfo.userId}`} className="nav-link" aria-current="page"><i className={`fa-solid fa-heart ${classes.color}`}></i></NavLink>
                </li>}
                {userInfo.userType == "Business" && <li className="nav-item">
                    <NavLink to={`/mycards/${userInfo.userId}`} className="nav-link" aria-current="page"><i className={`fa-regular fa-id-card ${classes.color}`}></i></NavLink>
                </li>}
                {userInfo.userType == "admin" && <li className="nav-item">
                    <NavLink to={`/favCards/${userInfo.userId}`} className="nav-link" aria-current="page"><i className={`fa-solid fa-heart ${classes.color}`}></i></NavLink>
                </li>}
                {userInfo.userType == "admin" && <li className="nav-item">
                    <NavLink to={`/mycards/${userInfo.userId}`} className="nav-link" aria-current="page"><i className={`fa-regular fa-id-card ${classes.color}`}></i></NavLink>
                </li>}
            </ul>
        </nav >
    </>);
}

export default Footer;