/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // Main - large bottom view
    // Hero - always centered on Hero
    // DyeHit1-3 - for focusing on DyePack collisions
    this.mCameraMain = null;
    this.mCameraHero = null;
    this.mCameraDyeHit1 = null;
    this.mCameraDyeHit2 = null;
    this.mCameraDyeHit2 = null;

    this.mMsg = null;

    this.mLineSet = [];
    this.mCurrentLine = null;
    this.mP1 = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCameraMain = new Camera(
        vec2.fromValues(30, 27.5), // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraMain.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    
    this.mCameraHero = new Camera(
        vec2.fromValues(30, 27.5), // position of the camera
        100,                       // width of camera
        [0, 600, 200, 200]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraHero.setBackgroundColor([0.8, 0.8, 0.6, 1]);
            
    this.mCameraDyeHit1 = new Camera(
        vec2.fromValues(30, 27.5), // position of the camera
        100,                       // width of camera
        [200, 600, 200, 200]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraDyeHit1.setBackgroundColor([0.8, 0.6, 0.8, 1]);
            
    this.mCameraDyeHit2 = new Camera(
        vec2.fromValues(30, 27.5), // position of the camera
        100,                       // width of camera
        [400, 600, 200, 200]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraDyeHit2.setBackgroundColor([0.6, 0.8, 0.8, 1]);
            
    this.mCameraDyeHit3 = new Camera(
        vec2.fromValues(30, 27.5), // position of the camera
        100,                       // width of camera
        [600, 600, 200, 200]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraDyeHit3.setBackgroundColor([0.6, 0.8, 0.6, 1]);

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(-19, -8);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCameraMain.setupViewProjection();
    var i, l;
    for (i = 0; i < this.mLineSet.length; i++) {
        l = this.mLineSet[i];
        l.draw(this.mCameraMain);
    }
    this.mMsg.draw(this.mCameraMain);   // only draw status in the main camera
    
    this.mCameraHero.setupViewProjection();
    this.mCameraDyeHit1.setupViewProjection();
    this.mCameraDyeHit2.setupViewProjection();
    this.mCameraDyeHit3.setupViewProjection();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg = "Lines: " + this.mLineSet.length + " ";
    var echo = "";
    var x, y;


    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        x = this.mCameraMain.mouseWCX();
        y = this.mCameraMain.mouseWCY();
        echo += "[" + x.toPrecision(2) + " " + y.toPrecision(2) + "]";

        if (this.mCurrentLine === null) { // start a new one
            this.mCurrentLine = new LineRenderable();
            this.mCurrentLine.setFirstVertex(x, y);
            this.mLineSet.push(this.mCurrentLine);
        } else {
            this.mCurrentLine.setSecondVertex(x, y);
        }
    } else {
        this.mCurrentLine = null;
        this.mP1 = null;
    }

    msg += echo;
    this.mMsg.setText(msg);
};