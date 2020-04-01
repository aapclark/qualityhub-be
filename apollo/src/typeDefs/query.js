import { gql } from 'apollo-server'


const query = gql`
  type Query {
    info: String!
  }
`

export default {
  query
}
