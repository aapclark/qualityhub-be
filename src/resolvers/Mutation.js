const bcrypt = require('bcryptjs');

const { generateToken, checkFields, getUserId, checkAdmin } = require('../utils')

/*
  @param {String!} - first_name
  @param {String!} - last_name
  @param {String!} - email
  @param {String!} - password
  @param {String!} - city
  @param {String!} - state
  @param {String}  - image_url
  @param {String}  - gender
  @param {String}  - personal_url
  @param {String}  - blog_url
  @param {String}  - twitter_url
  @param {String}  - portfolio_url
  @param {String}  - linkedin_url
  @param {String}  - github_url
  @param {String}  - bio
  @param {Boolean} - payment_info

  Adds a user to database. Email must be unique.

  @return {String} - token: required for authorization
  @return {Object} - user: type User for newly created account
*/
async function signup(parent, args, context, info) {
  const {first_name, last_name, password, email, city, state} = args;
  checkFields({first_name, last_name, password, email, city, state });
  const hash = bcrypt.hashSync(args.password, 10)
  args.password = hash;
  const user = await context.prisma.createUser(args)
  const token = generateToken(user);

  return {
    token,
    user,
  }
}

/*
  @param {String} - email
  @param {String} - password

  Find user with email, then checks password

  @return {String} - token: required for authorization
  @return {Object} - user: type User for logged in user
*/
async function login(parent, args, context, info) {
  const user = await context.prisma.user({email: args.email})
  const token = generateToken(user)
  const passwordMatch = await bcrypt.compare(args.password, user.password)
  if (!user || !passwordMatch) {
    throw new Error('Invalid Login')
  }
  return {
    token,
    user,
  }
}

/*
  Same params as signup, as any field is editable. All fields are optional. Checks for empty fields. 

  @return {Object} - Type user with updated information
*/
async function update(parent, args, context, info) {
  const id = getUserId(context);
  const updatedUser = await context.prisma.updateUser({
    data: args,
    where: {
      id
    }
  })
  return updatedUser
}

/*
  Deletes own user

  @return {Object} type User of deleted user
*/
async function deleteUser (parent, args, context, info) {
  const id = getUserId(context);
  return await context.prisma.deleteUser({id})
}

module.exports = {
  signup,
  login,
  update,
  deleteUser
}
