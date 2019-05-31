import React from 'react';
import PrettyTable from "./PrettyTable";
import LinkButton from "./LinkButton";
import orderStore from "../store/OrderStore"
import OrderAction from "../action/OrderActions"
import {VIEW_ORDER_PREFIX} from "../constants/RouterConstants";

let orderAction = new OrderAction();

class ListOrders extends React.Component {
    state = {
        orders: []
    };

    constructor(props) {
        super(props);
        this.handleOrderUpdate = this.handleOrderUpdate.bind(this)
    }

    componentWillMount() {
        orderStore.addChangeListener(this.handleOrderUpdate);
        orderAction.getInProgressOrders();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        orderStore.removeChangeListener(this.handleOrderUpdate);
    }

    handleOrderUpdate() {
        this.setState({orders: orderStore.orders})
    }

    render() {
        return (
            <div>
                <PrettyTable>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map(order => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.customerName}</td>
                                    <td>{order.date}</td>
                                    <td><LinkButton text="Select" link={VIEW_ORDER_PREFIX + order.id + this.props.suffix}/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </PrettyTable>
            </div>
        )
    }

}

export default ListOrders
