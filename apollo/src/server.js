const { ApolloServer } = require('apollo-server')
const { prisma } = require('./generated/prisma-client');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return { ...request, prisma };
  },
});

module.exports = server;
