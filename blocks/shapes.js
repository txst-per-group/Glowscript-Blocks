'use strict';

goog.provide('Blockly.Blocks.shapes');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
//Blockly.Blocks.shapes.HUE = '#C2185B';
Blockly.Blocks.shapes.HUE = '#E91E63';


////////////////////////////////////////////////

var objectDropDown = [["box", "box"], ["sphere", "sphere"],
                      ["arrow", "arrow"], ["vector", "vector"],
                      ["ring", "ring"], ["cylinder", "cylinder"], 
                      ["helix", "helix"]];

var boxDropDown = [["pos", "pos"], ["axis", "axis"],
                   ["size", "size"], ["up", "up"],
                   ["color","color"],["texture", "texture"],
                   ["trail", "trail"],
                   ["retain", "retain"]];

var vectorDropDown = [["all", "all"],["x", "x"], ["y", "y"],
                      ["z", "z"]];

var vectorList = ["pos", "axis", "up", "size"];

var cylinderDropDown = [["pos", "pos"], ["axis", "axis"], 
                      ["radius", "radius"],["length", "length"],
                      ["up", "up"], ["color", "color"], ["texture", "texture"],
                      ["opacity", "opacity"], ["trail", "trail"],
                      ["retain", "retain"]];

var sphereDropDown = [["pos", "pos"], ["axis", "axis"], 
                      ["radius", "radius"], ["up", "up"],
                      ["color", "color"], ["texture", "texture"],
                      ["opacity", "opacity"],
                      ["trail", "trail"], ["retain", "retain"]
                      ];

var arrowDropDown = [["pos", "pos"], ["axis", "axis"], ["length", "length"],
                     ["shaftwidth", "shaftwidth"], ["headwidth", "headwidth"],
                     ["headlength", "headlength"], ["up", "up"], 
                     ["color", "color"], ["texture", "texture"],
                     ["opacity", "opacity"],
                     ["make_trail"], ["retain", "retain"]];

var ringDropDown = [["pos", "pos"], ["axis", "axis"], ["radius", "radius"],
                    ["length", "length"], ["thickness", "thickness"], 
                    ["size", "size"], ["up", "up"], ["color", "color"],
                    ["texture", "texture"],["opacity", "opacity"], ["make_trail", "make_trail"],
                    ["retain", "retain"]];

var helixDropDown = [["pos", "pos"], ["axis", "axis"], ["radius", "radius"],
                    ["length", "length"], ["coils", "coils"],
                    ["thickness", "thickness"], ["size", "size"],
                    ["up", "up"], ["color", "color"], ["texture", "texture"],
                    ["opacity", "opacity"], ["make_trail", "make_trail"],
                    ["retain", "retain"]];



///////////////////////////////////////////////////////////////////////////////


//----------------------------3D Objects Blocks------------------------------//


///////////////////////////////////////////////////////////////////////////////


