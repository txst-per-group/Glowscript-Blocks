'use strict';

goog.provide('Blockly.Blocks.shapes');

goog.require('Blockly.Blocks');

var objectDropDown = [["box", "box"], ["sphere", "sphere"],
                      ["cylinder", "cylinder"], ["vector", "vector"]];

var boxDropDown = [["pos", "pos"], ["axis", "axis"],
                   ["length", "length"], ["width", "width"],
                   ["height", "height"], ["up", "up"],
                   ["color","color"]];

var vectorDropDown = [["x", "x"], ["y", "y"],
                      ["z", "z"]];

var cylinderDropDown = [["cylinderTest", "cylinderTest"]];

var sphereDropDown = [["sphereTest", "sphereTest"]];



Blockly.Blocks['set'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Set");
    this.appendDummyInput()
        .appendField("Object Type")
        .appendField(new Blockly.FieldDropdown(objectDropDown), "OBJECT_TYPE")
        .appendField("Attribute")
        .appendField(new Blockly.FieldDropdown(boxDropDown), "ATTRIBUTE");
    this.appendValueInput("OBJECT")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Object");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

  
 
Blockly.Blocks['get'] = {
  init: function() {
    var thisBlock = this;
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown(objectDropDown, function(selection){
            thisBlock.updateShape_(selection);
        }), "OBJECT")

        .appendField(new Blockly.FieldDropdown(boxDropDown), "VALUE");
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.selected = '';
  },

  mutationToDom: function(){
    var container = document.createElement('mutation');
    this.selected = this.getFieldValue('OBJECT');
    container.setAttribute('selected', this.selected);
    return container;
  },

  domToMutation: function(xmlElement){
    this.selected = xmlElement.getAttribute('selected');
    //alert(selected);
    this.updateShape_(this.selected);
  },


  updateShape_: function(selected){

    var input = this.getInput('NAME');
    input.removeField('VALUE');

    switch(selected){

        case 'box':
            input.appendField(new Blockly.FieldDropdown(boxDropDown), "VALUE");
            break;

        case 'vector':
            input.appendField(new Blockly.FieldDropdown(vectorDropDown), "VALUE");
            break;

        case 'cylinder':
            input.appendField(new Blockly.FieldDropdown(cylinderDropDown), "VALUE");
            break;

        case 'sphere': 
            input.appendField(new Blockly.FieldDropdown(sphereDropDown), "VALUE");
            break;

    }
  }
};

