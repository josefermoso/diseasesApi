process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var Disease = require('../models/disease');
require('../db');

chai.use(chaiHttp);

describe('Diseases', function() {
    Disease.collection.drop();
    beforeEach(function(done) {
        for (i = 0; i < 3; i++) {
            new Disease({
                name: 'Hood River Day Trip' + i,
                shortDescription: 'shortDesc' + i,
                longDescription: 'longDesc' + i,
                winingText: 'winText' + i
            }).save();
        }
        done();
    });

    afterEach(function(done) {
        Disease.collection.drop();
        done();
    });



    it('should list ALL diseases on /diseases GET', function(done) {
        chai.request(server)
            .get('/diseases')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('shortDescription');
                res.body[0].should.have.property('longDescription');
                res.body[0].should.have.property('winingText');
                res.body[0].name.should.equal('Hood River Day Trip' + 0);
                res.body[0].shortDescription.should.equal('shortDesc' + 0);
                res.body[0].longDescription.should.equal('longDesc' + 0);
                res.body[0].winingText.should.equal('winText' + 0);
                done();
            });
    });

    it('should create a SINGLE disease on /diseases PUT', function(done) {
        chai.request(server)
            .post('/diseases')
            .send({
                'name': 'nameTest',
                'longDescription': 'longDescTest',
                'shortDescription': 'shortDescTest',
                'winingText': 'winingTextTest'
            })
            .end(function(error, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                done();
            });
    });
});
