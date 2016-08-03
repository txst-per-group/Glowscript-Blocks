# Vpython Blockly

The purpose of this project is to create a visual programming language for controlling the Vpython/glowscript package.

the layout of this project director is as follows:

/blocks -> javascript files that control the look and behavior of blocks in the web app environment.

/generators -> contains files that contain rules for how code is assembled for each language as well as folders labeled with the language name. inside the /python folder are files that contain generators with file names that match the files in the /blocks folder. These files control how the code is generated for each block.

/demos -> contains a index.html you can use to access all the demo folders. The show examples of how to implement different aspects of the project. the /blockfactory folder will be the most important. This can be used for making simple blocks that do not require a mutator function, or be used for blocks need to make the mutator for a block. 

/tests -> contains the "playground.html" file which will be used to test all the blocks and generators. When creating new blocks this html file will have to be updated to include them in the playground. You will have to load both the block and generator file. You will also have to go to the "toolbar" css section in the bottom of the project. If you are making a new category you will have to add it, if you are adding a new block you will have to add a label for it as well.

---------

# Blockly

Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/images/sample.png)
