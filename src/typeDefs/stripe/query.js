import { gql } from 'apollo-server'

const queryDef = gql`
  extend type Query {
    stripeBalance: Balance!
  }
`

export default queryDef
