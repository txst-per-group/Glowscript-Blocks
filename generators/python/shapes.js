'use strict';

goog.provide('Blockly.Python.shapes');

goog.require('Blockly.Python');


Blockly.Python['vpython_box'] = function(block) {
  
  var code = 'box('; 
  var previousArg = false; 

  if(block.hasPos){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasAxis){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasLength){

    if(previousArg)
        code = code + ', ';

    var value_length = Blockly.Python.valueToCode(block,
                                                'LENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'length=' + value_length;
    previousArg = true;
  }
  if(block.hasWidth){

    if(previousArg)
        code = code + ', ';

    var value_width = Blockly.Python.valueToCode(block,
                                                 'WIDTH',
                                                 Blockly.Python.ORDER_ATOMIC);
    code = code +'width=' + value_width;
    previousArg = true;
  }
  if(block.hasHeight){

    if(previousArg)
        code = code + ', ';

    var value_height = Blockly.Python.valueToCode(block,
                                                  'HEIGHT',
                                                  Blockly.Python.ORDER_ATOMIC);
    code = code +'height=' + value_height;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_height;
    previousArg = true;
  }
  if(block.hasColor){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);
    code = code + 'color=' + value_color
  }
  //var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  //var code = 'Test';
  code = code + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

