'use strict';

goog.provide('Blockly.Blocks.vector');

goog.require('Blockly.Blocks');

Blockly.Blocks['vector'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("Vector(");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField(",");
    this.appendValueInput("Z")
        .setCheck("Number")
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Vector");
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

 
Blockly.Blocks['vector_test'] = {
  init: function() {
    this.appendValueInput("test")
        .setCheck("Vector")
        .appendField("Test Vector here");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};