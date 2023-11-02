const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('./Card.js')
const {db} = require('../db/config')

// define in global scope
let card2

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
  card2 = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has a name', async () => {
    const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
    expect(card).toHaveProperty('name')
  })
  it('has an mojo property', async () => {
    const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
    expect(card).toHaveProperty('mojo')    
  });
  it('has a stamina property', async () => {
    const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
    expect(card).toHaveProperty('stamina')    
  });
  it('has a imgUrl property', async () => {
    const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
    expect(card).toHaveProperty('imgUrl')    
  });
  it('card has proper values within it', async () => {
    const card = await Card.create({ name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' })
    expect(card).toEqual(expect.objectContaining({name: 'spellcaster', mojo: 22, stamina: 24, imgUrl: 'xxxyyyzzz.url' }))    
  });
})
