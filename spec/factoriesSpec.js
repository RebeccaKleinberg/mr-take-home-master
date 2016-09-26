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
    it('does not get brands', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                var company_type = [];
                for (var i = 0; i < res.body.length; i ++) {
                     company_type.push(res.body[i].company_type);
                }
                expect(company_type).not.toContain("Brand");
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
    });
    it('deletes a factory', function (done) {
        request(app)
            .delete('/factories/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body).toEqual(jasmine.objectContaining({ }));
                done(res);
            });
    });
});