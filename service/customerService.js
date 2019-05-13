const nanoid = require('nanoid');
const Customer = require('../enity/customer');
const CustomerDao = require('../dao/customerDao');

let customerDao;

function CustomerService() {
    customerDao = new CustomerDao();
}

CustomerService.prototype.getAllCustormers = (callback) => {
    customerDao.getAllCustomers((docs) => {
        callback(docs);
    });
};

CustomerService.prototype.newCustomer = (name) => {
    customerDao.storeNewCustomer(new Customer(name));
};

CustomerService.prototype.getCustomerById = (id, callback) => {
    customerDao.getCustomerById(id, callback);
};

CustomerService.prototype.getCustomerByName = (name, callback) => {
    customerDao.getCustomerByName(name, callback);
};

module.exports = CustomerService;
