import * as React from "react";
import OrderStore from "../../store/OrderStore";
import OrderActions from "../../actions/OrderActions";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import OrderConstants from '../../constants/OrderConstants'
import ProgressBar from "react-bootstrap/ProgressBar";


class OrderList extends React.Component {

    constructor(props) {
        super(props);
        OrderActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {orders: OrderStore._queriedOrders};
        this.renderRow = this.renderRow.bind(this);
    }

    render() {
        return <div className="order-list-container">
            <ProgressBar animated now={this.state.installProgress}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer Email</th>
                    <th>Shutter Material</th>
                    <th>Adjuster Material</th>
                    <th>With Ventage</th>
                    <th>State</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {this.state.orders.map(this.renderRow)}
                </tbody>
            </Table>
        </div>;
    }

    renderRow(props) {
        let optionButtonColumn;
        if (props.state === OrderConstants.ORDER_STATE.CREATED) {
            optionButtonColumn = <td>
                <Link className="btn btn-secondary" to={'/jobs/:orderId'.replace(':orderId', props._id)}>Assemble</Link>
            </td>
        } else if (props.state === OrderConstants.ORDER_STATE.ASSEMBLED) {
            optionButtonColumn = <td>
                <button className="btn btn-secondary" onClick={() => this.installShutter(props._id)}>Install</button>
            </td>
        } else if (props.state === OrderConstants.ORDER_STATE.INSTALLED) {
            optionButtonColumn = <td>
                <Link className="btn btn-secondary"
                      to={'/invoice/:orderId'.replace(':orderId', props._id)}>Invoice</Link>
            </td>
        }

        return (
            <tr key={props._id}>
                <td>{props._id}</td>
                <td>{props.customer.email}</td>
                <td>{props.shutter.material}</td>
                <td>{props.shutter.adjusterMaterial}</td>
                <td>{props.shutter.withVentage ? 'Yes' : 'No'}</td>
                <td>{props.state}</td>
                {optionButtonColumn}
            </tr>
        );
    }

    _onChange() {
        this.setState({orders: OrderStore._queriedOrders});
    }

    componentDidMount() {
        OrderStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener(this._onChange)
    }

    installShutter(orderId) {
        OrderActions.installShutter(orderId);
        this.setState({
            installProgress: 0
        });
        const interval = setInterval(function () {
            this.setState({installProgress: this.state.installProgress + 10});
            if (this.state.installProgress >= 100) {
                clearInterval(interval);
                window.location.reload();
            }
        }.bind(this), 1000);
    }

}

export default OrderList