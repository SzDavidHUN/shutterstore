import React from "react";
import Card from "./Card";
import PrettyTable from "./PrettyTable";

function ViewWindows(props) {
    return props.windows ? (
        <Card title="Windows">
            {
                props.windows.map((window, windowIndex) => (
                    <ViewWindow key={windowIndex} windowIndex={windowIndex} window={window} />
                ))
            }
        </Card>
    ) : (
        <div className="spinner-border"></div>
    )

}

function ViewWindow(props){
    return (
        <Card title={props.windowIndex + 1 + '. window'}>
            <PrettyTable>
                <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Height</td>
                    <td>{props.window.height}</td>
                </tr>
                <tr>
                    <td>Width</td>
                    <td>{props.window.width}</td>
                </tr>
                </tbody>
            </PrettyTable>
            {
                props.window.shutter.map((shutter, shutterIndex) => (
                    <ViewShutter key={shutterIndex} shutterIndex={shutterIndex} shutter={shutter} />
                ))
            }
        </Card>
    )
}

function ViewShutter(props){
    return (
        <Card title={props.shutterIndex + 1 + '. shutter'}>
            <PrettyTable>
                <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Height</td>
                    <td>{props.shutter.height}</td>
                </tr>
                <tr>
                    <td>Width</td>
                    <td>{props.shutter.width}</td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td>{props.shutter.color}</td>
                </tr>
                <tr>
                    <td>Material</td>
                    <td>{props.shutter.material}</td>
                </tr>
                </tbody>
            </PrettyTable>
        </Card>
    )
}

export default ViewWindows
