import { gql } from 'apollo-server'


// ! Make plural where multiple types are contained
const typeDefs = gql`
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
`
export default typeDefs
