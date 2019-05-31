import React from "react";
import invoiceStore from "../store/InvoiceStore";
import InvoiceActions from "../action/InvoiceActions";
import CustomerActions from "../action/CustomerActions";
import CustomerResultStore from "../store/CustomerResultStore";
import ViewWindows from "./ViewWindows";
import OrdersResultStore from "../store/OrdersResultStore";
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
    }

    componentWillMount() {
        invoiceStore.addChangeListener(this.onInvoiceChange);
        CustomerResultStore.addChangeListener(this.onCustomerChange);
        invoiceActions.getInvoiceByID(this.props.match.params.id);
    }

    componentWillUnmount() {
        invoiceStore.removeChangeListener(this.onInvoiceChange);
    }

    onInvoiceChange() {
        this.setState({invoice: invoiceStore.result});
        customerActions.getCustomerByID(this.state.invoice.customerID);
        orderActions.getOrderByID(this.state.invoice.orderID);
    }

    onCustomerChange() {
        this.setState({customer: CustomerResultStore.result})
    }

    onOrderChange() {
        this.setState({order: OrdersResultStore.results})
    }

    render() {
        return (
            <div>
                <h1>Invoice</h1>
                <div><b>Seller:</b> ShutterStore LTD</div>
                <div><b>Customer:</b> {this.state.customer.name}</div>
                <div><b>CustomerID:</b> {this.state.invoice.customerID}</div>
                <div><b>Price:</b> {this.state.invoice.price}</div>
                <br />
                <ViewWindows windows={this.state.order.windows}/>
            </div>
        )
    }
}

export default ViewInvoice;
