const Stripe = require('./Stripe')
const User = require('./User')

//  Breaks up and imports Mutation resolvers by concern



const Mutation = { ...Stripe, ...User }

console.log('mutation', Mutation)

module.exports = Mutation
