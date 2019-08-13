const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean
    },
    phone: {
        type: Number,
        required: true
    }

});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: joi.string().min(3).required(),
        phone:  joi.string().min(5).max(50).required(),
        isGold: joi.boolean()
    };

    return joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.Validate= validateCustomer;