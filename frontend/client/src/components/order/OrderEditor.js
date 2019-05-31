import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import OrderActions from "../../actions/OrderActions";
import PartStore from "../../store/PartStore";
import PartActions from "../../actions/PartActions";
import OrderConstants from '../../constants/OrderConstants'
import Form from "react-bootstrap/Form";

class OrderEditor extends React.Component {
    order;
    materials;

    windowHeight;
    windowWidth;
    windowDepth;
    shutterMaterial;
    adjusterMaterial;
    withVentage;
    foreName;
    surName;
    zipCode;
    city;
    street;
    houseNumber;
    email;

    constructor(props) {
        super(props);
        PartActions.fetchMaterials();
        this._onChange = this._onChange.bind(this);
        this.state = {materials: PartStore._materials};
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    _onChange() {
        this.setState({materials: PartStore._materials});
    }

    componentDidMount() {
        PartStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PartStore.removeChangeListener(this._onChange);
    }

    render() {
        return <div className="order-editor-container">
            <span className="navbar-brand row">Window parameters</span>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="row window-options-container">
                    <InputGroup className="col-md-2">
                        <FormControl min="0" required type="number" placeholder="Window Height" name="windowHeight"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl min="0" required type="number" placeholder="Window Width" name="windowWidth"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl min="0" required type="number" placeholder="Window Depth" name="windowDepth"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                </div>
                <span className="navbar-brand row">Shutter parameters</span>
                <div className="row">
                    <InputGroup className="col-md-2">
                        <select required name="shutterMaterial" onChange={this.handleChange}>
                            <option defaultValue={null} label="Choose a material"/>
                            {this.state.materials.map((material) => {
                                return (
                                    <option key={material} value={material}>
                                        {material}
                                    </option>
                                );
                            })}
                        </select>
                    </InputGroup>
                    <InputGroup className="col-md-5">
                        <span className="col-md-4">Adjuster Material:</span>
                        <strong className="col-md-2">Plastic</strong>
                        <InputGroup.Radio required name="adjusterMaterial" value="Plastic"
                                          onChange={this.handleChange}/>
                        <strong className="col-md-2">Fabric</strong>
                        <InputGroup.Radio required name="adjusterMaterial" value="Fabric" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-3">
                        <span className="col-md-6">With ventage</span>
                        <InputGroup.Checkbox name="withVentage" onChange={this.handleChange}/>
                    </InputGroup>
                </div>
                <span className="navbar-brand row">Customer details</span>
                <div className="row">
                    <InputGroup className="col-md-2">
                        <FormControl required placeholder="Forename" name="foreName"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl required placeholder="Surname" name="surName"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl min="0" required type="number" placeholder="Zip code" name="zipCode"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl required placeholder="City" name="city"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                </div>
                <div className="row">
                    <InputGroup className="col-md-2">
                        <FormControl required placeholder="Street" name="street"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl min="0" required type="number" placeholder="House number" name="houseNumber"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="col-md-2">
                        <FormControl type="email" required placeholder="Email address" name="email"
                                     onChange={this.handleChange}/>
                    </InputGroup>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-9 save-button-container">
                        <button className="btn btn-primary col-md-12" type="submit">Order</button>
                    </div>
                </div>
            </Form>
        </div>
    }

    createWindowAndShutterOrder() {
        const order = {};
        order['window'] = {
            height: this.state.windowHeight,
            width: this.state.windowWidth,
            depth: this.state.windowDepth,
        };
        order['shutter'] = {
            material: this.state.shutterMaterial,
            adjusterMaterial: this.state.adjusterMaterial,
            withVentage: !!(this.state.withVentage && this.state.withVentage === 'on')
        };
        order['customer'] = {
            foreName: this.state.foreName,
            surName: this.state.surName,
            zipCode: this.state.zipCode,
            city: this.state.city,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            email: this.state.email
        };
        order['state'] = OrderConstants.ORDER_STATE.CREATED;
        return order;
    }

    handleSubmit(event) {
        OrderActions.createOrder(this.createWindowAndShutterOrder());
    }
}

export default OrderEditor