'use strict';

goog.provide('Blockly.Python.shapes');

goog.require('Blockly.Python');


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////


//--------------------------3D Objects Blocks--------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Python['vpython_helix'] = function(block) {
  
  var code = 'helix('; 
  var previousArg = false; 

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['radius']){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
    previousArg = true;
  }
  if(block.hasXml['length']){

    if(previousArg)
        code = code + ', ';

    var value_length = Blockly.Python.valueToCode(block,
                                                'LENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'length=' + value_length;
    previousArg = true;
  }
  if(block.hasXml['coils']){

    if(previousArg)
        code = code + ', ';

    var value_coils = Blockly.Python.valueToCode(block,
                                                'COILS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'coils=' + value_coils;
    previousArg = true;
  }
  if(block.hasXml['thickness']){

    if(previousArg)
        code = code + ', ';

    var value_thickness = Blockly.Python.valueToCode(block,
                                                'THICKNESS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'thickness=' + value_thickness;
    previousArg = true;
  }
  if(block.hasXml['size']){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);


    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['length']){

    if(previousArg)
        code = code + ', ';

    var value_length = Blockly.Python.valueToCode(block,
                                                'LENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'length=' + value_length;
    previousArg = true;
  }
  if(block.hasXml['shaftwidth']){

    if(previousArg)
        code = code + ', ';

    var value_shaft_width = Blockly.Python.valueToCode(block,
                                                'SHAFTWIDTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'shaftwidth=' + value_shaft_width;
    previousArg = true;
  }
  if(block.hasXml['headwidth']){

    if(previousArg)
        code = code + ', ';

    var value_head_width = Blockly.Python.valueToCode(block,
                                                'HEADWIDTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'headwidth=' + value_head_width;
    previousArg = true;
  }
  if(block.hasXml['headlength']){

    if(previousArg)
        code = code + ', ';

    var value_head_length = Blockly.Python.valueToCode(block,
                                                'HEADLENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'headlength=' + value_head_length;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);

    

    value_color = value_color.replace('\'', '');

    var isHex  = isHexaColor(cutHex(value_color));

    if(isHex){
  
      var R = hexToR(value_color);
      var G = hexToG(value_color);
      var B = hexToB(value_color);

      code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    }

    else

      code = code + 'color=' + value_color;

    
    previousArg = true;
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['radius']){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
    previousArg = true;
  }
  if(block.hasXml['length']){

    if(previousArg)
        code = code + ', ';

    var value_length = Blockly.Python.valueToCode(block,
                                                'LENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'length=' + value_length;
    previousArg = true;
  }
  if(block.hasXml['size']){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);

    value_color = value_color.replace('\'', '');
    var isHex  = isHexaColor(cutHex(value_color));

    if(isHex){
  
      var R = hexToR(value_color);
      var G = hexToG(value_color);
      var B = hexToB(value_color);

      code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    }

    else

      code = code + 'color=' + value_color;
    
    previousArg = true;
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['radius']){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
    previousArg = true;
  }
  if(block.hasXml['length']){

    if(previousArg)
        code = code + ', ';

    var value_length = Blockly.Python.valueToCode(block,
                                                'LENGTH',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'length=' + value_length;
    previousArg = true;
  }
  if(block.hasXml['thickness']){

    if(previousArg)
        code = code + ', ';

    var value_thickness = Blockly.Python.valueToCode(block,
                                                'THICKNESS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'thickness=' + value_thickness;
    previousArg = true;
  }
  if(block.hasXml['size']){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);

    value_color = value_color.replace('\'', '');
    var isHex  = isHexaColor(cutHex(value_color));

    if(isHex){
  
      var R = hexToR(value_color);
      var G = hexToG(value_color);
      var B = hexToB(value_color);

      code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    }

    else

      code = code + 'color=' + value_color;
    previousArg = true;
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['radius']){

    if(previousArg)
        code = code + ', ';

    var value_radius = Blockly.Python.valueToCode(block,
                                                'RADIUS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'radius=' + value_radius;
    previousArg = true;
  }
  if(block.hasXml['size']){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_up;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);

    value_color = value_color.replace('\'', '');
    var isHex  = isHexaColor(cutHex(value_color));

    if(isHex){
  
      var R = hexToR(value_color);
      var G = hexToG(value_color);
      var B = hexToB(value_color);

      code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    }

    else

      code = code + 'color=' + value_color;
    previousArg = true;
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

  if(block.hasXml['pos']){
    var value_pos = Blockly.Python.valueToCode(block, 
                                               'POS', 
                                               Blockly.Python.ORDER_ATOMIC);
    code = code + 'pos=' + value_pos;
    previousArg = true;
  }
  if(block.hasXml['axis']){

    if(previousArg)
        code = code + ', ';
    
    var value_axis = Blockly.Python.valueToCode(block,
                                                'AXIS',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code +'axis=' + value_axis;
    previousArg = true;
  }
  if(block.hasXml['size']){

    if(previousArg)
        code = code + ', ';

    var value_size = Blockly.Python.valueToCode(block,
                                                'SIZE',
                                                Blockly.Python.ORDER_ATOMIC);
    code = code + 'size=' + value_size;
    previousArg = true;
  }
  if(block.hasXml['up']){

    if(previousArg)
        code = code + ', ';

    var value_up = Blockly.Python.valueToCode(block,
                                              'UP',
                                              Blockly.Python.ORDER_ATOMIC);
    code = code +'up=' + value_height;
    previousArg = true;
  }
  if(block.hasXml['color']){

    if(previousArg)
        code = code + ', ';

    var value_color = Blockly.Python.valueToCode(block,
                                                 'COLOR',
                                                 Blockly.Python.ORDER_ATOMIC);

    value_color = value_color.replace('\'', '');
    var isHex  = isHexaColor(cutHex(value_color));

    if(isHex){
  
      var R = hexToR(value_color);
      var G = hexToG(value_color);
      var B = hexToB(value_color);

      code = code + 'color=vector(' + R + '/255 ,' + G + '/255 ,' + B + '/255)'
    }

    else

      code = code + 'color=' + value_color;
    previousArg = true;
  }
  if(block.hasXml['texture']){

    if(previousArg)
      code = code +', ';

    var value_texture = Blockly.Python.valueToCode(block,
                                                   'TEXTURE',
                                                   Blockly.Python.ORDER_ATOMIC);

    code = code + 'texture=' + value_texture; 
  }
  if(block.hasXml['opacity']){

    if(previousArg)
        code = code + ', ';

    var value_opacity = Blockly.Python.valueToCode(block,
                                                  'OPACITY',
                                                  Blockly.Python.ORDER_ATOMIC);

    code = code + 'opacity=' + value_opacity;
    previousArg = true;
  }
  
  if(block.hasXml['make_trail']){

    if(previousArg)
      code = code + ', ';
  


  var value_trail = Blockly.Python.valueToCode(block,
                                                'MAKE_TRAIL',
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

