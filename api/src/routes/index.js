const Router  = require ('express')
const getDogs = require('./getDogs')
const getTemperaments = require('./getTemperaments')

const router = Router();

router.use(Router.json())

router.use('/dogs', getDogs)
router.use('/temperaments', getTemperaments)

module.exports = router;
