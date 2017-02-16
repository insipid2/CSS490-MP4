/* File: Patrol.js 
 *
 * Support for working with a set of Patrols
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Patrol(cam, spritesheet) {
    
    this.kMinionSprite = spritesheet;
    this.mCameraMain = cam;
    
    this.mHead = new Head(this.kMinionSprite);
    this.mHead.getXform().setPosition(Math.random() * cam.getWCWidth() / 2 + cam.getWCWidth() / 2, Math.random() * cam.getWCHeight() / 2 + cam.getWCHeight() / 4);
    this.mHead.getXform().setSize(7.5, 7.5);
    this.mHead.setCurrentFrontDir(vec2.fromValues(0, 1));
    
    this.mWingTop = new Wing(this.kMinionSprite);
    this.mWingTop.getXform().setPosition(this.mHead.getXform().getXPos() + 10, this.mHead.getXform().getYPos() + 6);
    
    this.mWingBot = new Wing(this.kMinionSprite);
    this.mWingBot.getXform().setPosition(this.mHead.getXform().getXPos() + 10, this.mHead.getXform().getYPos() - 6);
}

Patrol.prototype.init = function () {
    
};

Patrol.prototype.update = function () {
    this.mHead.update();
    this.mWingTop.update();
    this.mWingBot.update();
};

Patrol.prototype.draw = function (aCamera) {
    this.mWingTop.draw(aCamera);
    this.mWingBot.draw(aCamera);
    this.mHead.draw(aCamera);
};
