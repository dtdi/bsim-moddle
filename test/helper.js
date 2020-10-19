"use strict";

var fs = require("fs");

function readFile(filename) {
  return fs.readFileSync(filename, { encoding: "UTF-8" });
}

module.exports.readFile = readFile;

var BpmnModdle = require("bpmn-moddle");

var bsimDescriptor = require("../resources/bsim");
var camundaDescriptor = require("../resources/camunda");

function createModdle() {
  return new BpmnModdle({
    camunda: camundaDescriptor,
    bsim: bsimDescriptor,
  });
}

module.exports.createModdle = createModdle;
