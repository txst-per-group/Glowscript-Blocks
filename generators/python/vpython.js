'use strict';

goog.provide('Blockly.Blocks.vpython');

goog.require('Blockly.Blocks');


Blockly.Python['vpython_box'] = function(block) {
  var value_pos = Blockly.Python.valueToCode(block, 'POS', Blockly.Python.ORDER_ATOMIC);
  var value_size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'box(pos=' + value_pos + ', size=' + value_size + ', color=' + value_color + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ADDITION];
};

