const nanoid = require('nanoid');

function Customer(name){
    this.id = nanoid();
    this.name = name;
    this.orders = [];
}

module.exports = Customer;
