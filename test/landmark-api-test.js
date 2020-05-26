'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Landmark API tests', function () {

    let landmarks = fixtures.landmarks;
    let newLandmark = fixtures.newLandmark;
    let newUser = fixtures.newUser;

    const poiService = new PoiService(fixtures.poiService);

    suiteSetup(async function() {
        await poiService.deleteAllUsers();
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await poiService.deleteAllUsers();
        poiService.clearAuth();
    });

    setup(async function() {
        await poiService.deleteAllLandmarks();
    });

    teardown(async function() {
        await poiService.deleteAllLandmarks();
    });

    test('create a landmark', async function () {
        const returnedLandmark = await poiService.createLandmark(newLandmark);
        assert(_.some([returnedLandmark], newLandmark), 'returnedLandmark must be a superset of newLandmark');
        assert.isDefined(returnedLandmark._id);
    });

    test('get landmark', async function () {
        const c1 = await poiService.createLandmark(newLandmark);
        const c2 = await poiService.getLandmark(c1._id);
        assert.deepEqual(c1, c2);
    });

    test('get invalid landmark', async function () {
        const c1 = await poiService.getLandmark('1234');
        assert.isNull(c1);
        const c2 = await poiService.getLandmark('012345678901234567890123');
        assert.isNull(c2);
    });


    test('delete a landmark', async function () {
        let c = await poiService.createLandmark(newLandmark);
        assert(c._id != null);
        await poiService.deleteOneLandmark(c._id);
        c = await poiService.getLandmark(c._id);
        assert(c == null);
    });

    test('get all landmarks', async function () {
        for (let c of landmarks) {
            await poiService.createLandmark(c);
        }

        const allLandmarks = await poiService.getLandmarks();
        assert.equal(allLandmarks.length, landmarks.length);
    });

    test('get landmarks detail', async function () {
        for (let c of landmarks) {
            await poiService.createLandmark(c);
        }

        const allLandmarks = await poiService.getLandmarks();
        for (var i = 0; i < landmarks.length; i++) {
            assert(_.some([allLandmarks[i]], landmarks[i]), 'returnedLandmark must be a superset of newLandmark');
        }
    });

    test('get all landmarks empty', async function () {
        const allLandmarks = await poiService.getLandmarks();
        assert.equal(allLandmarks.length, 0);
    });



});