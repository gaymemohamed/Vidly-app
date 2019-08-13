const express = require('express');
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const geners = require('./routes/geners');
const customers = require('./routes/customers');
const app = express();

mongoose.connect('mongodb://localhost/vidlyApp', { useNewUrlParser: true })
    .then(() => console.log('Connected to database....'))
    .catch(err => console.log('couldnot connect to db ....', err));

// middleware
app.use(express.json());
app.use('/api/customers' , customers);
app.use('/api/geners/', geners);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server run on port 5000...');

});