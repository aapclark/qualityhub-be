import { gql } from 'apollo-server'

// ! Make plural where multiple mutations are contained
const inputDefs = gql`
	input CreateListingInput {
		print: Int!
		industry: String
		position: String
		company: String
		isPublished: Boolean
		description: String!
		microservice: Microservice!
	}

	input UpdateListingInput {
		print: Int
		industry: String
		position: String
		company: String
		isPublished: Boolean
		description: String
  }
  
  input ListingAvailabilityInput {
    listing: String!
    hour: Int!
    minute: Int!
    year: Int!
    month: Int!
    day: Int!
    isOpen: Boolean!
    recurring: Boolean!
	}
`

export default inputDefs
