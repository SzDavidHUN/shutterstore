import React from 'react';
import customerResultStore from '../store/CustomerResultStore'
import CustomerActions from "../action/CustomerActions";
import editOrderStore from "../store/EditOrderStore";
import Card from "./Card";
import EditOrderActions from '../action/EditOrderActions'

const customerActions = new CustomerActions();
const editOrderActions = new EditOrderActions();

class EditOrder extends React.Component {

    state = {
        customer: {},
        windows: []
    };

    constructor(props) {
        super(props);
        this.onCustomerUpdate = this.onCustomerUpdate.bind(this);
        this.onWindowsUpdate = this.onWindowsUpdate.bind(this);
        editOrderActions.newOrder();
        customerResultStore.addChangeListener(this.onCustomerUpdate);
        editOrderStore.addChangeListener(this.onWindowsUpdate);
    }

    componentWillMount() {
        customerActions.getCustomerByID(this.props.match.params.id)
    }

    componentDidMount() {
        addWindow();
    }

    componentWillUnmount() {
        customerResultStore.removeChangeListener(this.onCustomerUpdate);
        editOrderStore.removeChangeListener(this.onWindowsUpdate);
    }

    onCustomerUpdate() {
        this.setState({customer: customerResultStore.result})
    }

    onWindowsUpdate() {
        this.setState({windows: editOrderStore.windows})
    }

    submitOrder() {
        editOrderActions.submitOrder();
    }

    render() {
        return (
            <div>
                <h1>New order</h1>
                <h5>Customer: {this.state.customer.name}</h5>
                <br/>
                Number of windows: {this.state.windows.length}
                <br/>
                <Card title="Windows">
                    {
                        this.state.windows.map((window, windowIndex) => (
                            <Window windowIndex={windowIndex} window={this.state.windows[windowIndex]}/>
                        ))
                    }
                </Card>
                <br/>
                <Button text="Add window" onClick={addWindow}/>
                <br/>&nbsp;<br/>
                <Button text="Submit order" onClick={this.submitOrder}/>
            </div>
        )
    }
}

//Functions

function addWindow() {
    editOrderActions.addWindow();
}

function addShutter(windowIndex) {
    editOrderActions.addShutter(windowIndex);
}

//Components

class Window extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = this.props.window
    }

    handleWindowChange(event, windowIndex) {
        const window = editOrderStore.windows[windowIndex];
        const inputName = event.target.name;
        window[inputName] = parseInt(event.target.value).toString();
        if (window[inputName] === "NaN")
            window[inputName] = "0";
        if (parseInt(window[inputName]) < 0)
            window[inputName] = -parseInt(window[inputName]);
        editOrderActions.updateWindow(windowIndex, window)
    }

    render() {
        return (
            <div>
                <Card title={this.props.windowIndex + 1 + '. window'}>
                    <FormTextInput type="number" id="height" name="Height" value={this.state.height}
                                   onChange={(event) => {
                                       this.handleWindowChange(event, this.props.windowIndex)
                                   }}/>
                    <FormTextInput type="number" id="width" name="Width" value={this.state.width}
                                   onChange={(event) => {
                                       this.handleWindowChange(event, this.props.windowIndex)
                                   }}/>
                    <div className="d-flex flex-wrap flex-row justify-content-center">
                        {
                            this.state.shutter.map((shutter, shutterIndex) => (
                                <Shutter key={shutterIndex} windowIndex={this.props.windowIndex}
                                         shutterIndex={shutterIndex} shutter={shutter}/>
                            ))
                        }

                    </div>
                    <br/>
                    <Button text="Add shutter" onClick={() => addShutter(this.props.windowIndex)}/>
                </Card>
                <br/>
            </div>
        )

    }
}

function handleShutterChange(event, windowIndex, shutterIndex) {
    const shutter = editOrderStore.windows[windowIndex].shutter[shutterIndex];
    const inputName = event.target.name;
    if (event.target.type === "number") {
        shutter[inputName] = parseInt(event.target.value).toString();
        if (shutter[inputName] === "NaN")
            shutter[inputName] = "0";
        if (parseInt(shutter[inputName]) < 0)
            shutter[inputName] = -parseInt(shutter[inputName]);
    } else {
        shutter[inputName] = event.target.value;
    }
    editOrderActions.updateShutter(windowIndex, shutterIndex, shutter)
}


function Shutter(props) {
    return (
        <div className="w-25">
            <Card title={props.shutterIndex + 1 + '. shutter'}>
                <FormTextInputInline type="number" id="height" name="Height" value={props.shutter.height}
                                     onChange={(event) => {
                                         handleShutterChange(event, props.windowIndex, props.shutterIndex)
                                     }}/>
                <FormTextInputInline type="number" id="width" name="Width" value={props.shutter.width}
                                     onChange={(event) => {
                                         handleShutterChange(event, props.windowIndex, props.shutterIndex)
                                     }}/>
                <FormTextInputInline type="text" id="color" name="Color" value={props.shutter.color}
                                     onChange={(event) => {
                                         handleShutterChange(event, props.windowIndex, props.shutterIndex)
                                     }}/>
                <FormTextInputInline type="text" id="material" name="Material" value={props.shutter.material}
                                     onChange={(event) => {
                                         handleShutterChange(event, props.windowIndex, props.shutterIndex)
                                     }}/>
            </Card>
            <br/>
        </div>
    )
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
                   placeholder={props.placeholder} value={props.value} onChange={props.onInvoiceChange}/>
            <small id={props.id + 'help'} className="form-text text-muted">{props.help}</small>
        </div>
    )
}

function FormTextInputInline(props) {
    return (
        <div className="form-group form-inline">
            <label className="col-sm-2" htmlFor={props.id}>{props.name}: </label>
            <div className="col-sm-1"/>
            <input type={props.type} className="form-control col-sm-8" id={props.id} name={props.id}
                   aria-describedby={props.id + 'help'}
                   placeholder={props.placeholder} value={props.value} onChange={props.onInvoiceChange}/>
            <small id={props.id + 'help'} className="form-text text-muted">{props.help}</small>
        </div>
    )
}

export default EditOrder
