const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const generSchema =new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength: 5,
        maxlength:50
    }
})

const Gener = mongoose.model('Gener' , generSchema); 

function validateGenre(genre) {
    const schema = {
        name: joi.string().min(3).required()
    };

    return joi.validate(genre, schema);
}

module.exports.Gener = Gener;
module.exports.Validate= validateGenre;