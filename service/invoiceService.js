const nanoid = require('nanoid');
const Invoice = require('../enity/invoice');
const InvoiceDao = require('../dao/invoiceDao');

const OrderService = require('../service/orderService');
const orderService = new OrderService();

let invoiceDao;

function InvoiceService(){
    invoiceDao = new InvoiceDao();
}

InvoiceService.prototype.getAllCustomers = (callback) => {
    invoiceDao.getAllInvoices(callback);
};

InvoiceService.prototype.newOrder = (customerID, orderID, price, callback) => {
    const invoice = new Invoice(customerID, orderID, price);
    orderService.setInvoice(orderID, invoice.id, () => {
        console.log("Invoice cached");
    });
    invoiceDao.storeNewInvoice(invoice, callback);
};

InvoiceService.prototype.getInvoiceByID = (invoiceID, callback) => {
    invoiceDao.getInvoiceByID(invoiceID, callback);
};

InvoiceService.prototype.payInvoiceByID = (invoiceID, callback) => {
    invoiceDao.payInvoiceByID(invoiceID, callback);
};

module.exports = InvoiceService;
