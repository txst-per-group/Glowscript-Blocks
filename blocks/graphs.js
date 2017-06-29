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
    this.appendDummyInput("VAR")
        .appendField("plot")
        // Dropdown function that only returns type "Line"
        .appendField(new Blockly.FieldDropdown(function(selection){return thisBlock.dynamicOptions(thisBlock)}), "LINE");
    this.appendValueInput("X_VALUE") 
        .setCheck("Number")
        .appendField("(");
    this.appendValueInput("Y_VALUE")
        .setCheck("Number")
        .appendField(", ");
    this.appendDummyInput()
        .appendField(")");
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
  	var empty = ["none","none"];
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
  // onchange to update current selection if it changes from a line type
  onchange: function() {
    // Do nothing if block is only being dragged to avoid unnecessary calls
    if(this.workspace.isDragging())
      return;
    // Gets the currently selected variable block
    var selection = this.inputList[0].fieldRow[1].value_
    // Only continue if selection is not None (default)
    if (!(selection==="none")) {
      var varBlock = this.workspace.getVariableUses(selection)[0].inputList[0].connection;
      if (varBlock.targetConnection==null || !(varBlock.targetConnection
                                                          .check_[0]==="Line")){
        // Update list with top most "Line" variable
        this.getInput("VAR").fieldRow[1].setValue(this.dynamicOptions(this)[0][0]);
      }      
    }
  }
};

Blockly.Blocks['graph_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("graph display");
    this.appendStatementInput("OBJECTS")
        .setCheck("Line")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setOutput(true, null);
    this.setMutator(new Blockly.Mutator(['title','xmax','xmin','ymax','ymin']));
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Creates a display which contains the enclosed graph objects.');
    this.hasXml = {title:0, xmax:0, xmin:0, ymax:0, ymin:0};
    for (var attribute in this.hasXml){
      this.hasXml[attribute] = false;
    }
    this.element_count_ = 0;
  },
  /**
   * Create XML to represent if block is supposed to have inputs 
   * from hasXml List and keeps element count
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if(!this.elementCount_){
      return null;
    }
    var container = document.createElement('mutation');

    for (var attribute in this.hasXml){
      if (this.hasXml[attribute]){
        container.setAttribute(attribute, 1);
      }
    }
    container.setAttribute('element_count', this.elementCount_)

    return container;
  },
  /**
   * Parse XML to restore the hasXml of Boolean values
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    for (var attribute in this.hasXml){
      this.hasXml[attribute] = parseInt(xmlElement.getAttribute(attribute), 10) || 0;
    }
    this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('display_root');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;

    for (var attribute in this.hasXml){
      if(this.hasXml[attribute]){
        var mutatorBlock = workspace.newBlock(attribute);
        mutatorBlock.initSvg();
        connection.connect(mutatorBlock.previousConnection);
        connection = mutatorBlock.nextConnection;
      }
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    for (var attribute in this.hasXml){
      this.hasXml[attribute] = false;
    }
    this.elementCount_ = 0;

    var valueConnections = [];
    while (clauseBlock){
      this.hasXml[clauseBlock.type] = true;
      this.elementCount_++;
      valueConnections.push([clauseBlock.type.toUpperCase(),
                             clauseBlock.valueConnections_]);

      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    for (var i=0; i<=this.elementCount_-1; i++){
      Blockly.Mutator.reconnect(valueConnections[i][1],this,valueConnections[i][0]);
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // list of graph display inputs
    var inputs = ['TITLE','XMAX','XMIN','YMAX','YMIN','OBJECTS']
    // start by resetting all inputs
    for (var input in inputs){
      if (this.getInput(inputs[input]))
        this.removeInput(inputs[input]);
    }
    // add inputs from the xml list
    for (var has in this.hasXml){
      //special case for title attribute
      if (has === 'title'){
        if (this.hasXml[has]){
          this.appendValueInput("TITLE")
              .setCheck("String")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField("title");
        }
      }else{
        if (this.hasXml[has]){
          this.appendValueInput(has.toUpperCase())
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(has);
        }
      }
    }
    // add back OBJECTS statements last, below other attributes
    this.appendStatementInput('OBJECTS')
        .setCheck("Line")
        .setAlign(Blockly.ALIGN_RIGHT);

  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    while (clauseBlock){
      var valueInput = this.getInput(clauseBlock.type.toUpperCase());
      if (!(valueInput.connection==null))
        clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['display_root'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("display");
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Display for graph with default parameters.');
  }
};

Blockly.Blocks['title'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("title");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets the title of the graph to a given string.');
  }
};

Blockly.Blocks['xmax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("xmax");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets the maximum number on the X axis to be displayed.');
  }
};

Blockly.Blocks['xmin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("xmin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets the minimum number on the X axis to be displayed.');
  }
};

Blockly.Blocks['ymax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ymax");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets the maximum number on the Y axis to be displayed.');
  }
};

Blockly.Blocks['ymin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ymin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets the minimum number on the Y axis to be displayed.');
  }
};