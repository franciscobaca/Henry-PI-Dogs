const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const getAllDogs = require('../controllers/getAllDogs');

const route = Router();

route.get('/', async(req, res) => {
    const { name } = req.query
    const allDogs = await getAllDogs();
    
    try {
        if(name){
            const dogFiltered = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            if(dogFiltered.length){
                res.status(200).send(dogFiltered)
            } else {
                throw Error('Dog does not exist')
            }
        }
        else {
            res.status(200).json(allDogs)
        } 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

route.get('/:idRaza', async(req, res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();

    try {
        if(idRaza){
            const dogById = allDogs.filter((dog) => dog.id == idRaza)
            if(dogById){
                res.status(200).json(dogById)
            } else {
                throw Error('Dog not found!')
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

route.post('/', async (req, res) => {
    let { name, 
        height_min, 
        height_max, 
        weight_min, 
        weight_max, 
        lifeSpan, 
        temperament,
        createdInDb,
        image } = req.body;

        console.log(temperament);

    let heightRange = "";
    heightRange = height_min + " - " + height_max;

    let weightRange = "";
    weightRange = weight_min + " - " + weight_max;

    try {
        const dogCheck = await Dog.findOne({
            where: {
                name: name
            }
        })
        if(dogCheck) res.status(404).send("Dog already exists!")
        
        let dogCreated = await Dog.create({
            name,
            height: heightRange,
            weight: weightRange,
            lifeSpan,
            image: image || "https://pngimg.com/uploads/doge_meme/doge_meme_PNG22.png",
            createdInDb,
        })


        const dbTemperaments = await Temperament.findAll({
            where: {
                name: temperament
            }
        })

        console.log(dbTemperaments);
        
        await dogCreated.addTemperament(dbTemperaments);
        res.status(200).send("Dog created succesfully!")

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

route.delete('/:id', async(req,res) => {
    let { id } = req.params;

    try {
        await Dog.destroy({
            where: {
                id: id
            }
        })
    const allDogs = await getAllDogs();
    res.status(200).send(allDogs)
    } catch (error) {
        res.status(400).send("Dog cannot be deleted")
    }
})

module.exports = route;