var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Disease = require('../models/disease.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    //  res.render('index', { title: 'Express' });
    Disease.find({}, function(err, diseases) {
        if (err) return res.send(500, 'error');
        res.json(diseases.map(function(d) {
            return {
                name: d.name,
                shortDescription: d.shortDescription,
                longDescription: d.longDescription,
                winingText: d.winingText
            };
        }));
    });
});

/* POST home page. */
router.post('/', function(req, res, next) {
    var newDisease = _.pick(req.body, 'name', 'shortDescription', 'longDescription', 'winingText');
    var body = req.body;
    //  res.render('index', { title: 'Express' });
    if (!_.isString(body.name) || body.name.trim().length === 0 ||
        !_.isString(body.shortDescription) || body.shortDescription.trim().length === 0 ||
        !_.isString(body.longDescription) || body.longDescription.trim().length === 0 ||
        !_.isString(body.winingText) || body.winingText.trim().length === 0) {
        return res.status(400).send();
    }
    new Disease({
        name: newDisease.name,
        shortDescription: newDisease.shortDescription,
        longDescription: newDisease.longDescription,
        winingText: newDisease.winingText
    }).save(
        function(err, a) {
            if (err) return res.send(500, 'Error occurred: database error.');
            res.json({ id: a._id });
        }
        );
});


module.exports = router;
