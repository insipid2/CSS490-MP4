/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(spriteTexture) {
    // timestamp of the creation of this object
    this.kTimeCreated = Date.now();
    // max duration of object in milliseconds
    this.kLifetimeMax = 2000;
    this.kIsHit = false;
    this.kRefWidth = 80;
    this.kRefHeight = 130;
    this.kDelta = 0.5;
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(0, 33);
    this.mDyePack.getXform().setSize(2, 3.25);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);
    this.setVisibility(true);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.update = function () {
    
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.setSpeed(this.getSpeed(this) - 0.1);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.kIsHit = true;
        this.setSpeed(0.0);
    }
    
    if(this.kIsHit === true) {
        var xform = this.mDyePack.getXform();
        xform.setWidth(xform.getWidth() - 0.01);
        xform.setHeight(xform.getHeight() - 0.01);
    }
    GameObject.prototype.update.call(this);
    
    
};