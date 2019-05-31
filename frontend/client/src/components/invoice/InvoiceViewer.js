import * as React from "react";
import PartActions from "../../actions/PartActions";
import OrderActions from "../../actions/OrderActions";
import OrderStore from "../../store/OrderStore";
import ListGroup from "react-bootstrap/ListGroup";

class InvoiceViewer extends React.Component {

    constructor(props) {
        super(props);
        PartActions.fetchParts();
        const orderId = this.props.match.params.orderId;
        if (orderId) {
            OrderActions.fetchOrderById(orderId);
        }
        this._onChange = this._onChange.bind(this);
        this.state = {
            order: OrderStore._referenceOrder
        };
        this.getPriceOfAssembledParts = this.getPriceOfAssembledParts.bind(this);
    }

    _onChange() {
        this.setState({
            order: OrderStore._referenceOrder
        });
    }

    componentDidMount() {
        OrderStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener(this._onChange);
    }

    render() {
        return <div className="invoice-viewer-container">
            <span className="navbar-brand row">Shutter invoice</span>
            <div className="row">
                <strong className="col-md-2">Part ID</strong>
                <strong className="col-md-2">Part name</strong>
                <strong className="col-md-2">Price</strong>
            </div>
            {this.state.order.parts && this.state.order.parts.map(part => {
                return <div className="row" key={part.name}>
                    <span className="col-md-2">{part._id}</span>
                    <span className="col-md-2">{part.name}</span>
                    <span className="col-md-2">{part.price}</span>
                </div>
            })}
            <strong className="navbar-brand row">Customer details</strong>
            {this.state.order.customer && <div className="row">
                <ListGroup className="customer-details-container">
                    <span>
                        {this.state.order.customer.foreName} {this.state.order.customer.surName}
                    </span>
                    <span>
                        {this.state.order.customer.zipCode} {this.state.order.customer.city}
                    </span>
                    <span>
                        {this.state.order.customer.street} {this.state.order.customer.houseNumber}
                    </span>
                    <span>
                        {this.state.order.customer.email}
                    </span>
                </ListGroup>
                <div className="col-md-2 offset-md-3">
                    <strong>Total: </strong> {this.getPriceOfAssembledParts()}
                </div>
            </div>}
        </div>
    }

    getPriceOfAssembledParts() {
        let price = 0;
        this.state.order.parts.forEach(part => {
            price = price + part.price;
        });
        return price;
    }

}

export default InvoiceViewer;