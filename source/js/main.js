'use strict';

var data = {
  "name": "BTC/USD",
  "asks": [{
    "numberOfOrders": 1,
    "price": 6074.9,
    "quantity": 3.93318116
  }, {
    "numberOfOrders": 1,
    "price": 6080,
    "quantity": 0.01
  }, {
    "numberOfOrders": 1,
    "price": 6081.04,
    "quantity": 34.6
  }, {
    "numberOfOrders": 1,
    "price": 6084.12,
    "quantity": 0.04
  }, {
    "numberOfOrders": 1,
    "price": 6085.78,
    "quantity": 3.13
  }, ],
  "bids": [{
    "numberOfOrders": 3,
    "price": 6074.6,
    "quantity": 4.86156108
  }, {
    "numberOfOrders": 9,
    "price": 6074.5,
    "quantity": 15.7519723
  }, {
    "numberOfOrders": 17,
    "price": 6074.46,
    "quantity": 1.19
  }, {
    "numberOfOrders": 10,
    "price": 6074.4,
    "quantity": 24.71556326
  }, {
    "numberOfOrders": 13,
    "price": 6074.3,
    "quantity": 14.28293521
  }]
}

var bidsTable = document.querySelector('.order__tbody--bids'),
  asksTable = document.querySelector('.order__tbody--asks'),
  rowTemplate = document.querySelector('.row-template').content.querySelector('.order__tr');

var getRow = function (obj, value) {
  var rowElement = rowTemplate.cloneNode(true);
  var count = rowElement.querySelector('.order__td--first-column'),
    total = rowElement.querySelector('.order__td--second-column'),
    amount = rowElement.querySelector('.order__td--thrid-column'),
    price = rowElement.querySelector('.order__td--fourth-column');

  count.textContent = obj.numberOfOrders;
  total.textContent = obj.quantity + value;
  amount.textContent = obj.quantity;
  price.textContent = obj.price;

  return rowElement;
};

var renderTable = function (htmlCollection) {
  var prevAmount = 0;
  var fragment = document.createDocumentFragment();

  Array.from(htmlCollection).forEach(function (el) {
    fragment.appendChild(getRow(el, prevAmount));
    prevAmount += el.quantity;
  })

  bidsTable.appendChild(fragment);
}

renderTable(data.asks);
