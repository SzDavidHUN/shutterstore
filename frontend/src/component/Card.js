import React from 'react';

function Card(props) {
    return (
        <div className="card">
            <div className="card-header font-weight-bold">{props.title}</div>
            <div className="card-body">
                {props.children}
            </div>
            <div className="card-footer"></div>
        </div>
    )
}

export default Card;
