/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DyePackSet(cam) {
    this.DyePack = null;
    this.mCameraMain = cam;
    GameObjectSet.call(this);
}

gEngine.Core.inheritPrototype(DyePackSet, GameObjectSet);

DyePackSet.prototype.addToSet = function (obj) {
    this.DyePack = obj;
};

DyePackSet.prototype.draw = function () {
    if (this.DyePack !== null) {
        this.DyePack.draw(this.mCameraMain);
    }
};

DyePackSet.prototype.update = function () {
    if (this.DyePack !== null) {
        this.DyePack.update();
    
        if (this.DyePack.isVisible()) {
            if (this.DyePack.getXform().getXPos() > this.mCameraMain.getWCCenter()[0] + this.mCameraMain.getWCWidth() / 2 ||
                Date.now() - this.DyePack.kTimeCreated > 2000 || 
                this.DyePack.getSpeed() <= 0) {
                this.DyePack.setVisibility(false);
                this.DyePack = null;
            }
        }
    }
};