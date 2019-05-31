import React from 'react';
import CustomerActions from '../action/CustomerActions';
import cusomerResultStore from '../store/CustomerResultStore';
import PrettyTable from './PrettyTable';
import orderResultStore from '../store/OrdersResultStore';
import LinkButton from './LinkButton';
import {NEW_ORDER_PREFIX, VIEW_ORDER_PREFIX, VIEW_ORDER_SUFFIX_CUSTOMER} from "../constants/RouterConstants";

const customerActions = new CustomerActions();

class ShowCustomer extends React.Component {
    state = {
        customer: {},
        orders: []
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        cusomerResultStore.addChangeListener(this.onChange);
        orderResultStore.addChangeListener(this.onChange);
        customerActions.getCustomerByID(this.props.match.params.id);
        customerActions.getOrdersForCustomer(this.props.match.params.id);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        cusomerResultStore.removeChangeListener(this.onChange);
        orderResultStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            customer: cusomerResultStore.result,
            orders: orderResultStore.results
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.customer.name}</h1>
                <br/>
                <PrettyTable>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Assembled</th>
                    </tr>
                    </thead>
                    <OrderTableBody orders={this.state.orders}/>
                </PrettyTable>
                <br/>
                <LinkButton text="New Order" link={NEW_ORDER_PREFIX + this.state.customer.id}/>
            </div>
        );
    }
}

function OrderTableBody(props) {
    return (
        <tbody>
        {
            props.orders.map((order) => {
                return (
                    <OrderRow order={order}/>
                )
            })
        }
        </tbody>
    )
}

function OrderRow(props) {
    return (
        <tr>
            <td>{props.order.date}</td>
            {props.order.assembled ?
                (<td>Assembled</td>) :
                (<td>Assembly is in progress</td>)}
            <td>
                <LinkButton text="Show details" link={VIEW_ORDER_PREFIX + props.order.id + VIEW_ORDER_SUFFIX_CUSTOMER}/>
            </td>
        </tr>
    )
}


export default ShowCustomer
