import { gql } from 'apollo-server'


const typeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
        login(
          input: LoginInput!
        ): AuthPayload!
  } 

  input LoginInput {
		email: String!
		password: String!
	}

`


export default typeDefs
