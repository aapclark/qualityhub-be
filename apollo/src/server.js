const { ApolloServer } = require('apollo-server')

import createContext from './context'
import typeDefs from './typeDefs'
const resolvers = require('./resolvers')



const server = new ApolloServer({
  formatError: (err) => { console.log('Server encountered an error:', err); return err },
  typeDefs,
  resolvers,
  context: createContext,
  cors: true,
  ssl: false,
});

export default server
