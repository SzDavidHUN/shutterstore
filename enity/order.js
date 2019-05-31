const nanoid = require('nanoid');

function Order(customerID, name, windows) {
    this.id = nanoid();
    this.customerID = customerID;
    this.customerName = name
    this.windows = windows;
    this.date = new Date();
    this.installationDate = undefined;
    this.assembled = false;
    this.invoice = null;
}

module.exports = Order;
