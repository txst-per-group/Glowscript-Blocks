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
    var thisBlock = this;
    this.appendDummyInput()
        .appendField("plot")
        // Dropdown function that only returns type "Line"
        .appendField(new Blockly.FieldDropdown(function(selection){return thisBlock.dynamicOptions(thisBlock)}), "LINE");
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

  dynamicOptions: function(thisBlock) {
  	var options = []
    // Variable for storing a list of all variable blocks in workspace
  	var allVariables = Blockly.Variables.allVariables(thisBlock.workspace);
    // Variable for menu options if no Line type variables are found in workspace
  	var empty = ["none","NONE"];
  	if (!allVariables.length==0) {
    	for (var curr in allVariables) {
        // allVariables is not a hash list and contains variable object functions
        // Filter out the names of object funtions that get unwantingly returned
    		if (!(curr === "append" ||
    			curr === "copy" ||
    			curr === "extend" ||
    			curr === "index" ||
    			curr === "insert" ||
    			curr === "remove" ||
          curr === "+")) {
    			var varBlock = thisBlock.workspace.getVariableUses(allVariables[curr])[0].inputList[0].connection;
          // Only push variable block to menu if it has a Line type connected to it
    			if (!(varBlock.targetConnection==null) && varBlock.targetConnection.check_[0]==="Line") {
    				options.push([allVariables[curr],allVariables[curr].toUpperCase()]);
    			}
    		}
    	}
      if (options.length==0) {
        options.push(empty);
      }
    } else {
      options.push(empty);
    }
  	return options;
  },
  // TODO use onchange to update current selection if it changes from a line type
  // onchange: function() {
  //   // Do nothing if block is only being dragged to avoid unnecessary calls
  //   if(this.workspace.isDragging())
  //     return;
  //   // Gets the currently selected variable block
  //   var selection = this.inputList[0].fieldRow[1].value_
  //   // Only continue if selection is not None (default)
  //   if (!(selection==="NONE")) {
  //     var varBlock = workspace.getVariableUses(selection)[0].inputList[0].connection;
  //     if (!(varBlock.targetConnection==null) && !(varBlock.targetConnection
  //                                                         .check_[0]==="Line")){
  //       return this.dynamicOptions;
  //     }      
  //   }
  // }
};