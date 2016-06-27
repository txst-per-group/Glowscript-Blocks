'use strict';

goog.provide('Blockly.Blocks.vpython');

goog.require('Blockly.Blocks');



Blockly.Blocks['vpython_box'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Box");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.itemCount_ = 0;
    this.setHelpUrl('http://www.example.com/');
    this.setMutator(new Blockly.Mutator(['box_pos',
                                         'box_size',
                                         'box_width',
                                         'box_height',
                                         'box_color']));
    this.hasPos = false;
    this.hasSize = false;
    this.hasWidth = false;
    this.hasHeight = false;
    this.hasColor = false;
    },

    decompose: function(workspace){
        var containerBlock = workspace.newBlock('vpython_create_box');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;

        if(this.hasPos){
            var posBlock = workspace.newBlock('box_pos');
            posBlock.initSvg();
            connection.connect(posBlock.previousConnection);
            connection = posBlock.nextConnection;
        }

        if(this.hasSize){
            var sizeBlock = workspace.newBlock('box_size');
            sizeBlock.initSvg();
            connection.connect(sizeBlock.previousConnection);
            connection = sizeBlock.nextConnection;
        }


        if(this.hasWidth){
            var widthBlock = workspace.newBlock('box_width');
            widthBlock.initSvg();
            connection.connect(widthBlock.previousConnection);
            connection = widthBlock.nextConnection;
        }


        if(this.hasHeight){
            var heightBlock = workspace.newBlock('box_height');
            heightBlock.initSvg();
            connection.connect(heightBlock.previousConnection);
            connection = heightBlock.nextConnection;
        }

        if(this.hasColor){
            var colorBlock = workspace.newBlock('box_color');
            colorBlock.initSvg();
            connection.connect(colorBlock.previousConnection);
            connection = colorBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock){
        var clauseBlock = containerBlock.nextConnection.targetBlock();

        this.hasPos = false;
        this.hasSize = false;
        this.hasWidth = false;
        this.hasHeight = false;
        this.hasColor = false;
        var valueConnections = [null];
        while(clauseBlock){
            switch(clouseBlock.type){
                case 'box_pos':
                    this.hasPos = true;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break;
                case 'box_size':
                    this.hasSize = true;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break;
                case 'box_width':
                    this.hasWidth = true;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break;
                case 'box_height':
                    this.hasHeight = true;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break; 
                case 'box_color':
                    this.hasColor = true;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break;

                default:
                    throw "Unknown block type.";

            }
            clauseBlock = clauseBlock.nextConnection && 
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
    },

    updateShape_: function(){
        if(this.)
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

Blockly.Blocks['box_pos']= {
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

Blockly.Blocks['box_size']= {
    init: function(){
        this.appendDummyInput()
            .appendField("Size");
        this.setColour(20);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['box_width']= {
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

Blockly.Blocks['box_height']= {
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

Blockly.Blocks['box_color']= {
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


