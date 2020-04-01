//  Mutations for User management
const bcrypt = require('bcryptjs');
const {
  generateToken,
  checkFields,
} = require('../../utils')


async function register(_parent, { input }, { prisma }) {
  const hash = bcrypt.hashSync(input.password, 10);
  input.password = hash;
  checkFields(input)
  const emailTaken = await prisma.$exists.user({
    email: input.email
  })

  if (!emailTaken) {
    const user = await prisma.createUser({
      ...input
    });
    const token = generateToken(user);
    return {
      token,
      user,
    }
  }

  else {
    throw new Error('Email address is already in use.')
  }
}

async function login(_parent, { email, password }, context) {
  const user = await context.prisma.user({ email });
  const token = generateToken(user);
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!user || !passwordMatch) {
    throw new Error('Invalid Login');
  }
  return {
    token,
    user,
  };
}

//  TODO -- update to reflect lack of UC fields.
async function updateUser(_parent, args, context) {
  const id = getUserId(context);
  const { first_name, last_name, city, state } = args;

  if (first_name) {
    return await context.prisma.updateUser({
      data: { ...args, fn_lc: first_name.toLowerCase() },
      where: {
        id,
      },
    });
  } else if (last_name) {
    return await context.prisma.updateUser({
      data: { ...args, ln_lc: last_name.toLowerCase() },
      where: {
        id,
      },
    });
  } else if (city) {
    return await context.prisma.updateUser({
      data: { ...args, city_lc: city.toLowerCase() },
      where: {
        id,
      },
    });
  } else if (state) {
    return await context.prisma.updateUser({
      data: { ...args, state_lc: state.toLowerCase() },
      where: {
        id,
      },
    });
  } else {
    return await context.prisma.updateUser({
      data: args,
      where: {
        id,
      },
    });
  }
}

async function deleteUser(_parent, _args, context) {
  const id = getUserId(context);
  return await context.prisma.deleteUser({ id });
}

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
}
