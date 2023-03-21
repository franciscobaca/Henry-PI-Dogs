const { default: axios } = require("axios");
const { Temperament } = require('../db')

const getAllTemperaments = async() => {
    const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds")
    const apiTemperaments = await apiInfo.data.map(elem => elem.temperament)
    let temperamentsSplit = await apiTemperaments.join().split(',');
    let temperamentsTrim = await temperamentsSplit.map(e => e.trim())

    await temperamentsTrim.forEach(async(element) => {
        await Temperament.findOrCreate({
            where: {
                name: element
            }
        })
    });

    let allTemperaments = await Temperament.findAll();

    return allTemperaments;
}

module.exports = getAllTemperaments;