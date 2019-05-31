import React from 'react';
import CustomerActions from "../action/CustomerActions";

const customerActions = new CustomerActions();

export default function Register() {
    let handleSumbit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        customerActions.registerCustomer({
            name: data.get('nameInput')
        });
    };

    return (
        <div>
            <h1>Register new customer</h1>
            <form onSubmit={handleSumbit}>
                <FormTextInput id="nameInput" name="Name" placeholder="Enter full name" type="text"
                               help="Your real, legal, full name."/>
                <FormTextInput id="emailInput" name="E-mail address" placeholder="example@provider.com" type="email"
                               help="We'll never share your email with anyone else."/>
                <FormTextInput id="nameInput" name="Password" placeholder="Password" type="password" help=""/>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Newsletter (please send me spam)</label>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

function FormTextInput(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.name}</label>
            <input type={props.type} className="form-control" id={props.id} name={props.id}
                   aria-describedby={props.id + 'help'}
                   placeholder={props.placeholder}/>
            <small id={props.id + 'help'} className="form-text text-muted">{props.help}</small>
        </div>
    )
}
