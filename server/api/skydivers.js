const router = require('express').Router()
const {Skydiver} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
      where: {
        id: {
          [Op.lte]: 35000
        }
      },
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
      where: {
        id: {
          [Op.lte]: 35000
        }
      },
      attributes: ['id', 'incident', 'fatality']
    })
    res.json(skydivers)
  } catch (err) {
    next(err)
  }
})

router.get('/testingSetInput', async (req, res, next) => {
  try {
    const skydivers = await Skydiver.findAll({
      where: {
        id: {
          [Op.gt]: 35000
        }
      },
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

router.get('/testingSetOutput', async (req, res, next) => {
  try {
    const skydivers = await Skydiver.findAll({
      where: {
        id: {
          [Op.gt]: 35000
        }
      },
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
