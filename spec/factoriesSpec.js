'use strict';

var request = require('supertest');

describe('Factories', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all factories', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/factories/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new factory', function (done) {
        request(app)
            .post('/factories')
            .send({ name: 'Test Factory'})
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Factory');

                done(res);
            });
    });        
    it('creates a new factory with correct company type', function (done) {
        request(app)
            .post('/factories')
            .send({ name: 'Test Factory'})
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.company_type).toEqual("Factory");

                done(res);
            });
    })
});