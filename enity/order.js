const nanoid = require('nanoid');

function Order(customerID) {
    this.id = nanoid();
    this.customerID = customerID;
    this.windows = [];
    this.date = new Date();
    this.installationDate = undefined;
    this.assembled = false;
}

module.exports = Order;
