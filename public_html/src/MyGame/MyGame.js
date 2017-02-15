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
    
    this.kMinionSprite = "assets/minion_sprite.png";
    // this.kBackground = "assets/space.png";
    
    // Main - large bottom view
    // Hero - always centered on Hero
    // DyeHit1-3 - for focusing on DyePack collisions
    this.mCameraMain = null;
    this.mCameraHero = null;
    this.mCameraDyeHit1 = null;
    this.mCameraDyeHit2 = null;
    this.mCameraDyeHit2 = null;
    
    this.mBackground = null;
    
    this.mHero - null;
    
    this.DyePack = null;
    this.DyePacks = null;

    this.mMsg = null;

    this.mLineSet = [];
    this.mCurrentLine = null;
    this.mP1 = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    console.log("load 1");
    // gEngine.Textures.loadTexture(this.kBackground);
    console.log("load 2");
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    // gEngine.Textures.unloadTexture(this.kBackground);
};

MyGame.prototype.initialize = function () {
    console.log("init");
    
    
    
    //this.mBackground = new TextureRenderable(this.kBackground);
    
    // Step A: set up the cameras
    this.mCameraMain = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCameraMain.setBackgroundColor([0.9, 0.9, 0.9, 1]);
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
    
    this.DyePacks = new DyePackSet(this.mCameraMain);
    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.setSpeed(0.2);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCameraMain.setupViewProjection();
    //this.mBackground.draw(this.mCameraMain);
    var i, l;
    for (i = 0; i < this.mLineSet.length; i++) {
        l = this.mLineSet[i];
        l.draw(this.mCameraMain);
    }
    this.mMsg.draw(this.mCameraMain);   // only draw status in the main camera
    
    this.DyePacks.draw();
    this.mHero.draw(this.mCameraMain);
    
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
    // current mouse pointer position
    var x = this.mCameraMain.mouseWCX();
    var y = this.mCameraMain.mouseWCY();


    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var heroxform = this.mHero.getXform();
        x = heroxform.getXPos() + heroxform.getWidth() / 2.2;
        y = heroxform.getYPos() + heroxform.getHeight() / 4;
        this.genDyePack(x, y);
    }
    
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
    
    this.mHero.update(x, y);
    
    this.DyePacks.update();
//    // single dye pack handling, delete when dyepackset is working
//    if (this.DyePack !== null) {
//        this.DyePack.update();
//    
//        if (this.DyePack.isVisible()) {
//            if (this.DyePack.getXform().getXPos() > this.mCameraMain.getWCCenter()[0] + this.mCameraMain.getWCWidth() / 2 ||
//                Date.now() - this.DyePack.kTimeCreated > 2000 || 
//                this.DyePack.getSpeed() <= 0) {
//                this.DyePack.setVisibility(false);
//                this.DyePack = null;
//            }
//        }
//    }

    msg += echo;
    this.mMsg.setText(msg);
};

MyGame.prototype.genDyePack = function(x, y) {
    this.DyePack = null;
    
    this.DyePack = new DyePack(this.kMinionSprite);
    this.DyePack.setCurrentFrontDir(vec2.fromValues(1, 0));
    this.DyePack.setSpeed(2.0);
    this.DyePack.getXform().setRotationInDegree(-90);
    this.DyePack.getXform().setPosition(x, y);
    this.DyePacks.addToSet(this.DyePack);
};