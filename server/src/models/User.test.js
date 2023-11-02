const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User } = require('./User.js')
const {db} = require('../db/config')

// define in global scope
let user
let user2

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
  user2 = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('User', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  })
  it('has the correct username', async () => {
    expect(user.username).toBe('gandalf')
  });
  it('id iterates correctly', async () => {
    expect(user2.id).toBe(2)
  });
  it('expects username to be string', async () => {
    expect(typeof user.username).toBe('string')
  });
})
