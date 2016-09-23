'use strict';

var request = require('supertest');

describe('Brands', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all brands', function (done) {
        request(app)
            .get('/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single brand', function (done) {
        request(app)
            .get('/brands/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new brand', function (done) {
        request(app)
            .post('/brands')
            .send({ name: 'Test Brand'})
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Brand');

                done(res);
            });
    })
});