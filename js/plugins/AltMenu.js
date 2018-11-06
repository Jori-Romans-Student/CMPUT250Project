/*:
* @plugindesc alt menu
* @author Joryms
*
* @param BackgroundPicture
* @desc The menu background
* @default Nota-18675-tom-cruise
*
* @param Window Opacity
* @desc Opacity of the windows
* @default 255
*
* @help
*/

/*(function() {

  var background = String(PluginManager.parameters("AltMenu")['BackgroundPicture'])
  var opacity = Number(PluginManager.parameters("AltMenu")['Window Opacity']);

  var _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
  Scene_MenuBase.prototype.createBackground = function() {
    if(background) {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadPicture(background);
      this.addChild(this._backgroundSprite);
    } else {
      _Scene_MenuBase_createBackground.call(this)
    }
  };

  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this)

    this._commandWindow.x = 0;
    this._commandWindow.y = 0;

    this._statusWindow.x = 0;
    this._statusWindow.y = this._commandWindow.height;

    this._commandWindow.opacity = opacity;
    this._statusWindow.opacity = opacity;

  };
*/

Scene_Menu.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createCommandWindow();
  this.createGoldWindow();
  this.createStatusWindow();
}
