/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.variables.HUE = 330;

///////////////////////////////////////////////////////////////////////////////


//------------------------Get and Set Blocks---------------------------------//


///////////////////////////////////////////////////////////////////////////////

Blockly.Blocks['set_shape'] = {
  init: function() {
    var thisBlock = this;

    this.setInputsInline(false);

    this.appendDummyInput("SHAPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set shape", "Object")
        .appendField(new Blockly.FieldShapeVariable(
          Blockly.Msg.VARIABLES_DEFAULT_NAME), 'SHAPE_VAR')

    this.appendDummyInput("SHAPE_ATTRIBUTE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(objectSelected){
            thisBlock.updateShape_(objectSelected);
        }), "OBJECT_TYPE")
        .appendField("->", "FIELD_TEXT")
        .appendField(new Blockly.FieldDropdown(boxDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE"); 

    this.appendDummyInput('VECTOR')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("component")
        .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.objectSelected = '';
    this.attSelected = '';
  },


 // xml values for names must be lowercased (for some reason)
 // do not camel case when setting or reading values from
 // xml element or writing to container

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.objectSelected = this.getFieldValue('OBJECT_TYPE');
    this.attSelected = this.getFieldValue('ATTRIBUTE');
    container.setAttribute('object_selected', this.objectSelected);
    container.setAttribute('att_selected', this.attSelected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.objectSelected = xmlElement.getAttribute('object_selected');
    this.attSelected = xmlElement.getAttribute('att_selected');
    //alert(selected);
    this.updateShape_(this.objectSelected);
    this.updateVector_(this.attSelected);
  },


  updateShape_: function(selected){

    var thisBlock = this;
    var input = this.getInput('SHAPE_ATTRIBUTE');
    if(this.getFieldValue('FIELD_TEXT'))
        input.removeField('FIELD_TEXT');
    if(this.getFieldValue('ATTRIBUTE'))
        input.removeField('ATTRIBUTE');
    

    switch(selected){

        case 'box':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(boxDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'vector':
            input.appendField("component", 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(vectorDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(vectorExists)
                this.removeInput('VECTOR');
            break;

        case 'cylinder':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'sphere': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(sphereDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'arrow': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(arrowDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'ring': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(ringDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'helix': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(helixDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

    }
    
  },

  updateVector_:  function(attSelection){

    var vectorExists = this.getInput('VECTOR');
    if(vectorList.indexOf(attSelection) >= 0){
        if(!vectorExists){
            this.removeInput('VALUE');

            
            this.appendDummyInput('VECTOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("component")
                .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

            this.appendValueInput("VALUE")
                .setCheck("Vector")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to");


        }
    }else if(vectorExists){
        this.removeInput('VECTOR');
    }
  }   
};

  
 
Blockly.Blocks['get_shape'] = {
  init: function() {
    this.setInputsInline(false);
    var thisBlock = this;

    this.appendDummyInput("SHAPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("get shape", "Object")
        .appendField(new Blockly.FieldShapeVariable(
          Blockly.Msg.VARIABLES_DEFAULT_NAME), 'SHAPE_VAR')

    this.appendDummyInput("SHAPE_ATTRIBUTE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(selection){
            thisBlock.updateShape_(selection);
        }), "OBJECT")
        .appendField('->', 'FIELD_TEXT')
        .appendField(new Blockly.FieldDropdown(boxDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");

    this.appendDummyInput('VECTOR')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("component")
        .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.objectSelected = '';
    this.attSelected = '';
  },


  // xml values for names must be lowercased (for some reason)
  // do not camel case when setting or reading values from
  // xml element or writing to container

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.objectSelected = this.getFieldValue('OBJECT');
    this.attSelected = this.getFieldValue('VALUE');
    container.setAttribute('object_selected', this.objectSelected);
    container.setAttribute('att_selected', this.attSelected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.objectSelected = xmlElement.getAttribute('object_selected');
    this.attSelected = xmlElement.getAttribute('att_selected');
    this.updateShape_(this.objectSelected);
    this.updateVector_(this.attSelected);
  },


  updateShape_: function(selected){

    var input = this.getInput('SHAPE_ATTRIBUTE');
    var thisBlock = this;
    input.removeField('FIELD_TEXT');
    input.removeField('VALUE');

    switch(selected){

        case 'box':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(boxDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'vector':
            input.appendField("component", 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(vectorDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(vectorExists)
                this.removeInput('VECTOR');
            break;

        case 'cylinder':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'sphere': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(sphereDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'arrow': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(arrowDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'ring': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(ringDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'helix': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(helixDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

    }
  },

  updateVector_:  function(attSelection){

    var vectorExists = this.getInput('VECTOR');
    if(vectorList.indexOf(attSelection) >= 0){
        if(!vectorExists){
            

            this.appendDummyInput('VECTOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("component")
                .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

        }
    }else if(vectorExists){
        this.removeInput('VECTOR');
    }
  }
};



/////////////////////////////////////////////

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
  },
  contextMenuType_: 'variables_set',
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Blocks['variables_set'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.VARIABLES_SET,
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.variables.HUE,
      "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
      "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
    });
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};
