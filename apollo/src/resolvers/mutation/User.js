//  Mutations for User management
const bcrypt = require('bcryptjs');
const {
  generateToken,
  checkFields,
} = require('../../utils')


async function register(_parent, args, { prisma }) {
  const hash = bcrypt.hashSync(args.password, 10);
  args.password = hash;
  checkFields(args)
  const user = await prisma.createUser({
    ...args
  });
  const token = generateToken(user);

  return {
    token,
    user,
  };
}

async function login(_parent, args, context) {
  console.log('LOGIN ATTEMPT')
  const user = await context.prisma.user({ email: args.email });
  const token = generateToken(user);
  const passwordMatch = await bcrypt.compare(args.password, user.password);
  if (!user || !passwordMatch) {
    throw new Error('Invalid Login');
  }
  return {
    token,
    user,
  };
}

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
