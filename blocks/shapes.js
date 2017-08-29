'use strict';

goog.provide('Blockly.Blocks.shapes');

goog.require('Blockly.Blocks');


Blockly.Blocks.shapes.HUE = '#FFC107';
Blockly.Blocks.shapes.VARIABLE_HUE = '#FFD54F';


////////////////////////////////////////////////

Blockly.Blocks.shapes.objectDropDown = [["box", "box"], ["sphere", "sphere"],
                      ["arrow", "arrow"], ["vector", "vector"],
                      ["ring", "ring"], ["cylinder", "cylinder"], 
                      ["helix", "helix"]];


///////////////////////////////////////////////////////////////////////////////


//-----------------------3D Objects Blocks Prototype-------------------------//


///////////////////////////////////////////////////////////////////////////////



Blockly.Blocks.Shape = function(info, mutator, inputs, hasXml){

    /**
     *   used for creating new shape in Blockly.Blocks
     */

    this.info = info;
    this.mutatorName = mutator;
    this.inputs = inputs;
    this.hasXml = hasXml;
};

/**
 * Block for Shapes
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.init = function(){

    this.appendDummyInput()
        .appendField(this.info.name);
    this.setInputsInline(false);
    this.hasXml = Object.assign({},this.hasXml);
    this.setOutput(true, this.info.type);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.valueConnections = [];
    this.setMutator(new Blockly.Mutator(this.mutatorName));
    for (var attribute in this.hasXml){
        this.hasXml[attribute] = false
    }

    this.element_count_ = 0;
};

/**
 * Create XML to represent if block is supposed to have inputs 
 * from hasXml List and keeps element count
 * @return {Element} XML storage element.
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.mutationToDom = function(){

    if(!this.elementCount_){
        return null;
    }

    var container = document.createElement('mutation');

    for (var attribute in this.hasXml){
        if (this.hasXml[attribute]){
            container.setAttribute(attribute, 1);
        }
    }
   
    container.setAttribute('element_count', this.elementCount_)

    return container;
};

/**
 * Parse XML to restore the hasXml of Boolean values
 * @param {!Element} xmlElement XML storage element.
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.domToMutation = function(xmlElement){

    for (var attribute in this.hasXml){
        this.hasXml[attribute] = parseInt(xmlElement.getAttribute(attribute), 10) || 0;
    }


    this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
    this.updateShape_();
};

/**
 * Populate the mutator's dialog with this block's components.
 * @param {!Blockly.Workspace} workspace Mutator's workspace.
 * @return {!Blockly.Block} Root block in mutator.
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.decompose = function(workspace){

    var containerBlock = workspace.newBlock('vpython_create_' + this.info.name);
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;


    for (var attribute in this.hasXml){
        if(this.hasXml[attribute]){
            var mutatorBlock = workspace.newBlock(attribute);
            mutatorBlock.initSvg();
            connection.connect(mutatorBlock.previousConnection);
            connection = mutatorBlock.nextConnection;
        }
    }

    return containerBlock;
};

/**
 * Reconfigure this block based on the mutator dialog's components.
 * @param {!Blockly.Block} containerBlock Root block in mutator.
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.compose = function(containerBlock){
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    for (var attribute in this.hasXml){
        this.hasXml[attribute] = false;
    }

    this.elementCount_ = 0;

    this.valueConnections = [];
    while (clauseBlock){
        try{
            this.hasXml[clauseBlock.type] = true;
            if (clauseBlock.type=="make_trail" && clauseBlock.trailValues_) {
              var trailValues = clauseBlock.trailValues_;
            } else {
              this.elementCount_++;
              this.valueConnections.push([clauseBlock.type.toUpperCase(), clauseBlock.valueConnection_]);
            }
        }catch(err){
            console.log("error in Shape compose");
        }

        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();      
    }

    this.updateShape_();
    // Reconnect blocks to value inputs.
    for(var i = 0; i <= this.elementCount_ - 1; i++){
        Blockly.Mutator.reconnect(this.valueConnections[i][1], 
                                  this, 
                                  this.valueConnections[i][0]);
    }
    // Set saved values for field values (trail attributes).
    for (var key in trailValues) {
                this.setFieldValue(trailValues[key],key);
    }
};

/**
 * Store pointers to any connected child blocks.
 * @param {!Blockly.Block} containerBlock Root block in mutator.
 * @this Blockly.Block
 */

