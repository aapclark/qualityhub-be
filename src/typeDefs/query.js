import { gql } from 'apollo-server'

// ! root query definition
export const query = gql`
  type Query {
    info: String!
    test: String
  }
`
