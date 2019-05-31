import * as React from "react";
import PartActions from "../../actions/PartActions";
import OrderActions from "../../actions/OrderActions";
import PartStore from "../../store/PartStore";
import OrderStore from "../../store/OrderStore";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import PartConstants from "../../constants/PartConstants"
import xor from "lodash.xor";

class JobAssembler extends React.Component {
    order;
    parts;
    assembledParts;

    constructor(props) {
        super(props);
        PartActions.fetchParts();
        const orderId = this.props.match.params.orderId;
        if (orderId) {
            OrderActions.fetchOrderById(orderId);
        }
        this._onChange = this._onChange.bind(this);
        this.state = {
            parts: PartStore._parts,
            order: OrderStore._referenceOrder,
            assembledParts: []
        };
        this.addPartToAssembledParts = this.addPartToAssembledParts.bind(this);
        this.removePartFromAssembledParts = this.removePartFromAssembledParts.bind(this);
    }

    _onChange() {
        this.setState({
            parts: PartStore._parts,
            order: OrderStore._referenceOrder
        });
    }

    componentDidMount() {
        PartStore.addChangeListener(this._onChange);
        OrderStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PartStore.removeChangeListener(this._onChange);
        OrderStore.removeChangeListener(this._onChange);
    }


    render() {
        let assembleButton = <button className="btn btn-secondary" type="button">
            Assemble
        </button>;
        if (this.state.assembledParts.length !== 0 && this.assembleIsPossible()) {
            assembleButton = <button className="btn btn-success" type="button" onClick={() => this.createAssemblyJob()}>
                Assemble
            </button>;
        }
        return <div className="job-part-assembler">
            {this.state.order.shutter && this.state.order.state !== 'ASSEMBLED' && <div>
                <div className="row">
                    <div className="col-md-2 order-parameters-title">
                        <strong>Order parameters</strong>
                    </div>
                    <div className="col-md-2">
                        <strong>Shutter material: </strong>{this.state.order.shutter.material}
                    </div>
                    <div className="col-md-2">
                        <strong>Adjuster material: </strong>{this.state.order.shutter.adjusterMaterial}
                    </div>
                    <div className="col-md-2">
                        <strong>With ventage: </strong>{this.state.order.shutter.withVentage ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className="row">
                    <hr/>
                </div>
                <div className="row">
                    <ListGroup className="col-md-4">
                        {this.state.parts.filter(part => {
                            if (!this.state.order.shutter.withVentage) {
                                return !part.name.includes('Ventage');
                            }
                            return true;
                        }).map(part => {
                            return <ListGroup.Item key={part._id}>
                                <span className="col-md-8">{part.name}</span>
                                {this.state.assembledParts.filter(assembledPart => assembledPart.type === part.type).length === 0 &&
                                <Badge pill
                                       className="offset-md-2 col-md-2"
                                       variant="success"
                                       onClick={() => this.addPartToAssembledParts(part)}>
                                    Add
                                </Badge>}
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                    <div className="col-md-4 offset-md-2">
                        <ListGroup variant="flush">
                            Parts to assemble:
                            {this.state.assembledParts.map(part => {
                                return <span key={Math.random()}>
                                    <strong>{part.name}</strong>
                                    <Badge pill
                                           className="offset-md-2 col-md-2"
                                           variant="danger"
                                           onClick={() => this.removePartFromAssembledParts(part)}>
                                    Remove
                                    </Badge>
                                </span>
                            })}
                        </ListGroup>
                    </div>
                    <div className="col-md-1">
                        {assembleButton}
                    </div>
                </div>
            </div>}
        </div>
    }

    addPartToAssembledParts(part) {
        const assembledParts = this.state.assembledParts;
        assembledParts.push(part);
        return this.setState({assembledParts: assembledParts});
    }

    removePartFromAssembledParts(partToRemove) {
        const assembledParts = this.state.assembledParts.filter(part => part._id !== partToRemove._id);
        return this.setState({assembledParts: assembledParts});
    }

    assembleIsPossible() {
        const assembledPartTypes = this.state.assembledParts.map(assembledPart => assembledPart.type);
        const necessaryPartTypes = this.state.order.shutter.withVentage ?
            PartConstants.PART_TYPES :
            PartConstants.PART_TYPES.filter(type => type !== 'VENTAGE');
        return xor(assembledPartTypes, necessaryPartTypes).length === 0;
    }

    createAssemblyJob() {
        OrderActions.setOrderToAssembled(this.state.order._id, this.state.assembledParts);
        this.props.history.push('/orderslist');
    }
}

export default JobAssembler;