Blockly.Blocks.Shape.prototype.saveConnections = function(containerBlock){
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    
    while(clauseBlock){

        var valueInput = this.getInput(this.inputs[clauseBlock.type].inputName);
        if (!(valueInput.connection==null))
          clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;

        if (valueInput.name=="MAKE_TRAIL")
          clauseBlock.trailValues_ = {"TRAIL_VALUE":this.getInput("MAKE_TRAIL").fieldRow[1].value_,
                                      "TRAIL_TYPE":this.getInput("TRAIL_FIELD").fieldRow[1].value_,
                                      "RETAIN_VALUE":this.getInput("RETAIN_INPUT").fieldRow[1].text_,
                                      "INTERVAL_VALUE":this.getInput("INTERVAL_INPUT").fieldRow[1].text_};

        clauseBlock = clauseBlock.nextConnection &&
            clauseBlock.nextConnection.targetBlock(); 
    }
};

/**
 * Modify this block to have the correct number of inputs.
 * @private
 * @this Blockly.Block
 */
 
Blockly.Blocks.Shape.prototype.updateShape_ = function(){
    
    // reset all inputs
    for (var input in this.inputs){

        // special case for make trail 
        if (input === "make_trail"){
            if(this.getInput(this.inputs[input].inputName)){
                this.removeInput(this.inputs[input].inputName);
                this.removeInput("RETAIN_INPUT");
                this.removeInput("TRAIL_FIELD");
                this.removeInput("INTERVAL_INPUT")
            }
        }else{
            if(this.getInput(this.inputs[input].inputName))
                this.removeInput(this.inputs[input].inputName);
        }
    }

    // create inputs based on what is recorded
    for (var has in this.hasXml){
        if(has === "make_trail"){   
            if (this.hasXml[has]){
                this.appendDummyInput(this.inputs[has].inputName)
                    .appendField(this.inputs[has].field)
                    .appendField(new Blockly.FieldDropdown([
                                    ['true','TRUE'],
                                    ['false','FALSE']
                                ]), 'TRAIL_VALUE');
                this.appendDummyInput("TRAIL_FIELD")
                    .appendField("type")
                    .appendField(new Blockly.FieldDropdown([
                                    ['curve','CURVE'],
                                    ['points','POINTS']
                                ]), 'TRAIL_TYPE');
                this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
                this.appendDummyInput("INTERVAL_INPUT")
                .appendField("interval")
                .appendField(new Blockly.FieldTextInput("2"), "INTERVAL_VALUE");
            }
        }else{
            if (this.hasXml[has]){
                this.appendValueInput(this.inputs[has].inputName)
                    .setCheck(this.inputs[has].check)
                    .appendField(this.inputs[has].field);

               if(!this.hasConnection(has.toUpperCase())){

                  if(this.inputs[has].check == "Vector"){
                    var newVect = this.createVector(this.workspace,
                                                    this.inputs[has].default.x,
                                                    this.inputs[has].default.y,
                                                    this.inputs[has].default.z);
                    this.getInput(this.inputs[has].inputName).connection.connect(newVect.outputConnection);
                    //newVect.setShadow(true);
                  }
                  if(this.inputs[has].check == "Number"){
                    var newNumber = this.workspace.newBlock("math_number");
                    newNumber.initSvg();
                    newNumber.render();
                    newNumber.setFieldValue(this.inputs[has].default, 'NUM');
                    this.getInput(this.inputs[has].inputName).connection.connect(newNumber.outputConnection);
                    //newNumber.setShadow(true);
                  }
                  if(has === "color"){
                    var newColour = this.workspace.newBlock('colour_picker');
                    newColour.initSvg();
                    newColour.render();
                    newColour
                    this.getInput(this.inputs[has].inputName).connection.connect(newColour.outputConnection);
                    //newColour.setShadow(true);
                  }
                  if(has === "texture"){
                    var newTexture = this.workspace.newBlock('texture_picker');
                    newTexture.initSvg();
                    newTexture.render();
                    this.getInput(this.inputs[has].inputName).connection.connect(newTexture.outputConnection);
                    //newTexture.setShadow(true);
                  }
                }
            }   
        }
        
    }
};

