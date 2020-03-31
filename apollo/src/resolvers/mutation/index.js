const { Stripe } = require('./Stripe')
// const Mutation = require('./Mutation')
const { User } = require('./User')

//  Breaks up and imports Mutation resolvers by concern


const Mutation = { ...Stripe, ...User }


module.exports = Mutation
