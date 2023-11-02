const {db} = require('../db/config.js')
const {DataTypes} = require('sequelize')

const Deck = db.define("Deck", {
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER
})

modules.export = {Deck}