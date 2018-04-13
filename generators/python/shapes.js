"use strict";

goog.provide("Blockly.Python.shapes");

goog.require("Blockly.Python");


///////////////////////////////////////////////////////////////////////////////


//------------------------------Prototype------------------------------------//


///////////////////////////////////////////////////////////////////////////////




Blockly.Python.Shape = function(block) {

  var physics_attributes = {vel: 'vector(0,0,0)', acc: 'vector(0,0,0)', mass: '0', charge: '0'};
  
  var code = block.info.name + "(";
  var previousArg = false;
  //loop through shapes xml to find which attributes
  for (var attribute in block.hasXml) {
    if (block.hasXml[attribute]) {
      //special case for make_trail
      if(attribute === "make_trail") {
        var value = (block.getFieldValue('TRAIL_VALUE') == 'TRUE') ? 'True' : 'False';
        if (previousArg)
          code = code + ", "
        code = code + "make_trail=" + value + 
        ", trail_type='" + block.getFieldValue("TRAIL_TYPE").toLowerCase() + "'" +
        ", retain=" + block.getFieldValue("RETAIN_VALUE") +
        ", interval=" + block.getFieldValue("INTERVAL_VALUE");
      } else {
        var argument = Blockly.Python.valueToCode(block,
                                   attribute.toUpperCase(),
                                   Blockly.Python.ORDER_ATOMIC);
        if (argument.length > 1){
          if (previousArg)
            code = code + ", "
          code = code + attribute + "=" + argument;

          previousArg = true;

        }else if(attribute in physics_attributes){

          if (previousArg)
            code = code + ", "
          code = code + attribute + "=" + physics_attributes[attribute];
          previousArg = true;
        }
      }
    }
  }
  for (var attribute in physics_attributes){
    if(!block.hasXml[attribute]){
      if (previousArg)
        code = code + ", "
      code = code + attribute + "=" + physics_attributes[attribute];

      previousArg = true;

    }
  }
  code = code + ")\n";
  return [code, Blockly.Python.ORDER_ATOMIC];
};


///////////////////////////////////////////////////////////////////////////////


//--------------------------3D Objects Blocks--------------------------------//


///////////////////////////////////////////////////////////////////////////////



Blockly.Python["vpython_helix"] = Blockly.Python.Shape;


Blockly.Python["vpython_arrow"] = Blockly.Python.Shape;


Blockly.Python["vpython_cylinder"] = Blockly.Python.Shape;


Blockly.Python["vpython_ring"] = Blockly.Python.Shape;


Blockly.Python["vpython_sphere"] = Blockly.Python.Shape;


Blockly.Python["vpython_box"] = Blockly.Python.Shape;