Blockly.Blocks.Shape.prototype.hasConnection = function(inputName){
  for(var connec of this.valueConnections){
    if(inputName === connec[0] && connec[1] !== undefined)
      return true
  }
  return false
}

Blockly.Blocks.Shape.prototype.createVector = function(workspace, x=0, y=0, z=0){

  var newVect = workspace.newBlock("vector");
  newVect.initSvg();
  newVect.render();

  var mathBlocksX = workspace.newBlock("math_number");
  mathBlocksX.initSvg();
  mathBlocksX.render();
  mathBlocksX.setFieldValue(x, 'NUM');

  var mathBlocksY = workspace.newBlock("math_number");
  mathBlocksY.initSvg();
  mathBlocksY.render();
  mathBlocksY.setFieldValue(y, 'NUM');

  var mathBlocksZ = workspace.newBlock("math_number");
  mathBlocksZ.initSvg();
  mathBlocksZ.render();
  mathBlocksZ.setFieldValue(z, 'NUM');

  newVect.inputList[0].connection.connect(mathBlocksX.outputConnection);
  mathBlocksX.setShadow(true);
  newVect.inputList[1].connection.connect(mathBlocksY.outputConnection);
  mathBlocksY.setShadow(true);
  newVect.inputList[2].connection.connect(mathBlocksZ.outputConnection);
  mathBlocksZ.setShadow(true);
                    
  //newVect.setShadow(true);

  return newVect;
};


///////////////////////////////////////////////////////////////////////////////


//--------------------------3D Objects Definitions---------------------------//


///////////////////////////////////////////////////////////////////////////////


var boxInfo = {name: "box", type: "Box"};

var boxMutator = ['pos','axis', 'size', 'up', 
                  'color', 'texture', 'opacity', 
                  'make_trail', 'vel', 'acc', 
                  'mass', 'charge'];

var boxXml = {pos: 0, axis: 0, size:0, up: 0, 
              color: 0, texture: 0, opacity: 0, 
              make_trail: 0, vel: 0, acc: 0,
              mass: 0, charge: 0};

var boxInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos', default:{x: 0, y: 0, z: 0}},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z: 0}},
                 size: {inputName: 'SIZE', check: 'Vector', field: 'size', default: {x: 1, y: 1, z: 1}},
                 up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                 texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                 };


Blockly.Blocks['vpython_box'] = new Blockly.Blocks.Shape(boxInfo, 
                                                          boxMutator,
                                                          boxInputs,
                                                          boxXml);


var sphereInfo = {name: "sphere", type: "Sphere"};

var sphereMutator = ['pos', 'axis', 'radius', 'up', 
                  'color', 'texture', 'opacity', 
                  'make_trail', 'vel', 'acc', 
                  'mass', 'charge'];

var sphereXml = {pos: 0, axis: 0, radius:0, 
              up: 0, color: 0, texture: 0, opacity: 0, 
              make_trail: 0, vel: 0, acc: 0,
              mass: 0, charge: 0};

var sphereInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos', default: {x: 0, y: 0, z:0}},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z:0}},
                 radius: {inputName: 'RADIUS', check: 'Number', field: 'radius', default: 1},
                 up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                 texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                 };


Blockly.Blocks['vpython_sphere'] = new Blockly.Blocks.Shape(sphereInfo, 
                                                          sphereMutator,
                                                          sphereInputs,
                                                          sphereXml);


