import { gql } from 'apollo-server'

const inputDefs = gql`
  input RegistrationInput {
		first_name: String!
		last_name: String!
		email: String!
		password: String!
		city: String!
		state: String!
		image_url: String
		personal_url: String
		blog_url: String
		twitter_url: String
		portfolio_url: String
		linkedin_url: String
		github_url: String
		bio: String
	}

	input UpdateUserInput {
		stripeId: String
    stripeCusId: String
    first_name: String
    last_name: String
    password: String
    email: String
    city: String
    state: String
    image_url: String
    gender: String
    personal_url: String
    blog_url: String
    twitter_url: String
    portfolio_url: String
    linkedin_url: String
    github_url: String
    bio: String
	}
`

export default inputDefs
