const mongoose = require('mongoose');
const config = require('config');
const glob = require('glob');
const path = require("path");

const connector = function() {
    const dbConfig = config.get('Customer.dbConfig');
    const { host, port, dbName, debug } = dbConfig;
    const url = 'mongodb://' + host + ':' + port + '/' + dbName;
    // connect to mongodb
    let connected = false;
    mongoose.set('debug', debug);
    const connectionPromise = mongoose.connect(url);
    connectionPromise.then((conn) => { 
        connected = !!conn; 
    }).catch((error) => {
        console.warn('Connect to database field, first time : '+ error);
    });
    // require all models.
    const modelsDir = path.dirname(__dirname) + '/app/routes';
    glob.sync(modelsDir + '/**/model.js').map((file) => { 
        require(file);
    });
    // return middleware.
    return async function(ctx, next) {
        // try connect again
        if (!connected) {
            await connectionPromise().catch((err) => {
                throw err;
            })
        }
        // save mongoose and mongoose models to ctx.
        ctx.mongoose = mongoose;
        await next()
    };
}

module.exports = connector;