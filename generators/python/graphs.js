'use strict';

goog.provide('Blockly.Python.graphs');

goog.require('Blockly.Python');

Blockly.Python['create_line'] = function(block) {
  var code = 'g';
  var line_type = block.getFieldValue('LINE_TYPE');
  var line_color = block.getFieldValue('LINE_COLOR');
  var R = hexToR(line_color);
  var G = hexToG(line_color);
  var B = hexToB(line_color);
  code = code + line_type.toLowerCase() + '(color=vector('
  		 + R + '/255, ' + G + '/255, ' + B + '/255))';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['plot'] = function(block) {
  var variable_line = Blockly.Python.variableDB_.getName(block.getFieldValue('LINE'), Blockly.Variables.NAME_TYPE);
  var dropdown_name = block.getFieldValue('NAME');
  var x_value = Blockly.Python.valueToCode(block, 'X_VALUE', Blockly.Python.ORDER_ATOMIC);
  var y_value = Blockly.Python.valueToCode(block, 'Y_VALUE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = variable_line + '.plot(' + x_value + ',' + y_value + ')\n';
  return code;
};