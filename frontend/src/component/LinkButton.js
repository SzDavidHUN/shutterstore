import {Link} from "react-router-dom";
import React from "react";

function LinkButton(props) {
    return (
        <Link to={props.link}>
            <button className="btn btn-success btn-block">{props.text}</button>
        </Link>
    )
}

export default LinkButton
