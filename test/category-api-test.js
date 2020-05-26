'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Category API tests', function() {
    let categorys = fixtures.categorys;
    let newCategory = fixtures.newCategory;

    const poiService = new PoiService(fixtures.poiService);

    setup(async function() {
        await poiService.deleteAllCategorys();
    });

    teardown(async function() {
        await poiService.deleteAllCategorys();
    });

    test('create a category', async function() {
        const returnedCategory = await poiService.createCategory(newCategory);
        assert(_.some([returnedCategory], newCategory), 'returnedCategory must be a superset of newUser');
        assert.isDefined(returnedCategory._id);
    });

    test('get category', async function() {
        const ca1 = await poiService.createCategory(newCategory);
        const ca2 = await poiService.getCategory(ca1._id);
        assert.deepEqual(ca1, ca2);
    });

    test('get invalid category', async function() {
        const ca1 = await poiService.getCategory('1234');
        assert.isNull(ca1);
        const ca2 = await poiService.getCategory('012345678901234567890123');
        assert.isNull(ca2);
    });

    test('delete a category', async function() {
        let ca = await poiService.createCategory(newCategory);
        assert(ca._id != null);
        await poiService.deleteOneCategory(ca._id);
        ca = await poiService.getCategory(ca._id);
        assert(ca == null);
    });

    test('get all categorys', async function() {
        for (let ca of categorys) {
            await poiService.createCategory(ca);
        }

        const allCategorys = await poiService.getCategorys();
        assert.equal(allCategorys.length, categorys.length);
    });

    test('get categorys detail', async function() {
        for (let ca of categorys) {
            await poiService.createCategory(ca);
        }

        const allCategorys = await poiService.getCategorys();
        for (var i = 0; i < categorys.length; i++) {
            assert(_.some([allCategorys[i]], categorys[i]), 'returnedUser must be a superset of newCategory');
        }
    });

    test('get all categorys empty', async function() {
        const allCategorys = await poiService.getCategorys();
        assert.equal(allCategorys.length, 0);
    });




});