var arrowInfo = {name: "arrow", type: "Arrow"};

var arrowMutator = ['pos', 'axis', 'length', 'shaftwidth', 
                  'headwidth', 'headlength', 'up',
                  'color', 'texture', 'opacity', 
                  'make_trail', 'vel', 'acc', 
                  'mass', 'charge'];

var arrowXml = {pos: 0, axis: 0, length:0, shaftwidth:0,
              headwidth:0, headlength:0, up:0,
              color: 0, texture: 0, opacity: 0, 
              make_trail: 0, vel: 0, acc: 0,
              mass: 0, charge: 0};

var arrowInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos', default: {x: 0, y: 0, z:0}},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z:0}},
                 length: {inputName: 'LENGTH', check: 'Number', field: 'length', default: 1},
                 shaftwidth: {inputName: 'SHAFTWIDTH', check: 'Number', field: 'shaft width', default: .1},
                 headwidth: {inputName: 'HEADWIDTH', check: 'Number', field: 'head width', default: .2},
                 headlength: {inputName: 'HEADLENGTH', check: 'Number', field: 'head length', default: .3},
                 up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                 texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                 };


Blockly.Blocks['vpython_arrow'] = new Blockly.Blocks.Shape(arrowInfo, 
                                                          arrowMutator,
                                                          arrowInputs,
                                                          arrowXml);


var cylinderInfo = {name: "cylinder", type: "Cylinder"};

var cylinderMutator = ['pos', 'axis', 'radius', 'length', 
                  'up', 'color', 'texture', 'opacity', 
                  'make_trail', 'vel', 'acc', 
                  'mass', 'charge'];

var cylinderXml = {pos: 0, axis: 0, radius:0, length:0,
              up: 0, color: 0, texture: 0, opacity: 0, 
              make_trail: 0, vel: 0, acc: 0,
              mass: 0, charge: 0};

var cylinderInputs = {
                        pos:{inputName: 'POS', check: 'Vector', field: 'pos', default: {x: 0, y: 0, z:0}},
                        axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z:0}},
                        radius: {inputName: 'RADIUS', check: 'Number', field: 'radius', default: 1},
                        length: {inputName: 'LENGTH', check: 'Number', field: 'length', default: 1},
                        up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                        color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                        texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                        opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                        make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                        vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                        acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                        mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                        charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                     };


Blockly.Blocks['vpython_cylinder'] = new Blockly.Blocks.Shape(cylinderInfo, 
                                                          cylinderMutator,
                                                          cylinderInputs,
                                                          cylinderXml);


var ringInfo = {name: "ring", type: "Ring"};

var ringMutator = ['pos', 'axis', 'radius', 'length', 
                  'thickness', 'size', 'up', 'color',
                  'texture', 'opacity', 'make_trail',
                  'vel', 'acc', 'mass', 'charge'];

var ringXml = {pos: 0, axis: 0, radius:0, length:0,
              thickness:0, size:0, up: 0, color: 0, 
              texture: 0, opacity: 0, make_trail: 0,
              vel: 0, acc: 0, mass: 0, charge: 0};

var ringInputs = {
                  pos: {inputName: 'POS', check: 'Vector', field: 'pos', default: {x: 0, y: 0, z:0}},
                  axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z:0}},
                  radius: {inputName: 'RADIUS', check: 'Number', field: 'radius', default: 1},
                  length: {inputName: 'LENGTH', check: 'Number', field: 'length', default: 1},
                  thickness: {inputName: 'THICKNESS', check: 'Number', field: 'thickness'},
                  size: {inputName: 'SIZE', check: 'Vector', field: 'size', default: {x: 1, y: 1, z: 1}},
                  up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                  color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                  texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                  opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                  make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                  vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                  acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                  mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                  charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                 };


Blockly.Blocks['vpython_ring'] = new Blockly.Blocks.Shape(ringInfo, 
                                                          ringMutator,
                                                          ringInputs,
                                                          ringXml);


