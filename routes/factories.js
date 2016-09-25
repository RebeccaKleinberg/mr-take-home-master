var express = require('express');
var factoryStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    factoryStore.list(function(err, companies) {
        if (err) throw err;

        factories = [];

        for (var i = 0; i < companies.length; i++) {
            if (companies[i].company_type === "Factory") {
                factories.push(companies[i]);
            }; 
        };

        res.json(factories);
    });
});
router.get('/:id', function(req, res, next) {
    factoryStore.load(req.params.id, function(err, factory) {
        if (err) throw err;

        res.json(factory);
    });
});
router.delete('/:id', function(req, res, next) {
    factoryStore.remove(req.params.id, function(err, factory) {
        if (err) throw err;

        res.send("Factory was deleted");
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newFactory = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state,
        company_type: "Factory"
    };
    factoryStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});

module.exports = router;
