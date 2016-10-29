/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating Python for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.variables');

goog.require('Blockly.Python');

///////////////////////////////////////////////////////////////////////////////


//------------------------Get and Set Shape Blocks---------------------------//


///////////////////////////////////////////////////////////////////////////////

Blockly.Python['set_shape'] = function(block) {
  var dropdown_object_type = block.getFieldValue('OBJECT_TYPE');
  var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
  var dropdown_vector = block.getFieldValue('VECTOR_SELECTION');
  var selected_shape = block.getFieldValue('SHAPE_VAR'); 
  var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.

  if(dropdown_vector){
    if(dropdown_vector == 'all'){
      var code = selected_shape + '.' + dropdown_attribute + ' = ' + value_value + '\n';
    }
    else{
      var code = selected_shape + '.' + dropdown_attribute + '.' + 
                 dropdown_vector + ' = ' + value_value + '\n';
    }
  }
  else{
    var code = selected_shape + '.' + dropdown_attribute + ' = ' + value_value + '\n';
  }
  
  return code;
};

Blockly.Python['get_shape'] = function(block) {
  var dropdown_object = block.getFieldValue('OBJECT');
  var dropdown_value = block.getFieldValue('VALUE');
  var dropdown_vector = block.getFieldValue('VECTOR_SELECTION');
  var selected_shape = block.getFieldValue('SHAPE_VAR');
  
  // TODO: Assemble Python into code variable.
  if(dropdown_vector){
    if(dropdown_vector == 'all'){
      var code = selected_shape + '.' + dropdown_value;
    }
    else{
      var code = selected_shape + '.' + dropdown_value +
                 '.' + dropdown_vector;
    }
  }
  else{
    var code = selected_shape + '.' + dropdown_value;
  }
  
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// new vpython object code

Blockly.Python['set_attribute'] = function(block) {
  var dropdown_attribute = block.getFieldValue('attribute');
  var value_object = Blockly.Python.valueToCode(block, 'object', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

/////////////////

Blockly.Python['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + '\n';
};
