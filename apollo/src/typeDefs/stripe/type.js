import { gql } from 'apollo-server'

const typeDefs = gql`
  type Balance {
		available: Int!
		pending: Int!
	}

	type Status {
		success: String
		error: String
	}
`
export default typeDefs
