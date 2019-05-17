import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import './dispatcher';
import dispatcher from "./dispatcher";
import Card from './BootstrapUtil'
import Navbar from './Navbar'
import Customer from './Customer'

class App extends React.Component {
    state = {
        title: ""
    };

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    constructor(props) {
        super(props);
        dispatcher.register(payload => {
            if(payload.actionType === 'page-select') {
                this.setState({title: this.capitalize(payload.selectedPage)})
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <br />
                <div className="container">
                    <Card title={this.state.title} component={Display}></Card>
                </div>
            </div>
        );
    };
}

class Display extends React.Component {

    state = {
        selected: "customer"
    };

    constructor() {
        super();
        dispatcher.register(payload => {
            if(payload.actionType === 'page-select') {
                this.setState({selected: payload.selectedPage});
            }
        });

        dispatcher.dispatch({
            actionType: "page-select",
            selectedPage: "customer"
        });
    }

    render() {
        switch (this.state.selected){
            case "customer":
                return (
                    <Customer></Customer>
                )
            case "worker":
                return (
                    <Worker></Worker>
                )
            case "manager":
                return (
                    <Manager></Manager>
                )
            default:
                return (
                    <div className="spinner-border"></div>
                );
        }
    }
}

function Worker(){
    return (
        <div>Worker</div>
    )
}

function Manager(){
    return (
        <div>Manager</div>
    )
}

export default App;
