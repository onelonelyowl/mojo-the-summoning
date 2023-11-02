const {db} = require('../db/config.js')
const {DataTypes} = require('sequelize')

const User = db.define("User", {
    username: DataTypes.STRING
})

module.exports = {User}