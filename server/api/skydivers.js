const router = require('express').Router()
const {Skydiver} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const skydivers = await Skydiver.findAll({})
    res.json(skydivers)
  } catch (err) {
    next(err)
  }
})

router.get('/trainingSetInput', async (req, res, next) => {
  try {
    const skydivers = await Skydiver.findAll({
      attributes: [
        'id',
        'age',
        'gender',
        'jumps',
        'occupation',
        'region',
        'reserveRide'
      ]
    })
    res.json(skydivers)
  } catch (err) {
    next(err)
  }
})

router.get('/trainingSetOutput', async (req, res, next) => {
  try {
    const skydivers = await Skydiver.findAll({
      attributes: ['id', 'incident', 'fatality']
    })
    res.json(skydivers)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newSkydiver = await Skydiver.create(req.body)
    res.json(newSkydiver)
  } catch (err) {
    next(err)
  }
})
