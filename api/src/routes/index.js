const Router  = require ('express')
const dogs = require('./dogs')
const temperaments = require('./temperaments')

const router = Router();

router.use(Router.json())

router.use('/dogs', dogs)
router.use('/temperaments', temperaments)

module.exports = router;
