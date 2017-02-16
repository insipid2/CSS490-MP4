/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DyePackSet(cam) {
    this.mCameraMain = cam;
    GameObjectSet.call(this);
}

gEngine.Core.inheritPrototype(DyePackSet, GameObjectSet);

DyePackSet.prototype.draw = function () {
    for (var i = 0; i < this.mSet.length; i++) {
        if (this.mSet[i] !== null) {
            this.mSet[i].draw(this.mCameraMain);
        }
    }
};

DyePackSet.prototype.update = function () {
    for (var i = 0; i < this.mSet.length; i++) {
        // update the dye pack
        if (this.mSet[i] !== null) {
            this.mSet[i].update();
    
            // lifetime checks for dye pack
            if (this.mSet[i].isVisible()) {
                if (this.mSet[i].getXform().getXPos() > this.mCameraMain.getWCCenter()[0] + this.mCameraMain.getWCWidth() / 2 ||
                        Date.now() - this.mSet[i].kTimeCreated > this.mSet[i].kLifetimeMax) {
                    this.mSet[i].setVisibility(false);
                    this.mSet[i] = null;
                }
                if (this.mSet[i].getSpeed() <= 0 && !this.mSet[i].kIsHit) {
                    this.mSet[i] = null;
                }
            }
        }
    }
};