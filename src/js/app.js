"use strict";

console.log("hello nate");

var entry = require('./entry.js');
entry();

var angular = require('angular');

var app = angular.module('app', []);
app.controller('mainController', ['$scope', ($scope) => {
  $scope.greeting =  {text: 'Hello Angular' };
}]);
