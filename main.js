var prompt = require('prompt');
var chalk = require('chalk');
var orders = [];

var properties = [{
    name: 'id',
    validator: /^[a-zA-Z]+$/,
    warning: 'Wrong format enter Name'
  }, {
    name: 'quantity',
    validator: /^[0-9]+$/,
    warning: 'Wrong format enter Number'
  }, {
    name: 'price',
    validator: /^\d+(\.\d{1,2})?$/,
    warning: 'Wrong format Enter Number'
  },

  {
    name: 'type',
    validator: /^(buy|sell)+$/,
    warning: 'Wrong format [buy,sell]'
  }
];

var start =
  [{
    name: 'command',
    validator: /^(enter|delete|view)+$/,
    warning: 'Possible commands are enter,delete,view'
  }];

var keyParam =
  [{
    name: 'key'
  }];

console.log("\033c");

function main() {

  prompt.start();

  console.log('[COMMANDS: enter, delete, view]');


  prompt.get(start, function(err, result) {
    if (err) {
      return onErr(err);
    }

    result = result.command;

    if (result.includes('enter'))
      enter();

    if (result.includes('delete'))
      remove();

    if (result.includes('view'))
      print();

  });

}

function remove(key) {
  prompt.get(keyParam, function(err, result) {
    if (err) {
      return onErr(err);
    }
    let index = 0;
    let key = result.key;
    orders.forEach(function(order) {

      console.log(order.key);
      if (order.key == key) {
        orders.splice(index, 1);
        console.log('there was a match');
      }
      index++;
    })
    main();
  });
}

function enter() {
  prompt.get(properties, function(err, result) {
    if (err) {
      return onErr(err);
    }

    result.key = Math.floor(Math.random() * 10);

    result.quantity = parseInt(result.quantity);
    orders.push(result);

    main();

  });
}

function onErr(err) {
  console.log(err);
  return 1;
}

function sortOrders(input) {
  output = input.reduce(function(accum, current) {
    var idx = accum.findIndex(function(i) {
      return i.id == current.id && i.price == current.price && i.type == current.type
    });
    if (idx === -1) {
      return accum.concat(current);
    } else {
      accum[idx].quantity = parseInt(accum[idx].quantity);
      accum[idx].quantity += parseInt(current.quantity);
      return accum;
    }
  }, []);

  return output;

}

function print() {

  orders = sortOrders(orders);

  function sellFilter(x) {
    return x.type == 'sell';
  }

  function buyFilter(x) {
    return x.type == 'buy';
  }

  var sellOrders = orders.filter(sellFilter);

  var buyOrders = orders.filter(buyFilter);

  sortSellOrders(sellOrders);

  sortBuyOrders(buyOrders);

  sellOrders.forEach(function(order) {
    console.log(order);
  });
  buyOrders.forEach(function(order) {
    console.log(order);
  });
  main();
}

function sortSellOrders(arr) {

  let input = arr.sort(function(a, b) {
    return a.price > b.price;
  });

  return input;
}

function sortBuyOrders(leArray) {

  let input = leArray.sort(function(a, b) {
    return a.price < b.price;
  });

  return input;
}

module.exports = {
  main: main(),
  sortOrders: sortOrders,
  sortSellOrders: sortSellOrders,
  sortBuyOrders: sortBuyOrders
};