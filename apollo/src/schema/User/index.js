import input from './input'
import type from './type'
import mutation from './mutation'
import auth from './auth'


const User = {
  input,
  type,
  mutation,
  auth
}


console.log('User typedefs', User)

export default {
  ...input, ...type, ...mutation, ...auth
}
