import React from "react";


class Card extends React.Component {
    props = {
        title: "",
        component: null
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header font-weight-bold">{this.props.title}</div>
                    <div className="card-body">
                        <this.props.component></this.props.component>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </div>
        );
    }
}

export default Card;
