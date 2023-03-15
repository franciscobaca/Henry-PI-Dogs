const axios = require('axios')
const { Dog, Temperament } = require('../db.js')

//Obtengo los Dogs de la API 
const getApiDogs = async() => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds")
    const apiDogs = await apiUrl.data.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            height: dog.height.metric,
            weight: dog.weight.metric,
            weight_prom:  Number(dog.weight.metric.split("-")[0]) + Number(dog.weight.metric.split("-")[1]) ,
            lifeSpan: dog.life_span,
            image: dog.image.url
        }
    })

    return apiDogs;
};


//Obtengo los Dogs de la DB
const getDbDogs = async() => {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            atributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });

//Formateo el Dog de la DB
    let dogsReady = dbDogs.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            temperament : dog.temperaments.map((temperament) => {return temperament.name}).join(", "),
            height: dog.height,
            weight: dog.weight,
            weight_prom: Number(dog.weight.split("-")[0]) + Number(dog.weight.split("-")[1]),
            lifeSpan: dog.lifeSpan,
            image: dog.image,
            createdInDb: dog.createdInDb
        }
    })
    return dogsReady;
}

//Junto ambos array de dogs
const getAllDogs = async() => {
    const dogsDb = await getDbDogs();
    const dogsApi = await getApiDogs();
    return [...dogsDb, ...dogsApi]
}

module.exports = getAllDogs;