Blockly.Blocks['vpython_box'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("Box");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['pos',
                                         'axis',
                                         'length',
                                         'width',
                                         'height',
                                         'up',
                                         'color']));
    this.hasPos = false;
    this.hasAxis= false;
    this.hasLength= false;
    this.hasWidth = false;
    this.hasHeight = false;
    this.hasUp = false;
    this.hasColor = false;
    this.elementCount_ = 0;
    },


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
        if(this.hasWidth){
            container.setAttribute('width', 1);
        }
        if(this.hasHeight){
            container.setAttribute('height',1);
        }
        if(this.hasUp){
            container.setAttribute('up', 1);
        }
        if(this.hasColor){
            container.setAttribute('color', 1);
        }
        container.setAttribute('elementCount', this.elementCount_)
        return container;
    },

    domToMutation: function(xmlElement){

        this.hasPos = parseInt(xmlElement.getAttribute('pos'), 10) || 0;
        this.hasAxis = parseInt(xmlElement.getAttribute('axis'), 10) || 0;
        this.hasLength = parseInt(xmlElement.getAttribute('length'), 10) || 0;
        this.hasWidth = parseInt(xmlElement.getAttribute('width'), 10) || 0;
        this.hasHeight = parseInt(xmlElement.getAttribute('height'), 10) || 0;
        this.hasUp = parseInt(xmlElement.getAttribute('up'), 10) || 0;
        this.hasColor = parseInt(xmlElement.getAttribute('color'), 10) || 0;
        this.elementCount_ = parseInt(xmlElement.getAttribute('elementCount'), 10) || 0;
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
        if(this.hasLength){
            var lengthBlock = workspace.newBlock('length');
            lengthBlock.initSvg();
            connection.connect(lengthBlock.previousConnection);
            connection = lengthBlock.nextConnection;
        }


        if(this.hasWidth){
            var widthBlock = workspace.newBlock('width');
            widthBlock.initSvg();
            connection.connect(widthBlock.previousConnection);
            connection = widthBlock.nextConnection;
        }


        if(this.hasHeight){
            var heightBlock = workspace.newBlock('height');
            heightBlock.initSvg();
            connection.connect(heightBlock.previousConnection);
            connection = heightBlock.nextConnection;
        }

        if(this.hasUp){
            var upBlock = workspace.newBlock('up');
            upBlock.initSvg();
            connection.connect(heightBlock.previousConnection);
            connection = heightBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){

        var clauseBlock = containerBlock.nextConnection.targetBlock();
        
        this.hasPos = false;
        this.hasAxis = false;
        this.hasLength = false;
        this.hasWidth = false;
        this.hasHeight = false;
        this.hasUp = false;
        this.hasColor = false;
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
                case 'width':
                    this.hasWidth = true;
                    this.elementCount_++;
                    valueConnections.push(['width', clauseBlock.valueConnection_]);
                    break;
                case 'height':
                    this.hasHeight = true;
                    this.elementCount_++;
                    valueConnections.push(['height', clauseBlock.valueConnection_]);
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
                case 'length':
                    //alert("saveConnections clauseBlock box_size");
                    var inputLength = this.getInput('LENGTH');
                    clauseBlock.valueConnection_ = inputLength && inputLength.connection.targetConnection;
                    break;
                case 'width':
                    var inputWidth = this.getInput('WIDTH');
                    clauseBlock.valueConnection_ = inputWidth && inputWidth.connection.targetConnection;
                    break;
                case 'height':
                    var inputHeight = this.getInput('HEIGHT');
                    clauseBlock.valueConnection_ = inputHeight && inputHeight.connection.targetConnection;
                    break;
                case 'up':
                    var inputUp = this.getInput('UP');
                    clauseBlock.valueConnection_ = inputUp && inputUp.connection.targetConnection;
                    break;
                case 'color':
                    var inputColor = this.getInput('COLOR');
                    clauseBlock.valueConnection_ = inputColor && inputColor.connection.targetConnection;
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

        if(this.getInput('WIDTH')){
            this.removeInput('WIDTH');
        }
        if(this.getInput('HEIGHT')){
            this.removeInput('HEIGHT');
        }
        if(this.getInput('UP')){
            this.removeInput('UP');
        }
        if(this.getInput('COLOR')){
            this.removeInput('COLOR');
        }

        if(this.hasPos){
            //alert("updateShape_ has pos");
            this.appendValueInput("POS")
                .setCheck("Vector")
                .appendField("Pos");
        }

        if(this.hasAxis){
            this.appendValueInput("AXIS")
                .setCheck("Vector")
                .appendField("Axis");
        }

        if(this.hasLength){
            this.appendValueInput("LENGTH")
                .setCheck("Number")
                .appendField("Length");
        }

        if(this.hasWidth){
            this.appendValueInput("WIDTH")
                .setCheck("Number")
                .appendField("Width");
        }

        if(this.hasHeight){
            this.appendValueInput("HEIGHT")
                .setCheck("Number")
                .appendField("Height");
        }

        if(this.hasUp){
            this.appendValueInput("UP")
                .setCheck("Vector")
                .appendField("Up");
        }

        if(this.hasColor){
            this.appendValueInput("COLOR")
                .setCheck(null)
                .appendField("Color");
        }
    }
};

Blockly.Blocks['vpython_create_box']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Box");
        this.setColour(20);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['pos']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Pos");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['axis']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Axis");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
Blockly.Blocks['length']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Length");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['width']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Width");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['height']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Height");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['up']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Up");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['color']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Color");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


