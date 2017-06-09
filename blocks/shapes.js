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

    var valueConnections = [];
    while (clauseBlock){
        try{
            this.hasXml[clauseBlock.type] = true;
            this.elementCount_++;
            valueConnections.push([clauseBlock.type.toUpperCase(), clauseBlock.valueConnection_]);
        }catch(err){
            console.log("error in Shape compose");
        }

        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();      
    }

    this.updateShape_();

    for(var i = 0; i <= this.elementCount_ - 1; i++){
        Blockly.Mutator.reconnect(valueConnections[i][1], 
                                  this, 
                                  valueConnections[i][0]);
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
        clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
       
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
                this.appendValueInput(this.inputs[has].inputName)
                    .setCheck(this.inputs[has].check)
                    .appendField(this.inputs[has].field);
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
            }   
        }
        
    }
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

var boxInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 size: {inputName: 'SIZE', check: 'Vector', field: 'size'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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

var sphereInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 radius: {inputName: 'RADIUS', check: 'Number', field: 'radius'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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

var arrowInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 length: {inputName: 'LENGTH', check: 'Number', field: 'length'},
                 shaftwidth: {inputName: 'SHAFTWIDTH', check: 'Number', field: 'shaft width'},
                 headwidth: {inputName: 'HEADWIDTH', check: 'Number', field: 'head width'},
                 headlength: {inputName: 'HEADLENGTH', check: 'Number', field: 'head length'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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

var cylinderInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 radius: {inputName: 'RADIUS', check: 'Number', field: 'radius'},
                 length: {inputName: 'LENGTH', check: 'Number', field: 'length'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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

var ringInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 radius: {inputName: 'RADIUS', check: 'Number', field: 'radius'},
                 length: {inputName: 'LENGTH', check: 'Number', field: 'length'},
                 thickness: {inputName: 'THICKNESS', check: 'Number', field: 'thickness'},
                 size: {inputName: 'SIZE', check: 'Vector', field: 'size'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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

var helixInputs = {pos:{inputName: 'POS', check: 'Vector', field: 'pos'},
                 axis: {inputName: 'AXIS', check: 'Vector', field: 'axis'},
                 radius: {inputName: 'RADIUS', check: 'Number', field: 'radius'},
                 length: {inputName: 'LENGTH', check: 'Number', field: 'length'},
                 coils: {inputName: 'COILS', check: 'Number', field: 'coils'},
                 thickness: {inputName: 'THICKNESS', check: 'Number', field: 'thickness'},
                 size: {inputName: 'SIZE', check: 'Vector', field: 'size'},
                 up: {inputName: 'UP', check: 'Vector', field: 'up'},
                 color: {inputName: 'COLOR', check: ["Vector", "Colour"], field: 'color'},
                 texture: {inputName: 'TEXTURE', check: 'Texture', field: 'texture'},
                 opacity: {inputName: 'OPACITY', check: 'Number', field: 'opacity'},
                 make_trail: {inputName: 'MAKE_TRAIL', check: 'Boolean', field: 'make trail'},
                 vel: {inputName: 'VEL', check: 'Vector', field: 'vel'},
                 acc: {inputName: 'ACC', check: 'Vector', field: 'acc'},
                 mass: {inputName: 'MASS', check: 'Number', field: 'mass'},
                 charge: {inputName: 'CHARGE', check: 'Number', field: 'charge'}
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