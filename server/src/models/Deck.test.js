const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('./Deck.js')
const {db} = require('../db/config')

// define in global scope


// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  const deck = await Deck.create({ name: 'spellcaster', xp: 431 })
  const deck2 = await Deck.create({ name: 'zoo', xp: 682 })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has a name', async () => {
    const deck = await Deck.findByPk(1)
    expect(deck).toHaveProperty('id')
  })
  it('has an xp property', async () => {
    const deck = await Deck.findByPk(1)
    expect(deck).toHaveProperty('xp')    
  });
  it('deck has proper values within it', async () => {
    const deck = await Deck.findByPk(1)
    expect(deck).toEqual(expect.objectContaining({id: 1, name: 'spellcaster', xp: 431}))    
  });
})
