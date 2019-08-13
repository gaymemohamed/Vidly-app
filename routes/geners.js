const {Gener , Validate} = require('../models/gener');
const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router();


router.get('/',async (req, res) => {
    const geners = await Gener.find();
    res.send(geners);

})

router.get('/:id',async (req, res) => {
    const gener =await Gener.findById(req.params.id);
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }
    return res.send(gener);
})

router.post('/', async(req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let gener =new Gener({
        name:req.body.name
    })

    
    gener= await gener.save();
    return res.send(gener);
})

router.put('/:id',async (req, res) => {
    const gener =await Gener.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true});
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }

    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    

    res.send(gener);
})


router.delete('/:id', async(req, res) => {
    const gener =await Gener.findByIdAndRemove(req.params.id);
    if (!gener) {
        return res.status(404).send('this gener id is not exist');
    }

    return res.send(gener);
})


module.exports = router;