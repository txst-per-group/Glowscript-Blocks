'use strict';

goog.provide('Blockly.Python.shapes');

goog.require('Blockly.Python');

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


Blockly.Python['set'] = function(block) {
  var dropdown_object_type = block.getFieldValue('OBJECT_TYPE');
  var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
  var value_object = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_object + '.' + dropdown_attribute + ' = ' + value_value + '\n';
  return code;
};

Blockly.Python['get'] = function(block) {
  var dropdown_object = block.getFieldValue('OBJECT');
  var dropdown_value = block.getFieldValue('VALUE');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_name + '.' + dropdown_value;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


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

    value_color = value_color.replace('\'', '');
    var R = hexToR(value_color);
    var G = hexToG(value_color);
    var B = hexToB(value_color);

    code = code + 'color=vector(' + R + ',' + G + ',' + B + ')'
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);

  code = code + 'make_trail=' + value_trail;
  }
  //var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  //var code = 'Test';
  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

