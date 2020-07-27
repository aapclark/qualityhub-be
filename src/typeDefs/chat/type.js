import { gql } from 'apollo-server'


// ! Make plural where multiple types are contained
const typeDefs = gql`
	type Chat {
		id: ID!
		user1: String
		user2: String
		messages: [Message!]
	}

	type Message {
		id: ID!
		chat: Chat!
		sender: User!
		reciever: User!
		content: String!
		createdAt: String
	}

`
export default typeDefs
