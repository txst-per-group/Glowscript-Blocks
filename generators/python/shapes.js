"use strict";

goog.provide("Blockly.Python.shapes");

goog.require("Blockly.Python");


///////////////////////////////////////////////////////////////////////////////


//------------------------------Prototype------------------------------------//


///////////////////////////////////////////////////////////////////////////////




Blockly.Python.Shape = function(block) {
  
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
        if (previousArg)
          code = code + ", "
        code = code + attribute + "=" + 
        Blockly.Python.valueToCode(block,
                                   attribute.toUpperCase(),
                                   Blockly.Python.ORDER_ATOMIC);
        previousArg = true;
        
      }
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
