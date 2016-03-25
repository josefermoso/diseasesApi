module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://localhost/diseaseApiDev',
        },
        production: {
            connectionString: 'mongodb://localhost/diseaseApiProd',
        },
        test: {
            connectionString: 'mongodb://localhost/diseaseApiTest',
        },
    },
};