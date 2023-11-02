const { User } = require('./User')
const { Attack } = require('./Attack')
const { Card } = require('./Card')
const { Deck } = require('./Deck')

User.hasOne(Deck)
Deck.belongsTo(User)

Deck.hasMany(Card)
Card.belongsTo(Deck)

Card.belongsToMany(Attack, {through: "card-attack"})
Attack.belongsToMany(Card, {through: "card-attack"})

// and then export them all below
module.exports = { User, Attack, Card, Deck }
