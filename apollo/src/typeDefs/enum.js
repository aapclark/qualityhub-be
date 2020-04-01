import { gql } from 'apollo-server'

const enumDef = gql`
  enum Microservice {
    RESUMEQ
    INERVIEWQ
  }
`
export default enumDef
