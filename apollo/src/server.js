const { ApolloServer } = require('apollo-server')
const { prisma } = require('./generated/prisma-client');

import typeDefs from './typeDefs'
const resolvers = require('./resolvers')





const server = new ApolloServer({
  formatError: (err) => { console.log('Server encountered an error:', err); return err },
  typeDefs,
  resolvers,
  context: async (request) => {
    return { ...request, prisma };
  },
});

export default server
