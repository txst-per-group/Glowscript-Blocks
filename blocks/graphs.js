'use strict';

goog.provide('Blockly.Blocks.graphs');

goog.require('Blockly.Blocks');

Blockly.Blocks.graphs.HUE = '#26A69A';

Blockly.Blocks['series'] = {
  init: function() {
    this.appendValueInput("COLOR")
        .setCheck('Vector')
        .appendField(new Blockly.FieldDropdown([["curve", "CURVE"],
        										["dots", "DOTS"]]), "TYPE")
        .appendField(" color");
    this.setInputsInline(false);
    this.setOutput(true, "Series");
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Creates a series for plotting on a graph as either a solid\
    				 curve or a dotted line.');
  }
};

Blockly.Blocks['plot'] = {
  init: function() {
    var thisBlock = this;
    this.appendValueInput("X_VALUE") 
        .setCheck("Number")
        .appendField("plot (");
    this.appendValueInput("Y_VALUE")
        .setCheck("Number")
        .appendField(", ");
    this.appendDummyInput()
        .appendField(")");
    this.appendDummyInput("VAR")
        .appendField("on")
        // Dropdown function that only returns type "Series"
        .appendField(new Blockly.FieldDropdown(function(selection){return thisBlock.dynamicOptions(thisBlock)}), "LINE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE)
    this.setTooltip('Plots a selected graph object at a given X,Y coordinate on\
      the objects corresponding graph display.');
  },

  dynamicOptions: function(thisBlock) {
    // Options list to fill and push to dropdown
  	var options = []
    // Variable for menu options if no Series type variables are found in workspace
    var empty = ["none","none"];
    // Don't push variable names if in flyout menu
    if (this.isInFlyout)
      options.push(empty);
    // Variable for storing a list of all variable block NAMES in workspace
  	var allVariables = Blockly.Variables.allVariables(thisBlock.workspace);
    
  	if (!(allVariables.length==0)) {

    	for (var i = 0; i < allVariables.length; i++) {
        // List of REFERENCES to actual blocks with given name 
        // Used to loop through
  			var variableUses = thisBlock.workspace.getVariableUses(allVariables[i]);
        // List of variableUses to store only variables that are not iterators
        var currentUses = thisBlock.workspace.getVariableUses(allVariables[i]);
        // Check if current variable name is an iterator (or a variable_set feild on loop block)
        // If current variable is iterator, remove from currentUses
        for (var j = 0; j < variableUses.length; j++) {
          if(variableUses[j].isIterator || variableUses[j].type === "controls_for") {
            currentUses = [];
            break;
          }
        }
        // If carruentUses is now empty, then the current variable name is an iterator
        // Move to the next variable name and check
        // If currentUses contains more than one block reference, find the topBlock reference
        // If it contains only one reference, that is topBlock decleration block
        if (!(currentUses.length == 0)) {
          if (currentUses.length > 1) {
            var topBlock = {index: null, height: null};
            for(var k = 0; k < currentUses.length; k++){
              // add the first value, then find the highest but only if it is not itself
              if((topBlock.index == null || topBlock.height > currentUses[k].getRelativeToSurfaceXY().y) 
                  && currentUses[k].type == "variables_set" ){
                topBlock["index"] = k;
                topBlock["height"] = currentUses[k].getRelativeToSurfaceXY().y;
              }
            }
            var varBlock = currentUses[topBlock.index];
          } else {
            var varBlock = currentUses[0];
          }
          varBlock = varBlock.inputList[0].connection;
          // Only push variable block to menu if it has a Series type connected to it
          if (!(varBlock===null)) {
            if (!(varBlock.targetConnection==null) && varBlock.targetConnection.check_[0]==="Series") {
              options.push([allVariables[i],allVariables[i].toUpperCase()]);
            }
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
    // Do nothing if there is no variable selected
    if (this.inputList[3].fieldRow[1] !== undefined) {
      // Gets the currently selected variable block and checks if the variable
      var selection = this.inputList[3].fieldRow[1].text_;
      // If the variable in the selection no longer exists, update menu
      if (this.workspace.getVariableUses(selection).length==0) {
        this.getInput("VAR").fieldRow[1].setValue(this.dynamicOptions(this)[0][0]);
      } else if (this.workspace.getVariableUses(selection)[0]) {
        // If the selction variable still exists, check if its connection is 'Series'
        var varBlock = this.workspace.getVariableUses(selection)[0].inputList[0].connection;
          if (varBlock.targetConnection==null || 
          varBlock.targetConnection.check_[0]===!("Series")) {
            // If not 'Series', update list with top most 'Series' variable
            this.getInput("VAR").fieldRow[1].setValue(this.dynamicOptions(this)[0][0]);}
      }
    }
  }
};

Blockly.Blocks['graph_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("graph display");
    this.appendStatementInput("OBJECTS")
        .setCheck('Series')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setOutput(true, 'Graph');
    this.setMutator(new Blockly.Mutator(['title','xtitle','ytitle','xmax','xmin','ymax','ymin']));
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Creates a display which contains the enclosed graph objects.');
    this.hasXml = {title:0, xtitle:0, ytitle:0, xmax:0, xmin:0, ymax:0, ymin:0};
    for (var attribute in this.hasXml){
      this.hasXml[attribute] = false;
    }
    this.mutatorName = ["title", "xtitle", "ytitle", "xmax", "xmin", "ymax", "ymin"];
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
    // Go through the blocks connected to the root block in mutator menu
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Reset all attributes to false until confirmed they are connected
    for (var attribute in this.hasXml){
      this.hasXml[attribute] = false;
    }
    this.elementCount_ = 0;
    // Stores a list of new inputs on the WORKSPACE block (not the mutator block)
    // and their corresponding input connection blocks
    var valueConnections = [];
    // Loop through all mutator blocks connected in menu
    while (clauseBlock){
      // Records the connected attribute block in the xml
      this.hasXml[clauseBlock.type] = true;
      // Incriments how many mutator blocks are connected
      this.elementCount_++;
      // Adds the name of the new input and its connected block
      valueConnections.push([clauseBlock.type.toUpperCase(),
                             clauseBlock.valueConnection_]);
      // Move on to next connected mutator block if there is one
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    // Calls function to actually add the new inputs to the WORKSPACE block
    this.updateShape_();
    // Loop through for every recorded block connection
    for (var i=0; i<=this.elementCount_-1; i++){
      // And reconnect the recorded block to the blocks input
      Blockly.Mutator.reconnect(valueConnections[i][1],this,valueConnections[i][0]);
    }
    // If there were 'Series' objects connected
    if (!(containerBlock.stateConnection_==null))
      // Reconnect the stack of blocks back into the 'statementInput'
      Blockly.Mutator.reconnect(containerBlock.stateConnection_,this,'OBJECTS');
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // list of graph display inputs
    var inputs = ['TITLE','XTITLE','YTITLE','XMAX','XMIN','YMAX','YMIN','OBJECTS']
    // start by resetting all inputs
    for (var input in inputs){
      if (this.getInput(inputs[input]))
        this.removeInput(inputs[input]);
    }
    // add inputs from the xml list
    for (var has in this.hasXml){
      //special case for title attribute
      if (/title/.test(has)){
        if (this.hasXml[has]){
          this.appendValueInput(has.toUpperCase())
              .setCheck("String")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(has);
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
        .setCheck('Series')
        .setAlign(Blockly.ALIGN_RIGHT);

  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    // Start with root mutator block and loop through all connected blocks
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    while (clauseBlock){
      // Get the input from the WORKSPACE block (not mutator block)
      // by using the corresponding mutator block name
      var valueInput = this.getInput(clauseBlock.type.toUpperCase());
      // If there is a valid connected block
      if (!(valueInput.connection==null))
        // Record the value name and connected block info in the clauseBlock 
        clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    // Get the statement input for the block
    var statementInput = this.getInput('OBJECTS');
    // If there are blocks connected inside the statement input
    if (!(statementInput.connection==null))
      // Record the connected block information in the root mutator block
      containerBlock.stateConnection_ = statementInput.connection.targetConnection;
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

Blockly.Blocks['xtitle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("xtitle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets title of the x axis of the graph to a given string.');
  }
};

Blockly.Blocks['ytitle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ytitle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.graphs.HUE);
    this.setTooltip('Sets title of the y axis of the graph to a given string.');
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