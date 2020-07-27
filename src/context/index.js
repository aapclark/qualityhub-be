import { prisma } from '../generated/prisma-client'


// console.log('PRISMA_CLIENT', prisma)
const createContext = async ({ req }) => {

  return { req, prisma }
}

export default createContext
