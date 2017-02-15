var chai = require('chai');
var assert = chai.assert;
var main = require('./main.js');
var sellSort = main.sortSellOrders;
var buySort = main.sortBuyOrders;
var newOrders = [{
			id: 'chris',
			quantity: 20,
			price: 1,
			type: 'sell'
		}, {
			id: 'chris',
			quantity: 20,
			price: 1,
			type: 'sell'
		}, {
			id: 'chris',
			quantity: 20,
			price: 50,
			type: 'sell'
		}];

describe('Check assertion library works', function() {
	it('Empty array', function() {
		var array = [];

		assert.equal(array.length, 0);
	});
});

describe('Merge similar results [price & type]', function() {
	it('Should be 2 orders after merging', function() {

		var array = newOrders;

		array = main.sortOrders(array);

		assert.equal(array.length, 2);

	});
});

describe('Merge similar results [price & type] and add the quantities correctly', function() {
	it('Should be a quantity of 40 for order number 1', function() {
		
		assert.equal(newOrders[0].quantity, 40);

	});
});

describe('Sort orders so Buy orders are ordered most expensive first', function() {
	it('Should have most expensive order first', function() {

		buySort(newOrders);

		assert.equal(newOrders[0].price, 50);

	});
});

describe('Sort orders so Sell orders are ordered cheapest first', function() {
	it('Should have most expensive order first', function() {

		sellSort(newOrders);

		assert.equal(newOrders[0].price, 1);

	});
});