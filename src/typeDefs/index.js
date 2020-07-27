//  TODO - Import Sub-TypeDefs
import { query } from './query'
import { mutation } from './mutation'
import enumDef from './enum'
import user from './user/'
import auth from './auth'
import stripe from './stripe'
import chat from './chat'
import listing from './listing'

// TODO - Add Imported Sub-TypeDefs to array and export

const schema = [query, mutation, enumDef, ...user, ...auth, ...stripe, ...chat, ...listing]

export default schema
