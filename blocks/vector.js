'use strict';

goog.provide('Blockly.Blocks.vectors');

goog.require('Blockly.Blocks');


Blockly.Blocks.vectors.HUE = '#42A5F5'; 
Blockly.Blocks.vectors.HUE_ALT = '#1E88E5';

////////////////////////////////////////////////

Blockly.Blocks['vector'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("vector(");
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
    this.setColour(Blockly.Blocks.vectors.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['vector_math'] = {
  init: function() {
    var thisBlock = this;
    this.appendValueInput("vector1")
        .setCheck("Vector")
        .appendField(new Blockly.FieldDropdown([["magnitude", "MAG"], 
                                                ["magnitude squared", "MAG2"], 
                                                ["unit vector", "NORM"], 
                                                ["dot product", "DOT"], 
                                                ["cross product", "CROSS"], 
                                                ["projection", "PROJ"], 
                                                ["component", "COMP"], 
                                                ["angle difference", "DIFF_ANGLE"]], 
                                                function(selected){
                                                    thisBlock.updateShape_(selected);
                                                }), 
                                                "OP");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selection = "";
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selection = this.getFieldValue("OP");
    container.setAttribute('selection', this.selection);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selection = xmlElement.getAttribute('selection');
    this.updateShape_(this.selection);
  },

  updateShape_: function(selected){

    if(this.getInput('vector2')){
        this.removeInput('vector2');
    }

    switch(selected){

        case 'MAG':
        case 'MAG2':
            this.setOutput(true, "Number");
            this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
            break;

        case 'NORM':
            this.setOutput(true, "Vector");
            this.setColour(Blockly.Blocks.vectors.HUE);
            break;

        case 'DOT':
        case 'COMP':
        case 'DIFF_ANGLE':
            this.appendValueInput('vector2').setCheck("Vector");
            this.setOutput(true, "Number");
            this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
            break;

        case 'CROSS':
        case 'PROJ':
            this.appendValueInput('vector2').setCheck("Vector");
            this.setOutput(true, "Vector");
            this.setColour(Blockly.Blocks.vectors.HUE);
            break;

    }
  }
};


Blockly.Blocks['vector_math_single'] = {
  /**
   * Block for vector math operations on single input.
   * @this Blockly.Block
   */ 
  init: function() {
    var thisBlock = this;
    this.appendValueInput("vector1")
        .setCheck("Vector")
        .appendField(new Blockly.FieldDropdown([["magnitude", "MAG"], 
                                                ["magnitude squared", "MAG2"], 
                                                ["unit vector", "NORM"]],  
                                                function(selected){
                                                    thisBlock.updateShape_(selected);
                                                }), 
                                                "OP");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selection = "";
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selection = this.getFieldValue("OP");
    container.setAttribute('selection', this.selection);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selection = xmlElement.getAttribute('selection');
    this.updateShape_(this.selection);
  },

  updateShape_: function(selected){

    switch(selected){

        case 'MAG':
        case 'MAG2':
            this.setOutput(true, "Number");
            this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
            break;
        case 'NORM':
            this.setOutput(true, "Vector");
            this.setColour(Blockly.Blocks.vectors.HUE);
            break;
    }
  }
};


Blockly.Blocks['vector_math_double'] = {
  /**
   * Block for vector math operations on two inputs.
   * @this Blockly.Block
   */ 
  init: function() {
    var thisBlock = this;
    this.appendValueInput("vector1")
        .setCheck("Vector")
        .appendField(new Blockly.FieldDropdown([["dot product", "DOT"], 
                                                ["cross product", "CROSS"], 
                                                ["projection", "PROJ"], 
                                                ["component", "COMP"], 
                                                ["angle difference", "DIFF_ANGLE"]], 
                                                function(selected){
                                                    thisBlock.updateShape_(selected);
                                                }), 
                                                "OP");
    this.appendValueInput("vector2")
        .setCheck("Vector");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selection = "";
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selection = this.getFieldValue("OP");
    container.setAttribute('selection', this.selection);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selection = xmlElement.getAttribute('selection');
    this.updateShape_(this.selection);
  },

  updateShape_: function(selected){

    switch(selected){

        case 'DOT':
        case 'COMP':
        case 'DIFF_ANGLE':
            this.setOutput(true, "Number");
            this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
            break;
        case 'CROSS':
        case 'PROJ':
            this.setOutput(true, "Vector");
            this.setColour(Blockly.Blocks.vectors.HUE);
            break;

    }
  }
};