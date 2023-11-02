const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const {Sequelize} = require('sequelize')
const { Attack } = require('./Attack.js')
const {db} = require('../db/config')

// define in global scope
let attack
let attack2

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'fireball', mojoCost: 41, staminaCost: 43 })
  attack2 = await Attack.create({ title: 'fireball', mojoCost: 44, staminaCost: 45 })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    const attack = await Attack.findByPk(1)
    expect(attack).toHaveProperty('id')
  })
  it('has an title', async () => {
    const attack = await Attack.findByPk(1)
    expect(attack).toHaveProperty('title')
  })
  it('has an mojoCost', async () => {
    const attack = await Attack.findByPk(1)
    expect(attack).toHaveProperty('mojoCost')
  })
  it('has an staminaCost', async () => {
    const attack = await Attack.findByPk(1)
    expect(attack).toHaveProperty('staminaCost')
  })
  it('contains expected values', async () => {
    const attack = await Attack.findByPk(1)
    expect(attack).toEqual(expect.objectContaining({ id: 1, title: 'fireball', mojoCost: 41, staminaCost: 43 }))
  })

  /**
   * Create more tests
   * E.g. check that the username of the created attack is actually gandalf
   */
})
