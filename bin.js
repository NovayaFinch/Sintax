#!/usr/bin/env node

const Sintax = require("./index.js");

let args = process.argv.slice(2);

let sintax = new Sintax();
sintax.init(args[0]);

require("./sinful").init.bind(sintax)();
require("./highlite").init.bind(sintax)();
