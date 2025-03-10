const { User, Attack, Card, Deck } = require('./index.js')
const {db} = require('../db/config.js')
const { Sequelize } = require('sequelize')

// clear db and create new user before tests
 beforeAll(async () => {
    await db.sync({ force: true })
        const myUser = await User.create({username: "shinji"})
        const myDeck = await Deck.create({name: "zoo", xp: 111})
        await Card.create({name: "specialcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        await Card.create({name: "testcard", mojo: 22, stamina: 23, imgUrl: "fakeurltesting"})
        const fireball = await Attack.create({title: "Fireball", mojoCost: 20, staminaCost: 10})
        const basicattack = await Attack.create({title: "Attack", mojoCost: 0, staminaCost: 20})
        const heavyslash = await Attack.create({title: "Heavy Slash", mojoCost: 10, staminaCost: 50})
        const iceblast = await Attack.create({title: "Ice Blast", mojoCost: 40, staminaCost: 5})
        const allCards = await Card.findAll()
        for(let i=1; i<=10; ++i){
            let currentCard = await Card.findOne({where: {id: i}})
            await currentCard.addAttack(basicattack)
        }
        const specialCard = await Card.findByPk(1)
        await specialCard.addAttack(fireball)
        await specialCard.addAttack(heavyslash)
        await specialCard.addAttack(iceblast)
        await myDeck.addCards(allCards)
        await myUser.setDeck(myDeck)
})
describe('Association testing:', () => {
    it('checking user-deck association', async () => {
        const user = await User.findOne()
        const deck = await Deck.findOne()
        expect(deck.UserId).toBe(1)
    });
    it('checking deck-card association', async () => {
        const deck = await Deck.findOne()
        const allCard = await deck.getCards()
        expect(allCard.length).toBe(10)
    });
    it('checking card - attack association', async () => {
        const basicattack = await Attack.findOne({where: {title: "Attack"}})
        for(let i=1; i<=10; i++) async() => {
            let currentCard = await Card.findOne({where: {id: i}})
            await currentCard.addAttack(basicattack)
        }
        const basicCards = await basicattack.getCards()
        expect(basicCards.length).toBe(10)        
    });
    it('checking attack - card association', async () => {
        const specialCard = await Card.findByPk(1)
        const fireball = await Attack.create({title: "Fireball", mojoCost: 20, staminaCost: 10})
        const basicattack = await Attack.create({title: "Attack", mojoCost: 0, staminaCost: 20})
        const heavyslash = await Attack.create({title: "Heavy Slash", mojoCost: 10, staminaCost: 50})
        const iceblast = await Attack.create({title: "Ice Blast", mojoCost: 40, staminaCost: 5})
        await specialCard.addAttack(basicattack)
        await specialCard.addAttack(fireball)
        await specialCard.addAttack(heavyslash)
        await specialCard.addAttack(iceblast)
        const specialCardAttacks = await specialCard.getAttacks()
        expect(specialCardAttacks.length).toBe(8)
    });
    it('testing eager loading of user with deck', async () => {
        const user = await User.findOne()
        const deck = await Deck.findOne()
        const userWithDeck = await User.findAll({include: Deck})
        expect(userWithDeck).toMatchObject([{"Deck": {"UserId": 1, "id": 1, "name": "zoo", "xp": 111}, "id": 1, "username": "shinji"}])
    });
    it('tests eager loading of deck with cards', async () => {
        const deckCards = await Deck.findOne({include: Card})
        expect(deckCards).toHaveProperty('Cards') // it has property Cards therefore it worked
    });
    it('test eager loading of cards with attacks', async () => {
        const cardAttacks = await Card.findOne({include: Attack})
        expect(cardAttacks).toHaveProperty('Attacks')
    })
    it('test eager loading of attacks with cards', async () => {
        const attackCards = await Attack.findOne({include: Card})
        expect(attackCards).toHaveProperty('Cards')
    });
    it('can only add one user to a deck', async () => {
        const newUser = await User.create({username: "ikari"})
        const firstDeck = await Deck.findOne()
        await newUser.setDeck(firstDeck)
        const firstDeckAgain = await Deck.findOne()
        const deckUsers = await firstDeckAgain.getUser()
        expect(typeof deckUsers).toBe("object")     
    });
});
// clear db after tests
afterAll(async () => await db.sync({ force: true }))