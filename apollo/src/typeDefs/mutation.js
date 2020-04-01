import { gql } from 'apollo-server'

// ! Root mutation definition

export const mutation = gql`
  type Mutation {
    root: String
  }
`
