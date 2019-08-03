const express = require('express');
const joi = require('@hapi/joi');

const app = express();

// middleware
app.use(express.json());

const geners = [
    {
        id: 1,
        type: 'Action',
        numberOfFilms: 20
    },
    {
        id: 2,
        type: 'Romantic',
        numberOfFilms: 50
    },
    {
        id: 3,
        type: 'Drama',
        numberOfFilms: 35
    }
];

app.get('/api/geners', (req, res) => {
    res.send(geners);

})

app.get('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }
    return res.send(gener);
})

app.post('/api/geners', (req, res) => {
    const gener = {
        id: geners.length + 1,
        type: req.body.type,
        numberOfFilms: req.body.numberOfFilms
    }

    const schema = {
        type: joi.string().min(3).required(),
    };
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    geners.push(gener);
    return res.send(gener);
})

app.put('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    gener.type = req.body.type;
    gener.numberOfFilms = req.body.numberOfFilms;

    res.send(gener);
})


app.delete('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }

    const index = geners.indexOf(gener);
    geners.splice(index, 1);

    return res.send(gener);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server run on port 3000...');

});