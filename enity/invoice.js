const nanoid = require('nanoid');

function Invoice(customerID, orderID, price) {
    this.id = nanoid();
    this.customerID = customerID;
    this.orderID = orderID;
    this.price = price;
    this.paid = false;
}

module.exports = Invoice;
