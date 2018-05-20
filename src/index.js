const Koa = require('koa');
// const cors = require('@koa/cors');
// const logger = require('koa-logger');
const body = require('koa-body');
const connector = require('./middlewares/db-connection');
const router = require('./app/app-routing');
const pageNotFound = require('./middlewares/page-not-found');

const app = module.exports = new Koa();

// app.use(logger());

app.use(body());

// app.use(cors());

app.use(connector());

app.use(router.routes(), router.allowedMethods());
// app.use(router.routes());
// app.use(router.allowedMethods());

app.use(pageNotFound);

// Export a module or start server
if (!module.parent) {
  console.log("Listening on port 8080...");
  app.listen(8080);
}
