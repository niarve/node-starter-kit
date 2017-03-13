"use strict";

console.log("hello nate");

var entry = require('./entry.js');
entry();

var app = angular.module('app', []);

require('./controller.js');