var helixInfo = {name: "helix", type: "Helix"};

var helixMutator = ['pos', 'axis', 'radius', 'length', 'coils',
                  'thickness', 'size', 'up', 'color',
                  'texture', 'opacity', 'make_trail',
                  'vel', 'acc', 'mass', 'charge'];

var helixXml = {pos: 0, axis: 0, radius:0, length:0, coils:0,
              thickness:0, size:0, up: 0, color: 0, 
              texture: 0, opacity: 0, make_trail: 0,
              vel: 0, acc: 0, mass: 0, charge: 0};

var helixInputs = {
                    pos:{inputName: 'POS', check: 'Vector', field: 'pos', default: {x: 0, y: 0, z:0}},
                    axis: {inputName: 'AXIS', check: 'Vector', field: 'axis', default: {x: 1, y: 0, z:0}},
                    radius: {inputName: 'RADIUS', check: 'Number', field: 'radius', default: 1},
                    length: {inputName: 'LENGTH', check: 'Number', field: 'length', default: 1},
                    coils: {inputName: 'COILS', check: 'Number', field: 'coils', default: 5},
                    thickness: {inputName: 'THICKNESS', check: 'Number', field: 'thickness', default: 1/20},
                    size: {inputName: 'SIZE', check: 'Vector', field: 'size', default: {x: 1, y: 2, z: 2}},
                    up: {inputName: 'UP', check: 'Vector', field: 'up', default: {x: 0, y: 1, z: 0}},
                    color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color', default: '#ffffff'},
                    texture: {inputName: 'TEXTURE', check: 'String', field: 'texture'},
                    opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity', default: 1},
                    make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                    vel: {inputName: 'VEL', check: 'Vector', field: 'vel', default: {x: 0, y: 0, z: 0}},
                    acc: {inputName: 'ACC', check: 'Vector', field: 'acc', default: {x: 0, y: 0, z: 0}},
                    mass: {inputName: 'MASS', check: 'Number', field: 'mass', default: 0},
                    charge: {inputName: 'CHARGE', check: 'Number', field: 'charge', default: 0}
                 };


Blockly.Blocks['vpython_helix'] = new Blockly.Blocks.Shape(helixInfo, 
                                                          helixMutator,
                                                          helixInputs,
                                                          helixXml);



///////////////////////////////////////////////////////////////////////////////


//-----------------------------Attribute Blocks------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Blocks['vpython_create_box']= {
    init: function(){
        this.appendDummyInput()
            .appendField("box");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_sphere']= {
    init: function(){
        this.appendDummyInput()
            .appendField("sphere");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_cylinder']= {
    init: function(){
        this.appendDummyInput()
            .appendField("cylinder");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_ring']= {
    init: function(){
        this.appendDummyInput()
            .appendField("ring");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_arrow']= {
    init: function(){
        this.appendDummyInput()
            .appendField("arrow");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['vpython_create_helix']= {
    init: function(){
        this.appendDummyInput()
            .appendField("helix");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['pos']= {
    init: function(){
        this.appendDummyInput()
            .appendField("pos");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['axis']= {
    init: function(){
        this.appendDummyInput()
            .appendField("axis");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['length']= {
    init: function(){
        this.appendDummyInput()
            .appendField("length");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['size']= {
    init: function(){
        this.appendDummyInput()
            .appendField("size");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['up']= {
    init: function(){
        this.appendDummyInput()
            .appendField("up");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['color']= {
    init: function(){
        this.appendDummyInput()
            .appendField("color");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['texture']= {
    init: function(){
        this.appendDummyInput()
            .appendField("texture");
        this.setColour(Blockly.Blocks.shapes.HUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['radius'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("radius");
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['opacity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("opacity");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['make_trail'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("make trail");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['shaftwidth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("shaft width");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['headwidth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("head width");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['headlength'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("head length");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['thickness'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("thickness");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coils'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("coils");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['vel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("vel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['acc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("acc");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mass");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['charge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("charge");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};