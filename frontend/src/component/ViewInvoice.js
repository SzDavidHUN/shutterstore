import React from "react";
import invoiceStore from "../store/InvoiceStore";
import InvoiceActions from "../action/InvoiceActions";
import CustomerActions from "../action/CustomerActions";
import CustomerResultStore from "../store/CustomerResultStore";
import ViewWindows from "./ViewWindows";
import ordersResultStore from "../store/OrdersResultStore";
import OrderActions from "../action/OrderActions";

const invoiceActions = new InvoiceActions();
const customerActions = new CustomerActions();
const orderActions = new OrderActions();

class ViewInvoice extends React.Component {

    state = {
        invoice: {},
        customer: {},
        order: {}
    };

    constructor(props) {
        super(props);
        this.onInvoiceChange = this.onInvoiceChange.bind(this);
        this.onCustomerChange = this.onCustomerChange.bind(this);
        this.onOrderChange = this.onOrderChange.bind(this);
        this.onPayInvoice = this.onPayInvoice.bind(this);
    }

    componentWillMount() {
        invoiceStore.addChangeListener(this.onInvoiceChange);
        CustomerResultStore.addChangeListener(this.onCustomerChange);
        ordersResultStore.addChangeListener(this.onOrderChange);
        invoiceActions.getInvoiceByID(this.props.match.params.id);
    }

    componentWillUnmount() {
        invoiceStore.removeChangeListener(this.onInvoiceChange);
        CustomerResultStore.removeChangeListener(this.onCustomerChange);
        ordersResultStore.removeChangeListener(this.onOrderChange);
    }

    onInvoiceChange() {
        this.setState({invoice: invoiceStore.result});
        customerActions.getCustomerByID(this.state.invoice.customerID);
        orderActions.getOrderByID(this.state.invoice.orderID);
        console.log(this.state)
    }

    onCustomerChange() {
        this.setState({customer: CustomerResultStore.result})
    }

    onOrderChange() {
        this.setState({order: ordersResultStore.results[0]});
        console.log(this.state.order)
    }

    onPayInvoice() {
        invoiceActions.payInvoice(this.state.invoice.id);
        invoiceActions.getInvoiceByID(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <h1>Invoice</h1>
                <div><b>ID:</b> {this.state.invoice.id}</div>
                <div><b>Order this.state.invoiceID:</b> {this.state.invoice.orderID}</div>
                <div><b>Seller:</b> ShutterStore LTD</div>
                <div><b>Customer:</b> {this.state.customer.name}</div>
                <div><b>CustomerID:</b> {this.state.invoice.customerID}</div>
                <div><b>Price:</b> {this.state.invoice.price}</div>
                <div><b>Paid:</b> {this.state.invoice.paid ? <span className="table-success">Paid</span> : <span className="text-danger">Not paid</span>}</div>
                <br/>
                <ViewWindows windows={this.state.order.windows}/>
                {
                    this.props.match.params.role === 'customer' ? <Button text="Pay" onClick={this.onPayInvoice} /> : null
                }
            </div>
        )
    }
}

function Button(props) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>{props.text}</button>
    )
}

export default ViewInvoice;
