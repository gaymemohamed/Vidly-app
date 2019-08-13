const {Customer , Validate}= require('../models/customer');
const joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    }
    catch (err) {
        console.log(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send('this gener id is not exist');
        }
        return res.send(customer);
    }
    catch (err) {
        console.log(err.message);

    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = Validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });

        customer = await customer.save();
        return res.send(customer);
    }
    catch (err) {
        console.log(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try{
    let customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone }, { new: true });
    if (!customer) {
        return res.status(404).send("this id is not refer to an customer");
    }

    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    res.send(customer);
}
catch(err){
    console.log(err.message);
}
})
router.delete('/:id', async(req, res) => {
    let customer =await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
        return res.status(404).send('this gener id is not exist');
    }

    return res.send(customer);
})

module.exports = router;