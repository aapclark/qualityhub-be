import { gql } from 'apollo-server'


// ! Make plural where multiple types are contained
const typeDefs = gql`
	type Listing {
		id: ID!
		coach: User!
		description: String!
		price: Int!
		microservice: Microservice
		tags: [ListingTag!]
		industry: [ListingIndustry!]
  }

  type ListingTag {
		id: ID!
		name: String!
	}

	type ListingIndustry {
		id: ID!
		name: String!
	}

	type ListingAvailability {
		id: ID!
		coach: User!
		listing: Listing!
		minute: Int
		hour: Int!
		day: Int!
		month: Int!
		year: Int!
		isOpen: Boolean!
		recurring: Boolean!
	}
`
export default typeDefs
