import { gql } from 'apollo-server'

const mutationDefs = gql`
  extend type Mutation {
    createCustomer(
      email: String!
      source: String!
      ): String!
    addCoachStripeId(
      code: String!
      ): User!
    createStripeLink: String!
    stripeDirectCharge(
      amount: Int!
      currency: String
      source: String!
      coachId: String!
      ): Status!
    stripePayout(
      amount: Int!
      currency: String
      method: String
      coachId: String!
      ): String!
    stripePayIntent(
      amount: Int!
      currency: String
      source: String
      ): User!
    stripeCreateToken(
      customer: String!
      ): User!
  }
`

export default mutationDefs
