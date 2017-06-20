'use strict';

goog.provide('Blockly.Blocks.graphs');

goog.require('Blockly.Blocks');

Blockly.Blocks.graphs.HUE = '#26A69A';

Blockly.Blocks['create_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["curve", "CURVE"],
        										["dots", "DOTS"]]), "LINE_TYPE")
        .appendField(new Blockly.FieldColour("#ff0000"), "LINE_COLOR");
    this.setInputsInline(true);
    this.setOutput(true, "Line");
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Creates line for plotting on a graph as either a solid\
    				 curve or a dotted line.');
  }
};

Blockly.Blocks['plot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("plot")
        // Dropdown function that only returns type "Line"
        .appendField(new Blockly.FieldDropdown(this.dynamicOptions), "LINE");
    this.appendValueInput("X_VALUE")
        .setCheck("Number")
        .appendField("at  X:");
    this.appendValueInput("Y_VALUE")
        .setCheck("Number")
        .appendField("Y:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE)
    this.setTooltip('Plots a selected line at a given X,Y coordinate on the\
    				 the lines corresponding graph display.');
  },

  dynamicOptions: function() {
  	var options = []
    // Variable for storing a list of all variable blocks in workspace
  	var allVariables = Blockly.Variables.allVariables(workspace);
    // Variable for menu options of no Line type variables
  	var empty = ["none","NONE"];
  	if (!allVariables.length==0) {
    	for (var curr in allVariables) {
        // Filter out names of object funtions that get returned
    		if (!(curr === "append" ||
    			curr === "copy" ||
    			curr === "extend" ||
    			curr === "index" ||
    			curr === "insert" ||
    			curr === "remove" ||
          curr === "+")) {
    			var varBlock = workspace.getVariableUses(allVariables[curr])[0].inputList[0].connection;
          // Only push variable block to menu if it has a Line type connected to it
    			if (!(varBlock.targetConnection==null) && varBlock.targetConnection.check_[0]==="Line") {
    				options.push([allVariables[curr],allVariables[curr].toUpperCase()]);
    			} else {
    				options.push(empty);
    			}
    		}
    	}
    } else {
      options.push(empty);
    }
  	return options;
  }
};