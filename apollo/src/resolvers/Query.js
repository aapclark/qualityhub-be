const { getUserId, validToken } = require('../utils');
const stripe = require('../stripe')


function info() {
	return 'Welcome to Quality Hub';
}

function test(_, __, ___) {
	console.log('Test Message')
	return 'This is a test.'
}

async function user(parents, args, context, info) {
	return await context.prisma.user({ id: args.id });
}


async function users(parent, args, context, info) {
	// await checkAdmin(context);
	let { keywords } = args;
	let where;
	if (keywords) {
		where = { OR: [] };
		keywords = keywords.toLowerCase();
		let split = splitAndTrimTags(keywords);
		split.forEach(word => {
			where.OR.push({ fn_lc_starts_with: word.name });
			where.OR.push({ ln_lc_starts_with: word.name });
			where.OR.push({ city_lc_starts_with: word.name });
			where.OR.push({ state_lc_starts_with: word.name });
		});
	}
	return await context.prisma.users({ where });
}


async function me(_parent, _args, context) {
	return await context.prisma.user({ id: getUserId(context) });
}

async function review(parent, args, context) {
	const res = await context.prisma.user({ where: args })
	return res
}

async function reviewByJobId(parent, args, { prisma }) {
	return await prisma.review({
		where: { job_id: args.job_id }
	})
}

async function reviews(_parent, _args, { prisma }) {
	return await prisma.reviews()
}


async function reviewsByMicroservice(parent, args, { prisma }) {
	// Prisma does not allow filtering by enum, so will have to return all reviews and manually filter
	const allReviews = await prisma.reviews()
	const filteredReviews = allReviews.filter(review => review.microservice === args.microservice)

	return filteredReviews
}

async function resumeQReviews(parent, args, { prisma }) {
	return await prisma.reviews({
		where: { microservice: 'RESUMEQ' }
	})
}

async function interviewQReviews(parent, args, { prisma }) {
	return await prisma.reviews({
		where: { microservice: 'INTERVIEWQ' }
	})
}


function splitAndTrimTags(tagString) {
	const tagArray = tagString.split(',');
	return tagArray.map(tag => {
		return { name: tag.trim() };
	});
}

function checkToken(parent, args, context, info) {
	return validToken(context)
}

async function stripeBalance(_parent, args, context) {
	const coach = await context.prisma.user({ id: getUserId(context) });
	return stripe.balance.retrieve({
		stripe_account: coach.stripeId,
	}).then(function (balance) {
		return { available: balance.available[0].amount, pending: balance.pending[0].amount }
	}).catch(function (err) {
		console.log(err);
		return err
	})
}


module.exports = {
	test,
	// user,
	// users,
	info,
	// me,
	// review,
	// reviews,
	// checkToken,
	// reviewByJobId,
	// reviewsByMicroservice,
	// resumeQReviews,
	// interviewQReviews,
	stripeBalance
};
