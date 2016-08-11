'use strict';

goog.provide('Blockly.Python.shapes');

goog.require('Blockly.Python');

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////


Blockly.Python['set'] = function(block) {
  var dropdown_object_type = block.getFieldValue('OBJECT_TYPE');
  var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
  var dropdown_vector = block.getFieldValue('VECTOR_SELECTION');

  var value_object = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.

  if(dropdown_vector){
    if(dropdown_vector == 'all'){
      var code = value_object + '.' + dropdown_attribute + ' = ' + value_value + '\n';
    }
    else{
      var code = value_object + '.' + dropdown_attribute + '.' + 
                 dropdown_vector + ' = ' + value_value + '\n';
    }
  }
  else{
    var code = value_object + '.' + dropdown_attribute + ' = ' + value_value + '\n';
  }
  
  return code;
};

Blockly.Python['get'] = function(block) {
  var dropdown_object = block.getFieldValue('OBJECT');
  var dropdown_value = block.getFieldValue('VALUE');
  var dropdown_vector = block.getFieldValue('VECTOR_SELECTION');

  var value_name = Blockly.Python.valueToCode(block, 'OBJECT_TYPE', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  if(dropdown_vector){
    if(dropdown_vector == 'all'){
      var code = value_name + '.' + dropdown_value;
    }
    else{
      var code = value_name + '.' + dropdown_value +
                 '.' + dropdown_vector;
    }
  }
  else{
    var code = value_name + '.' + dropdown_value;
  }
  
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


///////////////////////////////////////////////////////////////////////////////


//--------------------------3D Objects Blocks--------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Python['vpython_helix'] = function(block) {
  
  var code = 'helix('; 
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
  if(block.hasRadius){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
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
  if(block.hasCoils){

    if(previousArg)
        code = code + ', ';

    var value_coils = Blockly.Python.valueToCode(block,
                                                'COILS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'coils=' + value_coils;
    previousArg = true;
  }
  if(block.hasThickness){

    if(previousArg)
        code = code + ', ';

    var value_thickness = Blockly.Python.valueToCode(block,
                                                'THICKNESS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'thickness=' + value_thickness;
    previousArg = true;
  }
  if(block.hasSize){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE");

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }

  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];

};


Blockly.Python['vpython_arrow'] = function(block) {
  
  var code = 'arrow('; 
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
  if(block.hasShaftWidth){

    if(previousArg)
        code = code + ', ';

    var value_shaft_width = Blockly.Python.valueToCode(block,
                                                'SHAFTWIDTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'shaftwidth=' + value_shaft_width;
    previousArg = true;
  }
  if(block.hasHeadWidth){

    if(previousArg)
        code = code + ', ';

    var value_head_width = Blockly.Python.valueToCode(block,
                                                'HEADWIDTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'headwidth=' + value_head_width;
    previousArg = true;
  }
  if(block.hasHeadLength){

    if(previousArg)
        code = code + ', ';

    var value_head_length = Blockly.Python.valueToCode(block,
                                                'HEADLENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'headlength=' + value_head_length;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE");

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }

  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];

};


Blockly.Python['vpython_cylinder'] = function(block) {
  
  var code = 'cylinder('; 
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
  if(block.hasRadius){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
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
  if(block.hasSize){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE");

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }

  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];

};


Blockly.Python['vpython_ring'] = function(block) {
  
  var code = 'ring('; 
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
  if(block.hasRadius){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
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
  if(block.hasThickness){

    if(previousArg)
        code = code + ', ';

    var value_thickness = Blockly.Python.valueToCode(block,
                                                'THICKNESS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'thickness=' + value_thickness;
    previousArg = true;
  }
  if(block.hasSize){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE");

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }

  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];

};


Blockly.Python['vpython_sphere'] = function(block) {
  
  var code = 'sphere('; 
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
  if(block.hasRadius){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
    previousArg = true;
  }
  if(block.hasSize){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasUp){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE");

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }

  code = code + ')\n';
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
  if(block.hasSize){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
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

    code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    previousArg = true;
  }
  if(block.hasOpacity){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasTrail){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'TRAIL',
                                                Blockly.Python.ORDER_ATOMIC);
  var value_retain = block.getFieldValue("RETAIN_VALUE")

  code = code + 'make_trail=' + value_trail + ' ,retain=' + value_retain;
  }
  //var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  //var code = 'Test';
  code = code + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

