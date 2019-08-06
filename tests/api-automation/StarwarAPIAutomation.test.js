const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require('util');
const baseURL = 'https://swapi.co/api';

describe('return Luke', function () {
    it('should return Luke', function (done) {
        request.get(
            {url: baseURL + '/people/1'},
            async function (error, response, body) {
                let bodyObj = JSON.parse(body);
                expect(bodyObj.name).to.equal('Luke Skywalker');
                expect(bodyObj.hair_color).to.equal("blond");
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            }
        )
    });
});