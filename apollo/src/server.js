const { ApolloServer } = require('apollo-server')
const { prisma } = require('./generated/prisma-client');

import typeDefs from './schema'
const resolvers = require('./resolvers')

console.log('server typedefs', typeDefs)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (request) => {
    return { ...request, prisma };
  },
});

module.exports = server;
