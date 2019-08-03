const express = require('express');
const joi = require('@hapi/joi');
const geners = require('./routes/geners');
const app = express();

// middleware
app.use(express.json());

app.use('/api/geners/', geners);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server run on port 5000...');

});