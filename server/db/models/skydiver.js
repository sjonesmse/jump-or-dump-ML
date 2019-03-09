const Sequelize = require('sequelize')
const db = require('../db')

// ID,Age,Gender,Jumps,Occupation,Region,Reserve Ride,Incident,Fatality

const Skydiver = db.define('skydivers', {
  age: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.INTEGER
  },
  jumps: {
    type: Sequelize.INTEGER
  },
  occupation: {
    type: Sequelize.INTEGER
  },
  region: {
    type: Sequelize.INTEGER
  },
  reserveRide: {
    type: Sequelize.INTEGER
  },
  incident: {
    type: Sequelize.INTEGER
  },
  fatality: {
    type: Sequelize.INTEGER
  }
})

module.exports = Skydiver
