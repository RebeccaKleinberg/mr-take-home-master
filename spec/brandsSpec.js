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
    it('does not get factories', function (done) {
        request(app)
            .get('/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                var company_type = [];
                for (var i = 0; i < res.body.length; i ++) {
                     company_type.push(res.body[i].company_type);
                }
                expect(company_type).not.toContain("Factory");
                done(res);
            });
    }); 
    it('gets a single brand', function (done) {
        request(app)
            .get('/brands/a99344ee-c748-4c97-af4b-e051bc86a28f')
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
    it('creates a new brand with correct company type', function (done) {
    	request(app)
    		.post('/brands')
    		.send({ name: 'Test Brand'})
    		.end(function (err, res) {
    			if (err) return done.fail(res);
    			expect(res.body.company_type).toEqual("Brand");

    			done(res);
    		});
    });
    it('deletes a brand', function (done) {
        request(app)
            .delete('/brands/a99344ee-c748-4c97-af4b-e051bc86a28f')
            .expect(200)
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body).toEqual(jasmine.objectContaining({ }));
                done(res);
            });
    });
});