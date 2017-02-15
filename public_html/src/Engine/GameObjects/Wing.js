/* File: Wing.js 
 *
 * Creates and initializes a Wing object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wing(spriteTexture) {
    this.kDelta = 0.2;
    this.mWing = new SpriteAnimateRenderable(spriteTexture);
    this.mWing.setColor([1, 1, 1, 0]);
    this.mWing.getXform().setPosition(155, 55);
    this.mWing.getXform().setSize(10, 8);
    this.mWing.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,   // widthxheight in pixels
                                    5,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mWing.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mWing.setAnimationSpeed(15);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mWing);
    this.setVisibility(true);
}
gEngine.Core.inheritPrototype(Wing, GameObject);

Wing.prototype.update = function () {
    // remember to update wing's animation
    this.mWing.updateAnimation();

    // move towards the left and wraps
    var xform = this.getXform();
    xform.incXPosBy(-this.kDelta);

    // if fly off to the left, re-appear at the right
    if (xform.getXPos() < 0) {
        xform.setXPos(100);
        xform.setYPos(65 * Math.random());
    }
};