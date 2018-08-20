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

// загрузка данных

// var URL = 'C:/Users/Anatoly/Documents/Web/Order book/data.json';

// var upload = function (onSuccess, onError) {
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'json';

//   xhr.addEventListener('load', function () {
//     if (xhr.status === 200) {
//       onSuccess(xhr.response);
//     } else {
//       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
//     }
//   });
//   xhr.addEventListener('error', function () {
//     onError('Произошла ошибка соединения');
//   });
//   xhr.addEventListener('timeout', function () {
//     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//   });

//   xhr.timeout = 10000;

//   xhr.open('GET', URL);
//   xhr.send();
// };

// Генерация и отрисовка таблиц

var bidsTable = document.querySelector('.order__tbody--bids'),
  asksTable = document.querySelector('.order__tbody--asks'),
  rowTemplate = document.querySelector('.row-template').content.querySelector('.order__tr');

var getRow = function (obj, prevSum) {
  var rowElement = rowTemplate.cloneNode(true);

  rowElement.children[0].textContent = obj.numberOfOrders;
  rowElement.children[1].textContent = obj.quantity + prevSum;
  rowElement.children[2].textContent = obj.quantity;
  rowElement.children[3].textContent = obj.price;

  return rowElement;
};

var getMaxTotal = function (htmlCollection) {
  var arr = [];

  Array.from(htmlCollection).forEach(function (el) {
    arr.push(el.quantity);
  });

  var maxTotal = arr.reduce(function (sum, current) {
    return sum + current;
  }, 0);

  return maxTotal;
};

var reverseCollection = function (obj) {
  var arr = Array.from(obj.children).reverse();

  obj.removeChild(obj.firstChild);
  arr.forEach(function (el) {
    obj.appendChild(el);
  });

  return obj;
};

var renderTable = function (htmlCollection, table) {
  var prevAmount = 0;
  var fragment = document.createDocumentFragment();

  Array.from(htmlCollection).forEach(function (el) {
    var lgr = 100 * (prevAmount + el.quantity) / getMaxTotal(htmlCollection) + '%';
    var row = getRow(el, prevAmount);

    row.style = 'background-image: linear-gradient(to left, #d3f8d3 ' + lgr + ', white ' + lgr + ');';
    if (table === asksTable) {
      reverseCollection(row);
      row.style = 'background-image: linear-gradient(to right, #ffe6ea ' + lgr + ', white ' + lgr + ');';
    }
    fragment.appendChild(row);
    prevAmount += el.quantity;
  })

  table.appendChild(fragment);
}

renderTable(data.bids, bidsTable);
renderTable(data.asks, asksTable);

// var onSuccessUpload = function (data) {
//   renderTable(data.asks);
// };

// var onErrorLoad = function (errormessage) {
//   alert(errormessage);
// };

// upload(onSuccessUpload, onErrorLoad);
