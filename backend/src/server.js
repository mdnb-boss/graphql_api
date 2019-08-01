const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

const { GraphQLServer, PubSub  } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const sequelize = require('./sequelize')



mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
});

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema.graphql'),
    resolvers: resolvers,
    context: { pubsub }
});

server.start();