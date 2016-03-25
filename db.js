var Disease = require('./models/disease');
var mongoose = require('mongoose');
var credentials = require('./credentials');

var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};

switch (process.env.NODE_ENV) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    case 'test':
        mongoose.connect(credentials.mongo.test.connectionString, opts);
        break;

    default:
        throw new Error('Unknown execution environment: ' + process.env.NODE_ENV);
}

var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function() {
    Disease.find(function(err, diseases) {
        if (diseases.length) return;
        for (i = 0; i < 0; i++) {
            new Disease({
                name: 'Hood River Day Trip'+i,
                shortDescription: 'shortDesc'+i,
                longDescription: 'longDesc'+i,
                winingText: 'winText'+i
            }).save();
        }
    });
});