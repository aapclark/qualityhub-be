// require('dotenv').config()
// const express = require('express');
const server = require('./server');

// server.express.use('/doc', express.static("doc/schema"));



const options = { port: (process.env.APOLLO_PORT || process.env.PORT) || 4444 };



server.listen(options).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

// server.start(options, ({ port }) => {
// 	console.log(`QualityHub Core running on ${port}`);
// });
