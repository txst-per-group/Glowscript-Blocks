/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Object representing a mutator dialog.  A mutator allows the
 * user to change the shape of a block using a nested blocks editor.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Mutator');

goog.require('Blockly.Bubble');
goog.require('Blockly.Icon');
goog.require('Blockly.WorkspaceSvg');
goog.require('goog.Timer');
goog.require('goog.dom');


/**
 * Class for a mutator dialog.
 * @param {!Array.<string>} quarkNames List of names of sub-blocks for flyout.
 * @extends {Blockly.Icon}
 * @constructor
 */
Blockly.Mutator = function(quarkNames) {
  Blockly.Mutator.superClass_.constructor.call(this, null);
  this.quarkNames_ = quarkNames;
};
goog.inherits(Blockly.Mutator, Blockly.Icon);

/**
 * Width of workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceWidth_ = 0;

/**
 * Height of workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceHeight_ = 0;

/**
 * Draw the mutator icon.
 * @param {!Element} group The icon group.
 * @private
 */
Blockly.Mutator.prototype.drawIcon_ = function(group) {
  // Cirlce container.
  Blockly.createSvgElement('circle',
      {'class': 'blocklyIconShape',
      'r': '8.5', 'cx': '8', 'cy': '8'},
       group);

  // Horizontal Cross Bar.
  Blockly.createSvgElement('rect',
      {'class': 'blocklyIconShape',
       'x': '3.75', 'y': '7.4',
       'height': '1', 'width': '8.5'},
       group);
  // Vertical Cross Bar.
  Blockly.createSvgElement('rect',
      {'class': 'blocklyIconShape',
       'x': '7.4', 'y': '3.7',
       'height': '8.5', 'width': '1'},

       group);
};

/**
 * Clicking on the icon toggles if the mutator bubble is visible.
 * Disable if block is uneditable.
 * @param {!Event} e Mouse click event.
 * @private
 * @override
 */
Blockly.Mutator.prototype.iconClick_ = function(e) {
  if (this.block_.isEditable()) {
    Blockly.Icon.prototype.iconClick_.call(this, e);
  }
};

/**
 * Create the editor for the mutator's bubble.
 * @return {!Element} The top-level node of the editor.
 * @private
 */
Blockly.Mutator.prototype.createEditor_ = function() {
  /* Create the editor.  Here's the markup that will be generated:
  <svg>
    [Workspace]
  </svg>
  */
  this.svgDialog_ = Blockly.createSvgElement('svg',
      {'x': Blockly.Bubble.BORDER_WIDTH, 'y': Blockly.Bubble.BORDER_WIDTH},
      null);
  // Convert the list of names into a list of XML objects for the flyout.
  if (this.quarkNames_.length) {
    var quarkXml = goog.dom.createDom('xml');
    for (var i = 0, quarkName; quarkName = this.quarkNames_[i]; i++) {
      quarkXml.appendChild(goog.dom.createDom('block', {'type': quarkName}));
    }
  } else {
    var quarkXml = null;
  }
  var workspaceOptions = {
    languageTree: quarkXml,
    parentWorkspace: this.block_.workspace,
    pathToMedia: this.block_.workspace.options.pathToMedia,
    RTL: this.block_.RTL,
    toolboxPosition: this.block_.RTL ? Blockly.TOOLBOX_AT_RIGHT :
        Blockly.TOOLBOX_AT_LEFT,
    horizontalLayout: false,
    getMetrics: this.getFlyoutMetrics_.bind(this),
    setMetrics: null
  };
  this.workspace_ = new Blockly.WorkspaceSvg(workspaceOptions);
  this.svgDialog_.appendChild(
      this.workspace_.createDom('blocklyMutatorBackground'));
  return this.svgDialog_;
};

/**
 * Add or remove the UI indicating if this icon may be clicked or not.
 */
Blockly.Mutator.prototype.updateEditable = function() {
  if (!this.block_.isInFlyout) {
    if (this.block_.isEditable()) {
      if (this.iconGroup_) {
        Blockly.removeClass_(/** @type {!Element} */ (this.iconGroup_),
                             'blocklyIconGroupReadonly');
      }
    } else {
      // Close any mutator bubble.  Icon is not clickable.
      this.setVisible(false);
      if (this.iconGroup_) {
        Blockly.addClass_(/** @type {!Element} */ (this.iconGroup_),
                          'blocklyIconGroupReadonly');
      }
    }
  }
  // Default behaviour for an icon.
  Blockly.Icon.prototype.updateEditable.call(this);
};

/**
 * Callback function triggered when the bubble has resized.
 * Resize the workspace accordingly.
 * @private
 */
