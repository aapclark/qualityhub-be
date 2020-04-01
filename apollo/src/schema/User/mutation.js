import { gql } from 'apollo-server'

const typeDef = gql`
  extend type Mutation {
    # User Mutations
		register(
			input: RegistrationInput!
			): AuthPayload!
		updateUser (
			input: UpdateUserInput
			): User!
		deleteUser: User!
  }


`
export default typeDef