Blockly.Blocks['vpython_box'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("box");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'size',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis= false;
    this.hasSize= false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_box');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }
        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break;
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    //alert("saveConnections clauseBlock pos");
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'size':
                    //alert("saveConnections clauseBlock box_size");
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
       if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
        	this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            //alert("updateShape_ has pos");
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }

        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck('Texture')
                .appendField("texture");
        }

        if(this.hasOpacity){
        	this.appendValueInput("OPACITY")
        		.setCheck("Number")
        		.appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


Blockly.Blocks['vpython_sphere'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("sphere");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'radius',
                                         'size',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasRadius = false;
    this.hasSize = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasRadius){
            container.setAttribute('radius', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasRadius = parseInt(xmlElement.getAttribute('radius'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_sphere');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasRadius){
            var radiusBlock = workspace.newBlock('radius');
            radiusBlock.initSvg();
            connection.connect(radiusBlock.previousConnection);
            connection = radiusBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasRadius = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'radius':
                    this.hasRadius = true;
                    this.elementCount_++;
                    valueConnections.push(['radius', clauseBlock.valueConnection_]);
                    break; 
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'radius':
                    var inputRadius = this.getInput('RADIUS');
                    clauseBlock.valueConnection_ = inputRadius && inputRadius.connection.targetConnection;
                    break;
                case 'size':
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('RADIUS')){
            this.removeInput('RADIUS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasRadius){
            this.appendValueInput("RADIUS")
                .setCheck("Number")
                .appendField("radius");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }
        
        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck("Texture")
                .appendField("texture");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


Blockly.Blocks['vpython_arrow'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("arrow");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'length',
                                         'shaftwidth',
                                         'headwidth',
                                         'headlength',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasLength = false;
    this.hasShaftWidth = false;
    this.hasHeadWidth = false;
    this.hasHeadLength = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasLength){
            container.setAttribute('length', 1);
        }
        if(this.hasShaftWidth){
            container.setAttribute('shaftwidth', 1);
        }
        if(this.hasHeadWidth){
            container.setAttribute('headwidth', 1);
        }
        if(this.hasHeadLength){
            container.setAttribute('headlength', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasLengths = parseInt(xmlElement.getAttribute('length'), 10) || 0;
        this.hasShaftWidth = parseInt(xmlElement.getAttribute('shaftwidth'), 10) || 0;
        this.hasHeadWidth = parseInt(xmlElement.getAttribute('headwidth'), 10) || 0;
        this.hasHeadLength = parseInt(xmlElement.getAttribute('headlength'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_arrow');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasLength){
            var lengthBlock = workspace.newBlock('length');
            lengthBlock.initSvg();
            connection.connect(lengthBlock.previousConnection);
            connection = lengthBlock.nextConnection;
        }

        if(this.hasShaftWidth){
            var shaftWidthBlock = workspace.newBlock('shaftwidth');
            shaftWidthBlock.initSvg();
            connection.connect(shaftWidthBlock.previousConnection);
            connection = shaftWidthBlock.nextConnection;
        }

        if(this.hasHeadWidth){
            var headWidthBlock = workspace.newBlock('headwidth');
            headWidthBlock.initSvg();
            connection.connect(headWidthBlock.previousConnection);
            connection = headWidthBlock.nextConnection;
        }

        if(this.hasHeadLength){
            var headLengthBlock = workspace.newBlock('headlength');
            headLengthBlock.initSvg();
            connection.connect(headLengthBlock.previousConnection);
            connection = headLengthBlock.nextConnection;
        }
        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasLength = false;
        this.hasShaftWidth = false;
        this.hasHeadWidth = false;
        this.hasHeadLength = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'length':
                    this.hasLength = true;
                    this.elementCount_++;
                    valueConnections.push(['length', clauseBlock.valueConnection_]);
                    break; 
                case 'shaftwidth':
                    this.hasShaftWidth = true;
                    this.elementCount_++;
                    valueConnections.push(['shaftwidth', clauseBlock.valueConnection_]);
                    break; 
                case 'headwidth':
                    this.hasHeadWidth = true;
                    this.elementCount_++;
                    valueConnections.push(['headwidth', clauseBlock.valueConnection_]);
                    break; 
                case 'headlength':
                    this.hasHeadLength = true;
                    this.elementCount_++;
                    valueConnections.push(['headlength', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'length':
                    var inputLength = this.getInput('LENGTH');
                    clauseBlock.valueConnection_ = inputLength && inputLength.connection.targetConnection;
                    break;
                case 'shaftwidth':
                    var inputShaftWidth = this.getInput('SHAFTWIDTH');
                    clauseBlock.valueConnection_ = inputShaftWidth && inputShaftWidth.connection.targetConnection;
                    break;
                case 'headwidth':
                    var inputHeadWidth = this.getInput('HEADWIDTH');
                    clauseBlock.valueConnection_ = inputHeadWidth && inputHeadWidth.connection.targetConnection;
                    break;
                case 'headlength':
                    var inputHeadLength = this.getInput('HEADLENGTH');
                    clauseBlock.valueConnection_ = inputHeadLength && inputHeadLength.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('LENGTH')){
            this.removeInput('LENGTH');
        }
        if(this.getInput('SHAFTWIDTH')){
            this.removeInput('SHAFTWIDTH');
        }
        if(this.getInput('HEADWIDTH')){
            this.removeInput('HEADWIDTH');
        }
        if(this.getInput('HEADLENGTH')){
            this.removeInput('HEADLENGTH');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasLength){
            this.appendValueInput("LENGTH")
                .setCheck("Number")
                .appendField("length");
        }

        if(this.hasShaftWidth){
            this.appendValueInput("SHAFTWIDTH")
                .setCheck("Number")
                .appendField("shaft width");
        }

        if(this.hasHeadWidth){
            this.appendValueInput("HEADWIDTH")
                .setCheck("Number")
                .appendField("head width");
        }

        if(this.hasHeadLength){
            this.appendValueInput("HEADLENGTH")
                .setCheck("Number")
                .appendField("head length");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }

        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck("Texture")
                .appendField("texture");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};

Blockly.Blocks['vpython_cylinder'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("cylinder");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'radius',
                                         'length',
                                         'size',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasRadius = false;
    this.hasLength = false;
    this.hasSize = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasRadius){
            container.setAttribute('radius', 1);
        }
        if(this.hasLength){
            container.setAttribute('length', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasRadius = parseInt(xmlElement.getAttribute('radius'), 10) || 0;
        this.hasLengths = parseInt(xmlElement.getAttribute('length'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_cylinder');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasRadius){
            var radiusBlock = workspace.newBlock('radius');
            radiusBlock.initSvg();
            connection.connect(radiusBlock.previousConnection);
            connection = radiusBlock.nextConnection;
        }

        if(this.hasLength){
            var lengthBlock = workspace.newBlock('length');
            lengthBlock.initSvg();
            connection.connect(lengthBlock.previousConnection);
            connection = lengthBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasRadius = false;
        this.hasLength = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'radius':
                    this.hasRadius = true;
                    this.elementCount_++;
                    valueConnections.push(['radius', clauseBlock.valueConnection_]);
                    break; 
                case 'length':
                    this.hasLength = true;
                    this.elementCount_++;
                    valueConnections.push(['length', clauseBlock.valueConnection_]);
                    break; 
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'radius':
                    var inputRadius = this.getInput('RADIUS');
                    clauseBlock.valueConnection_ = inputRadius && inputRadius.connection.targetConnection;
                    break;
                case 'length':
                    var inputLength = this.getInput('LENGTH');
                    clauseBlock.valueConnection_ = inputLength && inputLength.connection.targetConnection;
                    break;
                case 'size':
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('RADIUS')){
            this.removeInput('RADIUS');
        }
        if(this.getInput('LENGTH')){
            this.removeInput('LENGTH');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasRadius){
            this.appendValueInput("RADIUS")
                .setCheck("Number")
                .appendField("radius");
        }
        if(this.hasLength){
            this.appendValueInput("LENGTH")
                .setCheck("Number")
                .appendField("length");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }

        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck("Texture")
                .appendField("texture");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


Blockly.Blocks['vpython_ring'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("ring");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'radius',
                                         'length',
                                         'thickness',
                                         'size',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasRadius = false;
    this.hasLength = false;
    this.hasThickness = false;
    this.hasSize = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasRadius){
            container.setAttribute('radius', 1);
        }
        if(this.hasLength){
            container.setAttribute('length', 1);
        }
        if(this.hasThickness){
            container.setAttribute('thickness', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasRadius = parseInt(xmlElement.getAttribute('radius'), 10) || 0;
        this.hasLengths = parseInt(xmlElement.getAttribute('length'), 10) || 0;
        this.hasThickness = parseInt(xmlElement.getAttribute('thickness'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_ring');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasRadius){
            var radiusBlock = workspace.newBlock('radius');
            radiusBlock.initSvg();
            connection.connect(radiusBlock.previousConnection);
            connection = radiusBlock.nextConnection;
        }

        if(this.hasLength){
            var lengthBlock = workspace.newBlock('length');
            lengthBlock.initSvg();
            connection.connect(lengthBlock.previousConnection);
            connection = lengthBlock.nextConnection;
        }

        if(this.hasThickness){
            var thicknessBlock = workspace.newBlock('thickness');
            thicknessBlock.initSvg();
            connection.connect(thicknessBlock.previousConnection);
            connection = thicknessBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasRadius = false;
        this.hasLength = false;
        this.hasThickness = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'radius':
                    this.hasRadius = true;
                    this.elementCount_++;
                    valueConnections.push(['radius', clauseBlock.valueConnection_]);
                    break; 
                case 'length':
                    this.hasLength = true;
                    this.elementCount_++;
                    valueConnections.push(['length', clauseBlock.valueConnection_]);
                    break; 
                case 'thickness':
                    this.hasThickness = true;
                    this.elementCount_++;
                    valueConnections.push(['thickness', clauseBlock.valueConnection_]);
                    break; 
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'radius':
                    var inputRadius = this.getInput('RADIUS');
                    clauseBlock.valueConnection_ = inputRadius && inputRadius.connection.targetConnection;
                    break;
                case 'length':
                    var inputLength = this.getInput('LENGTH');
                    clauseBlock.valueConnection_ = inputLength && inputLength.connection.targetConnection;
                    break;
                case 'thickness':
                    var inputThickness = this.getInput('THICKNESS');
                    clauseBlock.valueConnection_ = inputThickness && inputThickness.connection.targetConnection;
                    break;
                case 'size':
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                    break;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('RADIUS')){
            this.removeInput('RADIUS');
        }
        if(this.getInput('LENGTH')){
            this.removeInput('LENGTH');
        }
        if(this.getInput('THICKNESS')){
            this.removeInput('THICKNESS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasRadius){
            this.appendValueInput("RADIUS")
                .setCheck("Number")
                .appendField("radius");
        }

        if(this.hasLength){
            this.appendValueInput("LENGTH")
                .setCheck("Number")
                .appendField("length");
        }

        if(this.hasThickness){
            this.appendValueInput("THICKNESS")
                .setCheck("Number")
                .appendField("thickness");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }

        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck("Texture")
                .appendField("texture");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};


Blockly.Blocks['vpython_helix'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("helix");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'radius',
                                         'length',
                                         'coils',
                                         'thickness',
                                         'size',
                                         'up',
                                         'color',
                                         'texture',
                                         'opacity',
                                         'make_trail']));
    this.hasPos = false;
    this.hasAxis = false;
    this.hasRadius = false;
    this.hasLength = false;
    this.hasCoils = false;
    this.hasThickness = false;
    this.hasSize = false;
    this.hasUp = false;
    this.hasColor = false;
    this.hasTexture = false;
    this.hasOpacity = false;
    this.hasTrail = false;
    this.elementCount_ = 0;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    mutationToDom: function(){
        if(!this.elementCount_){
            return null;
        }
        var container = document.createElement('mutation');

        if(this.hasPos){
            container.setAttribute('pos', 1);
        }
        if(this.hasAxis){
            container.setAttribute('axis', 1);
        }
        if(this.hasRadius){
            container.setAttribute('radius', 1);
        }
        if(this.hasLength){
            container.setAttribute('length', 1);
        }
        if(this.hasCoils){
            container.setAttribute('coils', 1);
        }
        if(this.hasThickness){
            container.setAttribute('thickness', 1);
        }
        if(this.hasSize){
            container.setAttribute('size', 1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        if(this.hasTexture){
            container.setAttribute('texture', 1);
        }
        if(this.hasOpacity){
            container.setAttribute('opacity', 1);
        }
        if(this.hasTrail){
            container.setAttribute('make_trail', 1);
        }
        container.setAttribute('element_count', this.elementCount_)
        return container;
    },

    // xml values for names must be lowercased (for some reason)
    // do not camel case when setting or reading values from
    // xml element or writing to container

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasRadius = parseInt(xmlElement.getAttribute('radius'), 10) || 0;
        this.hasLengths = parseInt(xmlElement.getAttribute('length'), 10) || 0;
        this.hasCoils = parseInt(xmlElement.getAttribute('coils'), 10) || 0;
        this.hasThickness = parseInt(xmlElement.getAttribute('thickness'), 10) || 0;
        this.hasSize = parseInt(xmlElement.getAttribute('size'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.hasTexture = parseInt(xmlElement.getAttribute('texture'), 10) || 0;
        this.hasOpacity = parseInt(xmlElement.getAttribute('opacity'), 10) || 0;
        this.hasTrail = parseInt(xmlElement.getAttribute('make_trail'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('element_count'), 10) || 0;
        this.updateShape_();

    },
    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_helix');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            
            var posBlock = workspace.newBlock('pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasAxis){
            var axisBlock = workspace.newBlock('axis')
            axisBlock.initSvg();
            connection.connect(axisBlock.previousConnection);
            connection = axisBlock.nextConnection;

        }

        if(this.hasRadius){
            var radiusBlock = workspace.newBlock('radius');
            radiusBlock.initSvg();
            connection.connect(radiusBlock.previousConnection);
            connection = radiusBlock.nextConnection;
        }

        if(this.hasLength){
            var lengthBlock = workspace.newBlock('length');
            lengthBlock.initSvg();
            connection.connect(lengthBlock.previousConnection);
            connection = lengthBlock.nextConnection;
        }

        if(this.hasCoils){
            var coilBlock = workspace.newBlock('coils');
            coilBlock.initSvg();
            connection.connect(coilBlock.previousConnection);
            connection = coilBlock.nextConnection;
        }

        if(this.hasThickness){
            var thicknessBlock = workspace.newBlock('thickness');
            thicknessBlock.initSvg();
            connection.connect(thicknessBlock.previousConnection);
            connection = thicknessBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(upBlock.previousConnection);
            connection = upBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        if(this.hasTexture){
            var textureBlock = workspace.newBlock('texture');
            textureBlock.initSvg();
            connection.connect(textureBlock.previousConnection);
            connection = textureBlock.nextConnection;
        }

        if(this.hasOpacity){
            var opacityBlock = workspace.newBlock('opacity');
            opacityBlock.initSvg();
            connection.connect(opacityBlock.previousConnection);
            connection = opacityBlock.nextConnection;
        }

        if(this.hasTrail){
            var trailBlock = workspace.newBlock('make_trail');
            trailBlock.initSvg();
            connection.connect(trailBlock.previousConnection);
            connection = trailBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasRadius = false;
        this.hasLength = false;
        this.hasCoils = false;
        this.hasThickness = false;
        this.hasSize = false;
        this.hasUp = false;
        this.hasColor = false;
        this.hasTexture = false;
        this.hasOpacity = false;
        this.hasTrail = false;
        this.elementCount_ = 0;
        //alert("compose");
        var valueConnections = [];
        var i = 0;
        while(clauseBlock){


            switch(clauseBlock.type){

                case 'pos':
                    this.hasPos = true;
                    this.elementCount_++;
                    valueConnections.push(['pos', clauseBlock.valueConnection_]);
                    break;
                case 'axis':
                    this.hasAxis = true;
                    this.elementCount_++;
                    valueConnections.push(['axis', clauseBlock.valueConnections_]);
                    break;
                case 'radius':
                    this.hasRadius = true;
                    this.elementCount_++;
                    valueConnections.push(['radius', clauseBlock.valueConnection_]);
                    break; 
                case 'length':
                    this.hasLength = true;
                    this.elementCount_++;
                    valueConnections.push(['length', clauseBlock.valueConnection_]);
                    break; 
                case 'coils':
                    this.hasCoils = true;
                    this.elementCount_++;
                    valueConnections.push(['coils', clauseBlock.valueConnection_]);
                    break; 
                case 'thickness':
                    this.hasThickness = true;
                    this.elementCount_++;
                    valueConnections.push(['thickness', clauseBlock.valueConnection_]);
                    break; 
                case 'size':
                    this.hasSize = true;
                    this.elementCount_++;
                    valueConnections.push(['size', clauseBlock.valueConnection_]);
                    break; 
                case 'up':
                    this.hasUp = true;
                    this.elementCount_++;
                    valueConnections.push(['up', clauseBlock.valueConnection_]);
                    break;
                case 'color':
                    this.hasColor = true;
                    this.elementCount_++;
                    valueConnections.push(['color', clauseBlock.valueConnection_]);
                    break;
                case 'texture':
                    this.hasTexture = true;
                    this.elementCount_++;
                    valueConnections.push(['texture', clauseBlock.valueConnection_]);
                    break;
                case 'opacity':
                    this.hasOpacity = true;
                    this.elementCount_++;
                    valueConnections.push(['opacity', clauseBlock.valueConnection_]);
                    break;
                case 'make_trail':
                    this.hasTrail = true;
                    this.elementCount_++;
                    valueConnections.push(['make_trail', clauseBlock.valueConnection_]);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
            
        }
        
        this.updateShape_();

        // Was unsure of this sections purpose or whether it will be implemented
        // later on so I copied it over
        /*for(var i = 0; i <= this.elementCount_ - 1; i++){
            Blockly.Mutator.reconnect(valueConnections[i][1], 
                                      this, 
                                      valueConnections[i][0]);
        }*/

    },

    saveConnections: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        while(clauseBlock){
           
            switch(clauseBlock.type){
                case 'pos':
                    var inputPos = this.getInput('POS');
                    clauseBlock.valueConnection_ = inputPos && inputPos.connection.targetConnection;
                    break;
                case 'axis':
                    var inputAxis = this.getInput('AXIS');
                    clauseBlock.valueConnection_ = inputAxis && inputAxis.connection.targetConnection;
                    break;
                case 'radius':
                    var inputRadius = this.getInput('RADIUS');
                    clauseBlock.valueConnection_ = inputRadius && inputRadius.connection.targetConnection;
                    break;
                case 'length':
                    var inputLength = this.getInput('LENGTH');
                    clauseBlock.valueConnection_ = inputLength && inputLength.connection.targetConnection;
                    break;
                case 'coils':
                    var inputCoils = this.getInput('COILS');
                    clauseBlock.valueConnection_ = inputCoils && inputCoils.connection.targetConnection;
                    break;
                case 'thickness':
                    var inputThickness = this.getInput('THICKNESS');
                    clauseBlock.valueConnection_ = inputThickness && inputThickness.connection.targetConnection;
                    break;
                case 'size':
                    var inputSize = this.getInput('SIZE');
                    clauseBlock.valueConnection_ = inputSize && inputSize.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
                    break;
                case 'texture':
                    var inputTexture = this.getInput('TEXTURE');
                    clauseBlock.valueConnection_ = inputTexture && inputTexture.connection.targetConnection;
                case 'opacity':
                    var inputOpacity = this.getInput('OPACITY');
                    clauseBlock.valueConnection_ = inputOpacity && inputOpacity.connection.targetConnection;
                    break;
                case 'make_trail':
                    var inputTrail = this.getInput('TRAIL');
                    clauseBlock.valueConnection_ = inputTrail && inputTrail.connection.targetConnection;
                    break;

                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock(); 
        }

        

    },

    updateShape_: function(){
        
        if(this.getInput('POS')){
            this.removeInput('POS');
        }
        if(this.getInput('AXIS')){
            this.removeInput('AXIS');
        }
        if(this.getInput('RADIUS')){
            this.removeInput('RADIUS');
        }
        if(this.getInput('LENGTH')){
            this.removeInput('LENGTH');
        }
        if(this.getInput('COILS')){
            this.removeInput('COILS');
        }
        if(this.getInput('THICKNESS')){
            this.removeInput('THICKNESS');
        }
        if(this.getInput('SIZE')){
            this.removeInput('SIZE');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }
        if(this.getInput('TEXTURE')){
            this.removeInput('TEXTURE');
        }
        if(this.getInput('OPACITY')){
            this.removeInput('OPACITY');
        }
        if(this.getInput('TRAIL')){
            this.removeInput('TRAIL');
            this.removeInput('RETAIN_INPUT');
        }

        if(this.hasPos){
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("axis");
        }

        if(this.hasRadius){
            this.appendValueInput("RADIUS")
                .setCheck("Number")
                .appendField("radius");
        }

        if(this.hasLength){
            this.appendValueInput("LENGTH")
                .setCheck("Number")
                .appendField("length");
        }

        if(this.hasCoils){
            this.appendValueInput("COILS")
                .setCheck("Number")
                .appendField("coils");
        }

        if(this.hasThickness){
            this.appendValueInput("THICKNESS")
                .setCheck("Number")
                .appendField("thickness");
        }

        if(this.hasSize){
            this.appendValueInput("SIZE")
                .setCheck("Vector")
                .appendField("size");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(["Vector", "Colour"])
                .appendField("color");
        }

        if(this.hasTexture){
            this.appendValueInput("TEXTURE")
                .setCheck("Texture")
                .appendField("texture");
        }

        if(this.hasOpacity){
            this.appendValueInput("OPACITY")
                .setCheck("Number")
                .appendField("opacity");
        }
        
        if(this.hasTrail){
            this.appendValueInput("TRAIL")
                .setCheck("Boolean")
                .appendField("make trail");
            this.appendDummyInput("RETAIN_INPUT")
                .appendField("retain")
                .appendField(new Blockly.FieldTextInput("50"), "RETAIN_VALUE");
        }
    }
};



///////////////////////////////////////////////////////////////////////////////


//------------------------Get and Set Blocks---------------------------------//


///////////////////////////////////////////////////////////////////////////////

Blockly.Blocks['set_shape'] = {
  init: function() {
    var thisBlock = this;

    this.setInputsInline(false);

    this.appendDummyInput("SHAPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set shape", "Object")
        .appendField(new Blockly.FieldShapeVariable(
          Blockly.Msg.VARIABLES_DEFAULT_NAME), 'SHAPE_VAR')

    this.appendDummyInput("SHAPE_ATTRIBUTE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(objectSelected){
            thisBlock.updateShape_(objectSelected);
        }), "OBJECT_TYPE")
        .appendField("->", "FIELD_TEXT")
        .appendField(new Blockly.FieldDropdown(boxDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE"); 

    this.appendDummyInput('VECTOR')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("component")
        .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.objectSelected = '';
    this.attSelected = '';
  },


 // xml values for names must be lowercased (for some reason)
 // do not camel case when setting or reading values from
 // xml element or writing to container

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.objectSelected = this.getFieldValue('OBJECT_TYPE');
    this.attSelected = this.getFieldValue('ATTRIBUTE');
    container.setAttribute('object_selected', this.objectSelected);
    container.setAttribute('att_selected', this.attSelected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.objectSelected = xmlElement.getAttribute('object_selected');
    this.attSelected = xmlElement.getAttribute('att_selected');
    //alert(selected);
    this.updateShape_(this.objectSelected);
    this.updateVector_(this.attSelected);
  },


  updateShape_: function(selected){

    var thisBlock = this;
    var input = this.getInput('SHAPE_ATTRIBUTE');
    if(this.getFieldValue('FIELD_TEXT'))
        input.removeField('FIELD_TEXT');
    if(this.getFieldValue('ATTRIBUTE'))
        input.removeField('ATTRIBUTE');
    

    switch(selected){

        case 'box':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(boxDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'vector':
            input.appendField("component", 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(vectorDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(vectorExists)
                this.removeInput('VECTOR');
            break;

        case 'cylinder':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'sphere': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(sphereDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'arrow': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(arrowDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'ring': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(ringDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'helix': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(helixDropDown, function(attSelected){
            thisBlock.updateVector_(attSelected);
        }), "ATTRIBUTE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

    }
    
  },

  updateVector_:  function(attSelection){

    var vectorExists = this.getInput('VECTOR');
    if(vectorList.indexOf(attSelection) >= 0){
        if(!vectorExists){
            this.removeInput('VALUE');

            
            this.appendDummyInput('VECTOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("component")
                .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

            this.appendValueInput("VALUE")
                .setCheck("Vector")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to");


        }
    }else if(vectorExists){
        this.removeInput('VECTOR');
    }
  }   
};

  
 
Blockly.Blocks['get_shape'] = {
  init: function() {
    this.setInputsInline(false);
    var thisBlock = this;

    this.appendDummyInput("SHAPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("get shape", "Object")
        .appendField(new Blockly.FieldShapeVariable(
          Blockly.Msg.VARIABLES_DEFAULT_NAME), 'SHAPE_VAR')

    this.appendDummyInput("SHAPE_ATTRIBUTE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(selection){
            thisBlock.updateShape_(selection);
        }), "OBJECT")
        .appendField('->', 'FIELD_TEXT')
        .appendField(new Blockly.FieldDropdown(boxDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");

    this.appendDummyInput('VECTOR')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("component")
        .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.shapes.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.objectSelected = '';
    this.attSelected = '';
  },


  // xml values for names must be lowercased (for some reason)
  // do not camel case when setting or reading values from
  // xml element or writing to container

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.objectSelected = this.getFieldValue('OBJECT');
    this.attSelected = this.getFieldValue('VALUE');
    container.setAttribute('object_selected', this.objectSelected);
    container.setAttribute('att_selected', this.attSelected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.objectSelected = xmlElement.getAttribute('object_selected');
    this.attSelected = xmlElement.getAttribute('att_selected');
    this.updateShape_(this.objectSelected);
    this.updateVector_(this.attSelected);
  },


  updateShape_: function(selected){

    var input = this.getInput('SHAPE_ATTRIBUTE');
    var thisBlock = this;
    input.removeField('FIELD_TEXT');
    input.removeField('VALUE');

    switch(selected){

        case 'box':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(boxDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'vector':
            input.appendField("component", 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(vectorDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(vectorExists)
                this.removeInput('VECTOR');
            break;

        case 'cylinder':
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'sphere': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(sphereDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'arrow': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(arrowDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'ring': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(ringDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

        case 'helix': 
            input.appendField('->', 'FIELD_TEXT');
            input.appendField(new Blockly.FieldDropdown(helixDropDown, function(selection){
            thisBlock.updateVector_(selection);
        }), "VALUE");
            var vectorExists = this.getInput('VECTOR');
            if(!vectorExists)
                this.updateVector_("pos");
            break;

    }
  },

  updateVector_:  function(attSelection){

    var vectorExists = this.getInput('VECTOR');
    if(vectorList.indexOf(attSelection) >= 0){
        if(!vectorExists){
            

            this.appendDummyInput('VECTOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("component")
                .appendField(new Blockly.FieldDropdown(vectorDropDown), "VECTOR_SELECTION");

        }
    }else if(vectorExists){
        this.removeInput('VECTOR');
    }
  }
};



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