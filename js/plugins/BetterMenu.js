/*:
 * @plugindesc FITN CM
 * @author TomCruiseSquarePants
 * @help
 */

 (function() {

 var _Scene_Menu_create = Scene_Menu.prototype.create;
 Scene_Menu.prototype.create = function() {
    _Scene_Menu.create.call(this);


	/*
	this._commandWindow
	this._statusWindow
	*/

	this._statusWindow.x = 0;
};
})();