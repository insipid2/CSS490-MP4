/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Head(spriteTexture) {
    this.kIsHit = false;
    this.kRefWidth = 180;
    this.kRefHeight = 180;
    this.mHead = new SpriteRenderable(spriteTexture);
    this.mHead.setColor([1, 1, 1, 0]);
    this.mHead.setElementPixelPositions(130, 310, 0, 180);
    GameObject.call(this, this.mHead);
    this.setVisibility(true);
}
gEngine.Core.inheritPrototype(Head, GameObject);

Head.prototype.update = function () {
    
    var xform = this.getXform();
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        
//    }
    
    
    GameObject.prototype.update.call(this);
    
    
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