Blockly.Mutator.prototype.resizeBubble_ = function() {
  var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
  var workspaceSize = this.workspace_.getCanvas().getBBox();
  var width;
  if (this.block_.RTL) {
    width = -workspaceSize.x;
  } else {
    width = workspaceSize.width + workspaceSize.x;
  }
  var height = workspaceSize.height + doubleBorderWidth * 3;
  if (this.workspace_.flyout_) {
    var flyoutMetrics = this.workspace_.flyout_.getMetrics_();
    height = Math.max(height, flyoutMetrics.contentHeight + 20);
  }
  width += doubleBorderWidth * 3;
  // Record some layout information for getFlyoutMetrics_.
  this.workspaceWidth_ = width;
  this.workspaceHeight_ = height;
  // Resize the bubble.
  this.bubble_.setBubbleSize(width + doubleBorderWidth,
                             height + doubleBorderWidth);
  this.svgDialog_.setAttribute('width', this.workspaceWidth_);
  this.svgDialog_.setAttribute('height', this.workspaceHeight_);

  if (this.block_.RTL) {
    // Scroll the workspace to always left-align.
    var translation = 'translate(' + this.workspaceWidth_ + ',0)';
    this.workspace_.getCanvas().setAttribute('transform', translation);
  }
  this.workspace_.resize();
};

/**
 * Show or hide the mutator bubble.
 * @param {boolean} visible True if the bubble should be visible.
 */
Blockly.Mutator.prototype.setVisible = function(visible) {
  if (visible == this.isVisible()) {
    // No change.
    return;
  }
  Blockly.Events.fire(
      new Blockly.Events.Ui(this.block_, 'mutatorOpen', !visible, visible));
  if (visible) {
    // Create the bubble.
    this.bubble_ = new Blockly.Bubble(
        /** @type {!Blockly.WorkspaceSvg} */ (this.block_.workspace),
        this.createEditor_(), this.block_.svgPath_, this.iconXY_, null, null);
    // Get the xml of all blocks so they can be added to flyout.
    var tree = this.workspace_.options.languageTree;
    // Get the information for the root block to made in the workspace.
    this.rootBlock_ = this.block_.decompose(this.workspace_);
    // Get all blocks already connect to rootBlock so they can be rendered.
    var blocks = this.rootBlock_.getDescendants();
    if (tree) {
      // Check if this mutator belongs to a shape block
      // If so, remove attribute blocks that have already composed.
      if (this.rootBlock_.type.substr(0,14) == "vpython_create") {
        for (var i = 0, child; child = blocks[i]; i++) {
          for (var j = 0, attrType; attrType = tree.childNodes[j]; j++) {
            if (child.type == attrType.outerHTML.split('"')[1]) {
              tree.removeChild(attrType)
            }
          }
        }
      }
      this.workspace_.flyout_.init(this.workspace_);
      this.workspace_.flyout_.show(tree.childNodes, 1);
    }

    for (var i = 0, child; child = blocks[i]; i++) {
      child.render();
    }
    // The root block should not be dragable or deletable.
    this.rootBlock_.setMovable(false);
    this.rootBlock_.setDeletable(false);
    if (this.workspace_.flyout_) {
      var margin = this.workspace_.flyout_.CORNER_RADIUS * 2;
      var x = this.workspace_.flyout_.width_ + margin;
    } else {
      var margin = 16;
      var x = margin;
    }
    if (this.block_.RTL) {
      x = -x;
    }
    this.rootBlock_.moveBy(x, margin);
    // Save the initial connections, then listen for further changes.
    if (this.block_.saveConnections) {
      var thisMutator = this;
      this.block_.saveConnections(this.rootBlock_);
      this.sourceListener_ = function() {
        thisMutator.block_.saveConnections(thisMutator.rootBlock_);
      };
      this.block_.workspace.addChangeListener(this.sourceListener_);
    }
    this.resizeBubble_();
    // When the mutator's workspace changes, update the source block.
    this.workspace_.addChangeListener(this.workspaceChanged_.bind(this));
    this.updateColour();
  } else {
    // Dispose of the bubble.
    this.svgDialog_ = null;
    this.workspace_.dispose();
    this.workspace_ = null;
    this.rootBlock_ = null;
    this.bubble_.dispose();
    this.bubble_ = null;
    this.workspaceWidth_ = 0;
    this.workspaceHeight_ = 0;
    if (this.sourceListener_) {
      this.block_.workspace.removeChangeListener(this.sourceListener_);
      this.sourceListener_ = null;
    }
  }
};

