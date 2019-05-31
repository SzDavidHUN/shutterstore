import React from "react";
import customerResultStore from "../store/CustomerResultStore"
import ordersResultStore from "../store/OrdersResultStore"
import CustomerActions from "../action/CustomerActions";
import OrderActions from "../action/OrderActions";
import ViewWindows from "./ViewWindows";
import Card from "./Card";
import InvoiceActions from "../action/InvoiceActions";

const customerActions = new CustomerActions();
const orderActions = new OrderActions();
const invoiceActions = new InvoiceActions();

class CreateInvoice extends React.Component {

    state = {
        customer: {},
        order: {},
        price: 0
    };

    constructor(props) {
        super(props);
        this.onOrderChange = this.onOrderChange.bind(this);
        this.onCustomerChange = this.onCustomerChange.bind(this);
        this.createInvoice = this.createInvoice.bind(this);
        orderActions.getOrderByID(this.props.match.params.orderid);
    }

    componentWillMount() {
        customerResultStore.addChangeListener(this.onCustomerChange);
        ordersResultStore.addChangeListener(this.onOrderChange);
        customerActions.getCustomerByID()
    }

    componentWillUnmount() {
        customerResultStore.removeChangeListener(this.onCustomerChange);
        ordersResultStore.removeChangeListener(this.onOrderChange);
    }

    onOrderChange() {
        this.setState({
            order: ordersResultStore.results[0]
        });
        customerActions.getCustomerByID(this.state.order.customerID);
    }

    onCustomerChange() {
        this.setState({
            customer: customerResultStore.result
        });
    }

    onPriceChange(event) {
        this.setState({price: parseInt(event.target.value)});
        console.log(event.target.value);
    }

    createInvoice() {
        invoiceActions.createInvoice({
            customerID: this.state.customer.id,
            orderID: this.state.order.id,
            price: this.state.price
        })
    }

    render() {
        return this.state.customer && this.state.order ? (
            <div>
                <h1>CreateInvoice</h1>
                <div>
                    <b>Customer:</b> {this.state.customer.name}<br/>
                    OrderID: {this.state.order.id}<br/>
                    Submitted: {this.state.order.date}<br/>
                    CustomerID: {this.state.customer.id}<br/>
                </div>
                <br/>
                <Card title="Set price">
                    <FormTextInput name="Price" type="number" id="price" onChange={(e) => this.onPriceChange(e)}/>
                    <Button text="Create invoice" onClick={this.createInvoice}/>
                </Card>
                <br/>
                <ViewWindows windows={this.state.order.windows}/>
            </div>
        ) : (
            <div className="spinner-border"/>
        );
    }
}

function Button(props) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>{props.text}</button>
    )
}

function FormTextInput(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.name}</label>
            <input type={props.type} className="form-control" id={props.id} name={props.id}
                   aria-describedby={props.id + 'help'}
                   placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
            <small id={props.id + 'help'} className="form-text text-muted">{props.help}</small>
        </div>
    )
}

export default CreateInvoice;
