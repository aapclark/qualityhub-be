

import { gql } from 'apollo-boost'
import { prisma } from '../../generated/prisma-client'
import { getClient } from '../utils/getClient'

const client = getClient()


beforeAll(async () => {
  await prisma.deleteManyUsers()

  const registerUser = gql`
  mutation {
    input: {
      first_name: 'Testing'
      last_name: 'User'
      email: 'testing@test.com'
      password: 'verySecure'
      city: 'TestCity'
      state: 'NM'
    }
  } {
    token
    user {
      id
    }
  }
  
  `
  const authenticatedUser = await client.mutate({
    mutation: registerUser
  })

  authenticatedClient = getClient(authenticatedUser.data.registerUser.token)

  console.log(authenticatedUser)
})

// console.log('User testing >> authenticatedUser', authenticatedUser)

// describe('User tests', () => {
//   it('Should display single recently created user.')
// })

// describe('Test to pass.', () => {
//   it('Should just pass'), () => {
//     console.log('pass')
//   }
// })