/**
 * Update the source block when the mutator's blocks are changed.
 * Bump down any block that's too high.
 * Fired whenever a change is made to the mutator's workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceChanged_ = function() {
  if (Blockly.dragMode_ == Blockly.DRAG_NONE) {
    var blocks = this.workspace_.getTopBlocks(false);
    var MARGIN = 20;
    for (var b = 0, block; block = blocks[b]; b++) {
      var blockXY = block.getRelativeToSurfaceXY();
      var blockHW = block.getHeightWidth();
      if (blockXY.y + blockHW.height < MARGIN) {
        // Bump any block that's above the top back inside.
        block.moveBy(0, MARGIN - blockHW.height - blockXY.y);
      }
    }
  }

  // When the mutator's workspace changes, update the source block.
  if (this.rootBlock_.workspace == this.workspace_) {
    Blockly.Events.setGroup(true);
    var block = this.block_;
    var oldMutationDom = block.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    // Switch off rendering while the source block is rebuilt.
    var savedRendered = block.rendered;
    block.rendered = false;
    // Allow the source block to rebuild itself.
    block.compose(this.rootBlock_);
    // Restore rendering and show the changes.
    block.rendered = savedRendered;
    // Mutation may have added some elements that need initalizing.
    block.initSvg();
    var newMutationDom = block.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      Blockly.Events.fire(new Blockly.Events.Change(
          block, 'mutation', null, oldMutation, newMutation));
      // Ensure that any bump is part of this mutation's event group.
      var group = Blockly.Events.getGroup();
      setTimeout(function() {
        Blockly.Events.setGroup(group);
        block.bumpNeighbours_();
        Blockly.Events.setGroup(false);
      }, Blockly.BUMP_DELAY);
    }
    if (block.rendered) {
      block.render();
    }
    // If this mutator menu belongs to a shape block, update flyout in realtime
    if (block.type.substr(0,7) == "vpython") {
      this.workspace_.flyout_.hide();
      var quarkXml = goog.dom.createDom('xml');
      for (var i = 0, quarkName; quarkName = Blockly.Blocks[block.type].mutatorName[i]; i++) {
        quarkXml.appendChild(goog.dom.createDom('block', {'type': quarkName}));
      }
      var blocks = this.workspace_.getTopBlocks(false);
        for (var i = 0; i < blocks.length; i++) {
          blocks.push.apply(blocks, blocks[i].getChildren());
        }
      for (var i = 0, child; child = blocks[i]; i++) {
        for (var j = 0, attrType; attrType = quarkXml.childNodes[j]; j++) {
          if (child.type == attrType.outerHTML.split('"')[1]) {
            quarkXml.removeChild(attrType)
          }
        }
      }
      this.workspace_.flyout_.show(quarkXml.childNodes, 1);
    }
    this.resizeBubble_();
    Blockly.Events.setGroup(false);
  }
};

/**
 * Return an object with all the metrics required to size scrollbars for the
 * mutator flyout.  The following properties are computed:
 * .viewHeight: Height of the visible rectangle,
 * .viewWidth: Width of the visible rectangle,
 * .absoluteTop: Top-edge of view.
 * .absoluteLeft: Left-edge of view.
 * @return {!Object} Contains size and position metrics of mutator dialog's
 *     workspace.
 * @private
 */
Blockly.Mutator.prototype.getFlyoutMetrics_ = function() {
  return {
    viewHeight: this.workspaceHeight_,
    viewWidth: this.workspaceWidth_,
    absoluteTop: 0,
    absoluteLeft: 0
  };
};

/**
 * Dispose of this mutator.
 */
Blockly.Mutator.prototype.dispose = function() {
  this.block_.mutator = null;
  Blockly.Icon.prototype.dispose.call(this);
};

/**
 * Reconnect an block to a mutated input.
 * @param {Blockly.Connection} connectionChild Connection on child block.
 * @param {!Blockly.Block} block Parent block.
 * @param {string} inputName Name of input on parent block.
 * @return {boolean} True iff a reconnection was made, false otherwise.
 */
Blockly.Mutator.reconnect = function(connectionChild, block, inputName) {
  if (!connectionChild || !connectionChild.getSourceBlock().workspace) {
    return false;  // No connection or block has been deleted.
  }
  var connectionParent = block.getInput(inputName).connection;
  var currentParent = connectionChild.targetBlock();
  if ((!currentParent || currentParent == block) &&
      connectionParent.targetConnection != connectionChild) {
    if (connectionParent.isConnected()) {
      // There's already something connected here.  Get rid of it.
      connectionParent.disconnect();
    }
    connectionParent.connect(connectionChild);
    return true;
  }
  return false;
};

// Export symbols that would otherwise be renamed by Closure compiler.
if (!goog.global['Blockly']) {
  goog.global['Blockly'] = {};
}
if (!goog.global['Blockly']['Mutator']) {
  goog.global['Blockly']['Mutator'] = {};
}
goog.global['Blockly']['Mutator']['reconnect'] = Blockly.Mutator.reconnect;
