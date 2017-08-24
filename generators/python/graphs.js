'use strict';

goog.provide('Blockly.Python.graphs');

goog.require('Blockly.Python');

Blockly.Python['series'] = function(block) {
  var code = 'g';
  var type = block.getFieldValue('TYPE');
  var color = Blockly.Python.valueToCode(block, 'COLOR',
      Blockly.Python.ORDER_NONE) || '\'\'';
  code = code + type.toLowerCase() + '(color='
  		 + color + ')';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['plot'] = function(block) {
  var variable_line = Blockly.Python.variableDB_.getName(block.getFieldValue('LINE'), Blockly.Variables.NAME_TYPE);
  var dropdown_name = block.getFieldValue('NAME');
  var x_value = Blockly.Python.valueToCode(block, 'X_VALUE', Blockly.Python.ORDER_ATOMIC);
  var y_value = Blockly.Python.valueToCode(block, 'Y_VALUE', Blockly.Python.ORDER_ATOMIC);
  // If variable_line is set to 'none', generate no code to avoid errors.
  if (variable_line === "none")
    return null;
  // Assemble Python into code variable.
  var code = variable_line + '.plot(' + x_value + ',' + y_value + ')\n';
  return code;
};

Blockly.Python['graph_display'] = function(block) {
  var graph_objects = Blockly.Python.statementToCode(block, 'OBJECTS', true);

  var code = 'graph(';
  var previousArg = false;
  // Loop through the display xml to find applicable attributes to add
  for (var attribute in block.hasXml) {
    // If the xml has the attribute, write the code
    if (block.hasXml[attribute]) {
      if (previousArg)
        code = code + ', '
      code = code + attribute + '=' + 
      Blockly.Python.valueToCode(block, attribute.toUpperCase(), Blockly.Python.ORDER_ATOMIC);
      previousArg = true;
    }
  }
  code = code + ')\n';
  // Add the relevant graph_object blocks below the graph display code if they exist
  // Statement to cdoe retruns with indent but is unnecassary so trim() will remove indent
  code = code + graph_objects;
  return [code, Blockly.Python.ORDER_ATOMIC];
};