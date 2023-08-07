import { FunctionComponent, useContext, useEffect } from "react";
import { SiteTheme, SiteTheme2 } from "../App";
interface PageNotFoundProps {
    darkMode: any;
}

const PageNotFound: FunctionComponent<PageNotFoundProps> = ({ darkMode }) => {
    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") == "true" ? 'black' : 'white';
    }, [darkMode]);
    let classes = useContext(SiteTheme);
    let classes2 = useContext(SiteTheme2);
    return (<>
        <h2 id="title404">Page Not Found</h2>
    </>);
}

export default PageNotFound;