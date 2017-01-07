'use strict';

goog.provide('Blockly.Blocks.vector');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
//var vectors_color = '#0097A7';
var vectors_color = '#00BCD4';
Blockly.Blocks.vector.COLOR ='#00BCD4'; 


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
    this.setColour(vectors_color);
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
                                                ["normal", "NORM"], 
                                                ["dot product", "DOT"], 
                                                ["cross product", "CROSS"], 
                                                ["projection", "PROJ"], 
                                                ["comp", "COMP"], 
                                                ["angle difference", "DIFF_ANGLE"]], 
                                                function(selected){
                                                    thisBlock.updateShape_(selected);
                                                }), 
                                                "operation");
    this.setOutput(true, "Number");
    this.setColour(vectors_color);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selection = "";
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selection = this.getFieldValue("operation");
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
            break;

        case 'NORM':
            this.setOutput(true, "Vector");
            break;

        case 'DOT':
        case 'COMP':
        case 'DIFF_ANGLE':
            this.appendValueInput('vector2');
            this.setOutput(true, "Number");
            break;

        case 'CROSS':
        case 'PROJ':
            this.appendValueInput('vector2');
            this.setOutput(true, "Vector");
            break;

    }
  }
};