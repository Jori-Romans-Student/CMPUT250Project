/*:
* @plugindesc alt menu
* @author SumRndmDde
* @help
*/

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createStatusWindow();

    this._statusWindow.x = 0;
};
