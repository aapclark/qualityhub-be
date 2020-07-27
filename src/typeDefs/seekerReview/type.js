import { gql } from 'apollo-server'


// ! Make plural where multiple types are contained
const typeDefs = gql`
  type SeekerReview {
    id: ID!
    coach: User!
    seeker: User!
    job: Job!
    rating: Int!
    review: String
    response: SeekerReviewResponse
    microservice: Microservice
  }

  type SeekerReviewResponse {
    id: ID!
    review: SeekerReview!
    text: String
    
  }

`
export default typeDefs
