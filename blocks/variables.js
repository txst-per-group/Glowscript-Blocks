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
//Blockly.Blocks.variables.HUE = '#7B1FA2';
Blockly.Blocks.variables.HUE = '#9C27B0';


/////////////////////////////////////////////

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME, function(selection){
          thisBlock.setNewType(selection);
        })
        , 'VAR');
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
  },

  setNewType: function(selection){
    //if(selection === "item")
    var variableUses = this.workspace.getVariableUses(selection);
    try{
    var topBlock = {index: null, height: null};
    for(var i = 0; i < variableUses.length; i++){
      // add the first value, then find the highest but only if it is not itself
      if((topBlock.index == null || topBlock.height < variableUses[i].getRelativeToSurfaceXY().y) 
          && (this.id != variableUses[i].id && variableUses[i].type == "variables_set") ){
        topBlock["index"] = i;
        topBlock["height"] = variableUses[i].getRelativeToSurfaceXY().y;
      }

      if(topBlock.index != null){
        // find the type of the child that has a type and set output to that type
        var checkType;
        var children = variableUses[topBlock.index].getChildren();
        if(children.length == 0){
          this.modifyBlock("None");
        }else{
          for(var i = 0; i < children.length; i++){
            try{checkType = children[i].outputConnection.check_[0];}catch(e){}
            if(checkType)
              //this.setOutput(true, checkType);
              this.modifyBlock(checkType);
          }
        }
      }
    }
    }catch(e){}
    
  },

  modifyBlock: function(newType){
    switch(newType){
      case 'Vector':
        this.setColour(Blockly.Blocks.vectors.HUE);
        this.setOutput(true, newType);
        break;
      case 'Number':
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        break;
      case 'String':
        this.setColour(Blockly.Blocks.texts.HUE);
        this.setOutput(true, newType);
        break;
      case 'Boolean':
        this.setColour(Blockly.Blocks.logic.HUE);
        this.setOutput(true, newType);
        break;
      case 'None':
        this.setColour(Blockly.Blocks.variables.HUE);
        this.setOutput(true, null);
        break;
      case 'Sphere':
      case 'Box':
      case 'Arrow':
      case 'Ring':
      case 'Cylinder':
      case 'Helix':
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setOutput(true, newType);
        break;
      default:
        throw "unknown data type";
    }
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

  setNewType: function(selection){
    //if(selection === "item")
    var variableUses = this.workspace.getVariableUses(selection);
    try{
      if(variableUses.length <= 1){
      return;
      }
    }catch(e){}
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};
