'use strict';

goog.provide('Blockly.Python.vector');

goog.require('Blockly.Python');

Blockly.Python['vector'] = function(block) {
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'vector(' + value_x + ', ' + value_y + ', ' + value_z + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['vector_math'] = function(block) {

    var dropdown_operation = block.getFieldValue('OP');
    var value_vector1 = Blockly.Python.valueToCode(block, 'vector1', Blockly.Python.ORDER_ATOMIC);
  
    switch(dropdown_operation){

        case 'MAG':
            var code = 'mag('+value_vector1 + ')';
            break;
        case 'MAG2':
            var code = 'mag2(' +value_vector1 + ')';
            break;
        case 'NORM':
            var code = 'norm(' +value_vector1 + ')';
            break;
        case 'DOT':
            var value_vector2 = Blockly.Python.valueToCode(block, 
                                                           'vector2', 
                                                           Blockly.
                                                           Python.ORDER_ATOMIC);

            var code = 'dot(' + value_vector1 + ', ' + value_vector2 + ')';
            break;
        case 'CROSS':
            var value_vector2 = Blockly.Python.valueToCode(block, 
                                                           'vector2', 
                                                           Blockly.
                                                           Python.ORDER_ATOMIC);

            var code = 'cross(' + value_vector1 + ', ' + value_vector2 + ')';  
            break;
        case 'COMP':
            var value_vector2 = Blockly.Python.valueToCode(block, 
                                                           'vector2', 
                                                           Blockly.
                                                           Python.ORDER_ATOMIC);

            var code = 'comp(' + value_vector1 + ', ' + value_vector2 + ')';
            break;
        case 'DIFF_ANGLE':
            var value_vector2 = Blockly.Python.valueToCode(block, 
                                                           'vector2', 
                                                           Blockly.
                                                           Python.ORDER_ATOMIC);

            var code = 'diff_angle(' + value_vector1 + ', ' + value_vector2 + ')';
            break;
        case 'PROJ':
            var value_vector2 = Blockly.Python.valueToCode(block, 
                                                           'vector2', 
                                                           Blockly.
                                                           Python.ORDER_ATOMIC);

            var code = 'proj(' + value_vector1 + ', ' + value_vector2 + ')';
            break;

    }
  
  // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};