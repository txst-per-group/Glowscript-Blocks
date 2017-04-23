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


Blockly.Blocks.variables.HUE = '#607D8B';

var boxDropDown = [["box", "box"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                   ["axis", "axis"], ["mass", "mass"], ["charge", "charge"],
                   ["size", "size"], ["up", "up"],
                   ["color","color"],["texture", "texture"],
                   ["trail", "trail"],
                   ["retain", "retain"]];

var vectorDropDown = [["all", "all"],["x", "x"], ["y", "y"],
                      ["z", "z"]];

var vectorList = ["pos", "vel", "acc", "axis", "up", "size", "all"];
var numberList = ["radius", "mass", "charge", "opacity", "retain", "shaftwidth", 
                  "headwidth", "headlength", "thickness", "x", "y", "z"];

var cylinderDropDown = [["cylinder", "cylinder"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                      ["axis", "axis"], ["mass", "mass"], ["charge", "charge"], 
                      ["radius", "radius"],["length", "length"],
                      ["up", "up"], ["color", "color"], ["texture", "texture"],
                      ["opacity", "opacity"], ["trail", "trail"],
                      ["retain", "retain"]];

var sphereDropDown = [["sphere", "sphere"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                      ["axis", "axis"], ["mass", "mass"], ["charge", "charge"], 
                      ["radius", "radius"], ["up", "up"],
                      ["color", "color"], ["texture", "texture"],
                      ["opacity", "opacity"],
                      ["trail", "trail"], ["retain", "retain"]
                      ];

var arrowDropDown = [["arrow", "arrow"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                     ["axis", "axis"], ["mass", "mass"], ["charge", "charge"], ["length", "length"],
                     ["shaftwidth", "shaftwidth"], ["headwidth", "headwidth"],
                     ["headlength", "headlength"], ["up", "up"], 
                     ["color", "color"], ["texture", "texture"],
                     ["opacity", "opacity"],
                     ["make_trail"], ["retain", "retain"]];

var ringDropDown = [["ring", "ring"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                    ["axis", "axis"], ["mass", "mass"], ["charge", "charge"], ["radius", "radius"],
                    ["length", "length"], ["thickness", "thickness"], 
                    ["size", "size"], ["up", "up"], ["color", "color"],
                    ["texture", "texture"],["opacity", "opacity"], ["make_trail", "make_trail"],
                    ["retain", "retain"]];

var helixDropDown = [["helix", "helix"],["pos", "pos"], ["vel", "vel"], ["acc", "acc"],
                    ["axis", "axis"], ["mass", "mass"], ["charge", "charge"], ["radius", "radius"],
                    ["length", "length"], ["coils", "coils"],
                    ["thickness", "thickness"], ["size", "size"],
                    ["up", "up"], ["color", "color"], ["texture", "texture"],
                    ["opacity", "opacity"], ["make_trail", "make_trail"],
                    ["retain", "retain"]];

var shapeDropDowns = {};

shapeDropDowns["Box"] = boxDropDown;
shapeDropDowns["Cylinder"] = cylinderDropDown;
shapeDropDowns["Sphere"] = sphereDropDown;
shapeDropDowns["Arrow"] = arrowDropDown;
shapeDropDowns["Ring"] = ringDropDown;
shapeDropDowns["Helix"] = helixDropDown;
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
    this.appendDummyInput("FieldVariable")
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME, function(selection){
          thisBlock.setNewType(selection);
        })
        , 'VAR');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    this.selectedType = null;
    this.attribute = 'none';
    this.component = 'none';
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    // record current output type
    
    var attributeInput = this.getInput("Attribute");
    if(attributeInput){
      container.setAttribute('attribute_', 
                              attributeInput.fieldRow[0].name == "attributeDropdown" ? 
                              attributeInput.fieldRow[0].getText() : 'none');
    }else{
      container.setAttribute('attribute_', 'none');
    }

    if(this.selectedType == null){
      container.setAttribute('type_', 'None');
    }else{
      container.setAttribute('type_', this.selectedType);
    }
    container.setAttribute('component_', this.component);

    return container;
  },

  domToMutation: function(xmlElement){
    //this.vecPos = xmlElement.getAttribute('vector_pos');
    //this.updateDropDown(this.vecPos);
    this.selectedType = xmlElement.getAttribute('type_');
    this.selectedType = this.selectedType ? this.selectedType : 'None';
    this.attribute = xmlElement.getAttribute('attribute_');
    this.component = xmlElement.getAttribute('component_');
    console.log(xmlElement.getAttribute('type_'));
    this.modifyBlock(this.selectedType, this.attribute, this.component);
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

  onchange: function(){
    this.setNewType(this.getInput("FieldVariable").fieldRow[0].value_);
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
            if(checkType != this.selectedType){
              this.selectedType = checkType;
              this.modifyBlock(checkType);
            }
          }
        }
      }
    }
    }catch(e){}
    
  },

  modifyBlock: function(newType = 'None', attribute = 'none', component = 'none'){
    //**
    /* @method modifyBlock
    *  @param {string} newType
    */
    //this.attribute = attribute;
    //this.component = component;
    var att = this.getInput("Attribute");
    if(att){
      this.removeInput('Attribute');
    }

    switch(newType){
      case 'Vector':
        this.setColour(Blockly.Blocks.vectors.HUE);
        this.setOutput(true, newType);
        this.addComponent(attribute, component);
        break;
      case 'Number':
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        this.setOutput(true, newType);
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
        this.addAttribute(newType, attribute, component);
        //this.addAttribute(newType); function call when implemented
        break;
      default:
        throw "unknown data type";
    }
  },

  addAttribute: function(type , attribute = 'none', component = 'none'){
    /**
    @method addAttribute
    @param {string} type - Object type. no default
    @param {string} attribute - selection for attribute. default 'none'
    @param {string} component - selection for attribute. default 'none'
    @author Cody Blakeney <cjb92@txstate.edu>
    */

    if(type === undefined){
      throw "please provide type to addAttribute()";
    }

    var thisBlock = this;

    this.appendDummyInput("Attribute")
        .appendField(new Blockly.FieldDropdown(shapeDropDowns[type], function(attribute){
          this.attribute = attribute;
          // if selection is shape
          if(attribute === shapeDropDowns[type][0][0]){
            thisBlock.setColour(Blockly.Blocks.shapes.HUE);
            thisBlock.setOutput(true, type);
            // if there is a component in Attribute remove it
            if(thisBlock.getInput("Attribute").fieldRow.length > 1){
                thisBlock.getInput("Attribute").removeField("componentDropdown");
            }
            
          // if selected attribute is a vector
          }else if(vectorList.indexOf(attribute) > -1){
          thisBlock.addComponent(attribute, component); 
          // if selected attribute is a number
          }else if(numberList.indexOf(attribute) > -1){
          thisBlock.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
          thisBlock.setOutput(true, "Number");
          // if there is a component in Attribute remove it
          if(thisBlock.getInput("Attribute").fieldRow.length > 1){
            thisBlock.getInput("Attribute").removeField("componentDropdown");
          }
          //else boolean (write me)
          }
        }), "attributeDropdown");

    
    if(attribute !== 'none' && attribute !== shapeDropDowns[type][0][0]){
      //var input = this.getInput("Attribute");
      //var field = input.fieldRow[0];
      //field.setValue(attribute);  
      // these codes are logically equivalent I'm leaving this for now
      // to make clear what it is doing (the uncommented is more efficient)
      this.getInput("Attribute").fieldRow[0].setValue(attribute);
      // if selected attribute is a vector
      if(vectorList.indexOf(attribute) > -1){
        this.addComponent(attribute, component); 
      }else if(numberList.indexOf(attribute) > -1){
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        this.setOutput(true, "Number");
      }
    }else{
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setOutput(true, "Number");
        this.attribute = shapeDropDowns[type][0][0];
    }  
  },

  addComponent: function(attribute = "none", component = "none"){
    var att = this.getInput("Attribute");
    if(attribute === 'none'){
        if(att){
            this.removeInput("Attribute");
        }
            this.appendDummyInput("Attribute");
            att = this.getInput("Attribute");
        
    }
    var thisBlock = this;

    if(att.fieldRow.length <= 1){
        att.appendField(new Blockly.FieldDropdown(vectorDropDown, function(component){
              if(component === 'all'){
                thisBlock.setColour(Blockly.Blocks.vectors.HUE);
                thisBlock.setOutput(true, 'Vector');
              }else{
                //thisBlock.modifyBlock("Number");
                thisBlock.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
                thisBlock.setOutput(true, "Number");
              }
              thisBlock.component = component;
            }), "componentDropdown");
    }

    if(component !== 'none' && component !== 'all'){
        for(var field of this.getInput("Attribute").fieldRow){
            if(field.name === "componentDropdown"){
                field.setValue(component);
            }
        }
        //this.modifyBlock("Number");
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        this.setOutput(true, "Number");
    }else{
        this.component == 'all';
        thisBlock.setColour(Blockly.Blocks.vectors.HUE);
        thisBlock.setOutput(true, 'Vector');
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
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.variables.HUE,
      "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
      "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
    });
    this.currentType = "None";
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    // record current output type
    container.setAttribute('type_', this.currentType);
    return container;
  },

  domToMutation: function(xmlElement){
    //this.vecPos = xmlElement.getAttribute('vector_pos');
    //this.updateDropDown(this.vecPos);
    console.log(xmlElement.getAttribute('type_'));
    this.modifyBlock(xmlElement.getAttribute('type_'));
  },

  onchange: function(){
    this.setNewType(this.getInput("VALUE").fieldRow[1].value_);
  },

  setNewType: function(selection){
    //if(selection === "item")
   var variableUses = this.workspace.getVariableUses(selection);
    try{
    var topBlock = {index: null, height: null};
    for(var i = 0; i < variableUses.length; i++){
      // add the first value, then find the highest but only if it is not itself
      if((topBlock.index == null || topBlock.height < variableUses[i].getRelativeToSurfaceXY().y) 
           && variableUses[i].type == "variables_set") {
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
            if(checkType && this.id != variableUses[topBlock.index].id)
              if(this.currentType != checkType){
                //this.setOutput(true, checkType);
                this.currentType = checkType;
                this.modifyBlock(checkType);
              }
              
          }
        }
      }
    }
    }catch(e){}
    
  },

  modifyBlock: function(newType = 'None', attribute = 'none', component = 'none'){

    //this.attribute = attribute;
    //this.component = component;
    var att = this.getInput("Attribute");
    if(att){
      this.removeInput('Attribute');
    }


    var input = this.getInput("VALUE");
    this.currentType = newType;
    switch(newType){
      case 'Vector':
        this.setColour(Blockly.Blocks.vectors.HUE);
        input.setCheck(newType);
        this.addComponent(attribute, component);
        break;
      case 'Number':
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        input.setCheck(newType);
        break;
      case 'String':
        this.setColour(Blockly.Blocks.texts.HUE);
        input.setCheck(newType);
        break;
      case 'Boolean':
        this.setColour(Blockly.Blocks.logic.HUE);
        input.setCheck(newType);
        break;
      case 'None':
        this.setColour(Blockly.Blocks.variables.HUE);
        input.setCheck(null);
        break;
      case 'Sphere':
      case 'Box':
      case 'Arrow':
      case 'Ring':
      case 'Cylinder':
      case 'Helix':
        this.addAttribute(newType, attribute, component);      
        break;
      default:
        throw "unknown data type";
    }
  },
  addAttribute: function(type , attribute = 'none', component = 'none'){
    /**
    @method addAttribute
    @param {string} type - Object type. no default
    @param {string} attribute - selection for attribute. default 'none'
    @param {string} component - selection for attribute. default 'none'
    @author Cody Blakeney <cjb92@txstate.edu>
    */

    if(type === undefined){
      throw "please provide type to addAttribute()";
    }

    var thisBlock = this;

    this.appendDummyInput("Attribute")
        .appendField(new Blockly.FieldDropdown(shapeDropDowns[type], function(attribute){
          this.attribute = attribute;
          
          if(attribute === shapeDropDowns[type][0][0]){
            thisBlock.setColour(Blockly.Blocks.shapes.HUE);
            thisBlock.getInput("VALUE").setCheck(type);
            if(thisBlock.getInput("Attribute").fieldRow.length > 1){
                thisBlock.getInput("Attribute").removeField("componentDropdown");
            }
            
            // if selected attribute is a vector
          }else if(vectorList.indexOf(attribute) > -1){
          thisBlock.addComponent(attribute, component); //waiting on finishing component method.
          }else if(numberList.indexOf(attribute) > -1){
          //thisBlock.modifyBlock("Number");
          thisBlock.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
          thisBlock.getInput("VALUE").setCheck("Number");
          if(thisBlock.getInput("Attribute").fieldRow.length > 1){
            thisBlock.getInput("Attribute").removeField("componentDropdown");
          }
          }
        }), "attributeDropdown");

    
    if(attribute !== 'none' && attribute !== shapeDropDowns[type][0][0]){
      //var input = this.getInput("Attribute");
      //var field = input.fieldRow[0];
      //field.setValue(attribute);  
      // these codes are logically equivalent I'm leaving this for now
      // to make clear what it is doing (the uncommented is more efficient)
      this.getInput("Attribute").fieldRow[0].setValue(attribute);
    }else{
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.getInput("VALUE").setCheck("Number");
        this.attribute = shapeDropDowns[type][0][0];
    }

    // if selected attribute is a vector
    if(vectorList.indexOf(attribute) > -1){
      this.addComponent(attribute, component); //waiting on finishing component method.
    }else if(numberList.indexOf(attribute) > -1){
      //this.modifyBlock("Number");
      this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
      this.getInput("VALUE").setCheck("Number");
    }
    
  },

  addComponent: function(attribute = "none", component = "none"){
    // gets Attribute dummy input
    var att = this.getInput("Attribute");
    // if there is no selected attribute (it is a vector)
    if(attribute === 'none'){
        // if the Attribute input exists
        if(att){
            this.removeInput("Attribute");
        }
            // make 'clean' input for vector to have only component
            this.appendDummyInput("Attribute");
            att = this.getInput("Attribute");
        
    }
    var thisBlock = this;

    if(att.fieldRow.length <= 1){
        att.appendField(new Blockly.FieldDropdown(vectorDropDown, function(component){
              if(component === 'all'){
                thisBlock.setColour(Blockly.Blocks.vectors.HUE);
                thisBlock.getInput("VALUE").setCheck('Vector');
              }else{
                //thisBlock.modifyBlock("Number");
                thisBlock.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
                thisBlock.getInput("VALUE").setCheck("Number");
              }
              thisBlock.component = component;
            }), "componentDropdown");
    }

    if(component !== 'none' && component !== 'all'){
        for(var field of this.getInput("Attribute").fieldRow){
            if(field.name === "componentDropdown"){
                field.setValue(component);
            }
        }
        //this.modifyBlock("Number");
        this.setColour(Blockly.Blocks.math.ARITHMETICS_HUE);
        this.getInput("VALUE").setCheck("Number");
    }else{
        this.component == 'all';
        thisBlock.setColour(Blockly.Blocks.vectors.HUE);
        thisBlock.getInput("VALUE").setCheck('Vector');
    }
  },

  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};
