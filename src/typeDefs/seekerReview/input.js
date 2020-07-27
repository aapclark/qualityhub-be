import { gql } from 'apollo-server'

// ! Make plural where multiple mutations are contained
const inputDefs = gql`
  input SeekerReviewInput {
    coach: String!
    job: String!
    rating: Int!
    review: String
    microservice: String!
  }

  input SeekerReviewUpdateInput {
    rating: Int
    review: String
  }

`

export default inputDefs
