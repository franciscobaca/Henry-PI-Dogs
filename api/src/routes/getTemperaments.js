const { Router } = require('express');
const getAllTemperaments  = require('../controllers/getAllTemperaments')

const route = Router();

route.get('/', async(req, res) => {
    const temperaments = await getAllTemperaments();
    res.send(temperaments)
})

module.exports = route;