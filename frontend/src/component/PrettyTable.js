import React from "react";

function PrettyTable(props) {
    return (
        <table className="table table-striped table-light table-bordered table-hover">
            {props.children}
        </table>
    )
}

export default PrettyTable
