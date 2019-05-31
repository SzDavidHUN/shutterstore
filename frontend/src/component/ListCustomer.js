import React from 'react';
import CustomerActions from "../action/CustomerActions";
import customerStore from "../store/CustomerStore.js"
import PrettyTable from "./PrettyTable";
import LinkButton from "./LinkButton";
import {SHOW_CUSTOMER_BY_ID_PREFIX} from "../constants/RouterConstants";

const customerActions = new CustomerActions();

export default class Login extends React.Component {

    state = {
        customers: []
    };

    constructor(props) {
        super(props);
        this.handleCustomerUpdate = this.handleCustomerUpdate.bind(this)
    }

    componentWillMount() {
        customerStore.addChangeListener(this.handleCustomerUpdate);
        customerActions.getCustomers();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        customerStore.removeChangeListener(this.handleCustomerUpdate);
    }

    handleCustomerUpdate() {
        this.setState({customers: customerStore.customers})
    }

    render() {
        return (
            <div>
                <h1>Login ass</h1>
                <PrettyTable>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Login</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.customers.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td><LinkButton text="Login" link={SHOW_CUSTOMER_BY_ID_PREFIX + customer.id}/></td>
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
