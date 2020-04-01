const { ApolloServer } = require('apollo-server')
const { prisma } = require('./generated/prisma-client');

import typeDefs from './typeDefs'
const resolvers = require('./resolvers')


const server = new ApolloServer({
  formatError: (err) => { console.log(err.stack); return err },
  typeDefs,
  resolvers,
  context: async (request) => {
    return { ...request, prisma };
  },
});

module.exports = server;
