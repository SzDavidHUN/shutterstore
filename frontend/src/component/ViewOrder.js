import React from "react";
import ordersResultStore from '../store/OrdersResultStore';
import OrderActions from "../action/OrderActions";
import ViewWindows from "./ViewWindows";
import {CREATE_INVOICE_PREFIX, VIEW_INVOICE_PREFIX} from "../constants/RouterConstants";
import {Link} from "react-router-dom";

const orderActions = new OrderActions();

class ViewOrder extends React.Component {

    state = {
        order: {}
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        ordersResultStore.addChangeListener(this.onChange);
        this.onMarkAssembled = this.onMarkAssembled.bind(this);
    }

    componentWillMount() {
        orderActions.getOrderByID(this.props.match.params.id)
    }


    onChange() {
        this.setState({order: ordersResultStore.results[0]});
        console.log(this.state)
    }

    onMarkAssembled(){
        orderActions.markAsAssembled(this.props.match.params.id)
        orderActions.getOrderByID(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <h1>View Order</h1>
                <div><b>ID:</b> {this.props.match.params.id}</div>
                <div><b>Invoice ID:</b> {this.props.match.params.invoice}</div>
                <div><b>Submitted:</b> {this.state.order.date}</div>
                <div><b>Assembly:</b> {this.state.order.assembled ? (<span>Assembled</span>) : (
                    <span>Assembly is in progress</span>)}</div>
                <div><b>Installation
                    date:</b> {this.state.order.installationDate ? this.state.order.installationDate : (
                    <i>Not yet scheduled</i>)}</div>
                <div><b>Viewing as:</b> {this.props.match.params.role}</div>
                {
                    this.props.match.params.role === 'manager' ? (
                        <div>
                            <Button text="Set installation date"/>&nbsp;
                            {
                                this.state.order.invoice ? (
                                    <LinkButton text="View invoice"
                                                link={VIEW_INVOICE_PREFIX + this.state.order.invoice + '/manager'}/>
                                ) : <LinkButton text="Create invoice"
                                                link={CREATE_INVOICE_PREFIX + this.props.match.params.id}/>
                            }
                        </div>
                    ) : null
                }
                {
                    this.props.match.params.role === 'worker' ? (
                        <div>
                            <Button text="Mark as assembled" onClick={this.onMarkAssembled} />
                        </div>
                    ) : null
                }
                {
                    this.props.match.params.role === 'customer' ? (
                        <div>
                            {
                                this.state.order.invoice ? (
                                    <LinkButton text="View invoice"
                                                link={VIEW_INVOICE_PREFIX + this.state.order.invoice + '/customer'}/>
                                ) : <div className="btn btn-secondary disabled">Invoice is not yet available</div>
                            }

                        </div>
                    ) : null
                }
                <br/>
                <ViewWindows windows={this.state.order.windows}/>
            </div>
        )
    }

}

function LinkButton(props) {
    return (
        <Link to={props.link}>
            <button className="btn btn-primary">{props.text}</button>
        </Link>
    )
}


function Button(props) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>{props.text}</button>
    )
}

export default ViewOrder;
