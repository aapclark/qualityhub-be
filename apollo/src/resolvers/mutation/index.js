const Stripe = require('./Stripe')
const User = require('./User')

//  Breaks up and imports Mutation resolvers by concern

module.exports = {
  ...Stripe,
  ...User
}
