const request = require('request');
const expect = require('chai').expect;
const baseURL = 'https://swapi.co/api';
const chai = require('chai');

describe('return Luke', function () {
    it('should return Luke', function (done) {
        request.get(
            {url: baseURL + '/people/1'},
            async function (error, response, body) {
                let bodyObj = JSON.parse(body);
                expect(bodyObj.name).to.equal('Luke Skywalker');
                expect(bodyObj.hair_color).to.equal("blond");
                expect(bodyObj.skin_color).to.equal('fair');
                expect(bodyObj.gender).to.equal('male');
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            }
        );
    });

    it('should return Luke Skaywalker', function (done) {
        request.get(
            // uri
            {
                uri: baseURL + '/people/1/'
            },

            // call back function
            function (error, response, body) {
                let bodyObj = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(bodyObj.name).to.equal('Luke Skywalker');
                expect(bodyObj.hair_color).to.equal('blond');
                done();
            }
        );
    });
});