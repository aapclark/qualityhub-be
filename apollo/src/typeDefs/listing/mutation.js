import { gql } from 'apollo-server'

// ! Make plural where multiple mutations are contained
const mutationDefs = gql`
  extend type Mutation {
    createListing(  
			input: CreateListingInput
    ): Listing!

		updateListing(
			input: UpdateListingInput!
    ): Listing!
    
		deleteListing: Listing!
    
    createListingIndustry(
      name: String!
      ): ListingIndustry!
      
    updateListingIndustry(
      name: String!
      ): ListingIndustry!
        
    deleteListingIndustry: ListingIndustry!
        
    createListingTag(
      name: String!
      ): ListingTag!
          
    updateListingTag(
      name: String!
      ): ListingTag!
            
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
`

export default mutationDefs
