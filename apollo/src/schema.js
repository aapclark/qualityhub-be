const { gql } = require('apollo-server');

const typeDefs = gql`

	type Query {
		test: String
		info: String
		user: User!

		# Stripe Queries
		stripeBalance: Balance!
	}
	enum Microservice{
		RESUMEQ
		INTERVIEWQ
	}
	
	type User  {
		id: ID!
		stripeCustomerConnected: Boolean
		stripeCoachConnected: Boolean
		first_name: String!
		last_name: String!
		email: String!
		city: String!
		state: String!
		bio: String
		image_url: String
		portfolio_url: String
		linkedin_url: String
		github_url: String
		personal_url: String
		blog_url: String
		twitter_url: String
		chatActive: Boolean
	}

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

	type Balance {
		available: Int!
		pending: Int!
	}

	type Status {
		success: String
		error: String
	}

	type ServiceListing {
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
		listing: ServiceListing!
		minute: Int
		hour: Int!
		day: Int!
		month: Int!
		year: Int!
		isOpen: Boolean!
		recurring: Boolean!
	}

	type Job {
		id: ID!
		coach: User!
		seeker: User!
		listing: ServiceListing!
		microservice: Microservice!
		dateRequested: String
		dateAccepted: String
		dateCompleted: String
		pending: Boolean
		accepted: Boolean
		completed: Boolean
	}
		
	type CoachFeedback {
		id: ID!
		coach: User!
		seeker: User!
		job: Job!
		feedback: [FeedbackEntry!]
		isSent: Boolean
	}

	type FeedbackEntry {
		id: ID!
		coachFeedback: CoachFeedback!
		title: String!
		content: String!
	}

	type Mutation {
		# User Mutations
		
		register(
				first_name: String!
				last_name: String!
				email: String!
				password: String!
				city: String!
				state: String!
			): AuthPayload!
		login(
			input: LoginInput
			): AuthPayload!
		updateUser (
			input: UpdateUserInput
			): User!
		deleteUser: User!
		
		# Stripe Mutations
		createCustomer(
			email: String!
			source: String!
			): String!
		addCoachStripeId(
			code: String!
			): User!
		createStripeLink: String!
		stripeDirectCharge(
			amount: Int!
			currency: String
			source: String!
			coachId: String!
			): Status!
		stripePayout(
			amount: Int!
			currency: String
			method: String
			coachId: String!
			): String!
		stripePayIntent(
			amount: Int!
			currency: String
			source: String
			): User!
		stripeCreateToken(
			customer: String!
			): User!
		
		}


	type AuthPayload {
		token: String!
		user: User!
	}

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

	input LoginInput {
		email: String!
		password: String!
	}
`

module.exports = typeDefs
