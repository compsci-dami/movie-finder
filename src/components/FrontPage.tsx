import React from "react";
import SearchBar from "./SearchBar";

interface FrontPageProps {
    title: string;
    subtitle: string;
}

const FrontPage: React.FC<FrontPageProps> = (props) => {
    return (
        <div className="front-page-container">
            <div className="title-row">
                <h1 className="title">{props.title}</h1>
                <img src="img/finder-icon.png" alt="Logo" className="logo" />
            </div>
            <SearchBar />
        </div>
    );
}
export default FrontPage;