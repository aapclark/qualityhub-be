
import { gql } from 'apollo-server'

// ! Make plural where multiple mutations are contained
const mutationDef = gql`
  extend type Mutation {
      createSeekerReview (
        input: SeekerReviewInput
      ): SeekerReview

      updateSeekerReview (
        input: SeekerReviewUpdateInput
      ): SeekerReview

      deleteSeekerReview: SeekerReview!

      createSeekerReviewResponse (
        review: String!
        text: String!
      )

      updateSeekerReviewResponse (
        text: String!
      ): SeekerReviewResponse!

      delete SeekerReviewResponse: : SeekerReviewResponse!

  }
`

export default mutationDef
