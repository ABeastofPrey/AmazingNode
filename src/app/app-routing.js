const koaRouter = require('koa-router')();
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { schema, resolver } = require('schemaglue')('src/app/routes', { ignore: '**/model.js' })
// const { schema, resolver } = require('schemaglue')('src/app/routes', { ignore: ['**/somefile.js', '**/someotherfile.js'] })

// Put together a schema
const myGraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver,
});

const graphQLRequestHandler = (ctx) => {
    return graphqlKoa({ schema: myGraphQLSchema, context: ctx })(ctx);
};

koaRouter.post('/graphql', graphQLRequestHandler);
koaRouter.get('/graphql', graphQLRequestHandler);
// Setup the /graphiql route to show the GraphiQL UI
koaRouter.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
}));

module.exports = koaRouter;