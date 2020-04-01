import { gql } from 'apollo-server'



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

	type Job {
		id: ID!
		coach: User!
		seeker: User!
		listing: Listing!
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
		
			# Marketplace Coach Mutations (creating, editing, deleting Listings, etc)
		createListing(
			input: CreateListingInput
		): Listing!
		updateListing(
			input: UpdateListingInput!
		): Listing!
		deleteListing: Listing!

		createListingIndustry(
			name: String!
		): ListingIndustry
		updateListingIndustry(
			name: String!
		): ListingIndustry
		deleteListingIndustry: ListingIndustry!
		
		createListingTag(
			name: String!
		): ListingTag
		updateListingTag(
			name: String!
		): ListingTag
		deleteListingTag: ListingTag!

		createlistingAvailability(
			input: ListingAvailabilityInput
		): ListingAvailability!
		updateListingAvailability(
			id: String!
			hour: Int
			minute: Int
			year: Int
			month: Int
			day: Int
			isOpen: Boolean
			recurring: Boolean
		): ListingAvailability!
		deleteListingAvailability: LisitngAvailability!

		}




	



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
export default typeDefs
