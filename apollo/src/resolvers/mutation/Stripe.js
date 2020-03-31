const stripe = require('../../stripe')

const {
  getUserId
} = require('../../utils')

module.exports = {
  createCustomer,
  addCoachStripeId,
  createStripeLink,
  stripeDirectCharge,
  stripePayout,
  stripePayIntent,
  stripeCreateToken,
}

async function createCustomer(_parent, args, context) {
  const { source } = args;

  const userid = getUserId(context);
  let user = await context.prisma.user({ id: userid });

  // This creates the "customer" in stripe database
  await stripe.customers.create({
    email: user.email,
    source,
  }).then(async (customer) => {

    cusId = customer.id;
    await context.prisma.updateUser({
      data: { stripeCusId: cusId },
      where: {
        email: user.email,
      },

    });

  })
  if (!user) {
    throw new Error('not authenticated');
  }

  return "Customer created";
}

async function addCoachStripeId(_parent, args, context) {
  console.log('addCoachStripeId args: ', args);

  const id = getUserId(context);
  const { code } = args;
  // Connects to stripes API and creates an  active connected account with the authorization_code sent to stripe from the user onboarding
  const response = await stripe.oauth.token({
    grant_type: 'authorization_code',
    code,
  });

  console.log('response', response);
  return context.prisma.updateUser({
    data: { stripeId: response.stripe_user_id },
    where: { id },
  });
}

async function createStripeLink(_parent, _args, context) {
  const userid = getUserId(context);
  const user = await context.prisma.user({ id: userid });

  let login = ''

  await stripe.accounts.createLoginLink(
    user.stripeId).then(link => {
      // asynchronously called
      console.log(link.url);
      login = link.url;
      return link.url
    })
  return login;
}

async function stripeDirectCharge(_parent, args, context) {
  const { amount, currency, source, coachId } = args;


  const coach = await context.prisma.user({ id: coachId });
  const status = stripe.charges.create({
    amount,
    currency,
    source,
    transfer_data: {
      destination: coach.stripeId
    }
  })
    // {stripeCusId: user.stripeCusId})
    .then((res) => {
      console.log(res);
      return { success: "Payment successful!", error: null }
    })
    .catch(function (err) {
      return { success: null, error: err.message }
    });

  return status;
}

async function stripePayout(_parent, args, context) {
  const { amount, currency, method, coachId } = args;


  const coach = await context.prisma.user({ id: coachId });

  stripe.payouts.create({
    amount,
    currency,
    method,
  }, {
    stripe_account: coach.stripeId,
  }).then(function (payout) {
    console.log(payout);
  }).catch(function (err) {
    console.log(err);
  })
  return 'Payout Successful';

}

// TODO -- move to Query



async function stripePayIntent(_parent, args, context) {
  const { amount, currency, source, on_behalf_of } = args;

  const userid = getUserId(context);
  const user = await context.prisma.user({ id: userid });

  console.log('hey', user.stripeCusId);
  console.log('no', user.stripeId);

  stripe.paymentIntents.create(
    {
      amount,
      currency,
      source,
      on_behalf_of,

      // application_fee_amount: 0,
    },
    { stripe_account: user.stripeCusId }
  ).then(function (paymentIntent) {
    // asynchronously called
    console.log('here', paymentIntent);
  })
    .catch(function (err) {
      console.log(err);
    });;

  return user;
}

async function stripeCreateToken(_parent, args, context) {
  const { customer } = args;

  const userid = getUserId(context);
  const user = await context.prisma.user({ id: userid });

  console.log(user.stripeId);

  const token = stripe.tokens.create(
    {
      customer,
    },
    {
      stripe_account: user.stripeId,
    },
  );

  console.log(token);

  return user;
}
