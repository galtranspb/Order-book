'use strict';

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
