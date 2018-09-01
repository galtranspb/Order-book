'use strict';

(function () {
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

  var getMaxTotal = function (list) {
    var arr = [];

    Array.from(list).forEach(function (el) {
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

  var renderTable = function (arr, table) {
    var prevAmount = 0;
    var fragment = document.createDocumentFragment();

    arr.forEach(function (el) {
      var colorStop = 100 * (prevAmount + el.quantity) / getMaxTotal(arr) + '%';
      var row = getRow(el, prevAmount);

      row.style = 'background-image: linear-gradient(to left, #d3f8d3 ' + colorStop + ', white ' + colorStop + ');';
      if (table === asksTable) {
        reverseCollection(row);
        row.style = 'background-image: linear-gradient(to right, #ffe6ea ' + colorStop + ', white ' + colorStop + ');';
      }
      fragment.appendChild(row);
      prevAmount += el.quantity;
    })

    table.appendChild(fragment);
  }

  renderTable(data.bids, bidsTable);
  renderTable(data.asks, asksTable);

  // var onSuccessUpload = function (data) {
  //   renderTable(data.bids, bidsTable);
  //   renderTable(data.asks, asksTable);
  // };

  // var onErrorLoad = function (errormessage) {
  //   alert(errormessage);
  // };

  // window.upload(onSuccessUpload, onErrorLoad);

})();
