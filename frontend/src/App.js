import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from "react-dom";


let asd = 'i';

function App() {
    return (
        <div>
            <Navbar></Navbar>
            <Conditional name={asd}></Conditional>
        </div>
    );
}

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">ShutterStore</div>
            <button className="">Customer</button>
            <div className="nav-link" onClick={asd='a'}>Worker</div>
            <div className="nav-link">Managern</div>
        </nav>
    );
}

class Conditional extends React.Component {
    constructor(){
        super()
        this.state = {};
        this.state.yolo = 'b'
    }

    asdf() {
        ReactDOM.render(
            <Conditional></Conditional>,
            document.getElementById('root')
        );
        this.state.yolo = 'a'
    }
    render() {
        return (
            <div>
                <div>Hello {this.props.name}</div>
                <div>Hello {this.state.yolo}</div>
                <div onClick={this.asdf}>Yolo</div>
            </div>
        );
    }
}

export default App;
