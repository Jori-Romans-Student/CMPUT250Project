//=============================================================================
// TimerExpansion.js
// Rafael_Sol_Maker's Timer Expansion MV v1.0
// This work is licensed under a Creative Commons Attribution 4.0 International License.
//=============================================================================

/*:
 * @plugindesc Expands the Game Timer Functions. Initial release (v1.0)
 * @author Rafael_Sol_MAKER (www.condadobraveheart.com)
 *
 * @param timerPosition
 * @desc 1:Top left 2:Top center 3:Top right 4:Bottom left 5:Bottom center 6:Bottom right
 * @default 3
 *
 * @param showSecondsOnly
 * @desc Put 1 if you want to show only seconds instead minutes and seconds. 0, otherwise.
 * @default false
 *
 * @param showFractions
 * @desc Put 1 if you want to show fractions of seconds, 0 otherwise.
 * @default 0
 *
 * @param timerPrefix
 * @desc To put some text before the timer.
 * @default Time remaining: 
 *
 * @param timerSuffix
 * @desc To put some text after the the timer.
 * @default s
 *
 * @param timerSeparator
 * @desc Separator (for minutes and seconds exhibition only).
 * @default :
 *
 * @param secondsToFlash
 * @desc How many seconds before the time starts to flash. Put -1 to no flash at all.
 * @default 30
 *
 * @param flashIntermittency
 * @desc Frequency in frames that the flash will change its color.
 * @default 20
 *
 * @param flashColor1
 * @desc Color 1 for flash (Uses Windowskin color index)
 * @default 17
 *
 * @param flashColor2
 * @desc Color 2 for flash (Uses Windowskin color index)
 * @default 18
 *
 * @help
 * Plugin Command:
 *   Timer add_time n       # Adds n seconds to timer. Negative values allowed.
 *   Timer pause            # Pauses the timer countdown.
 *   Timer resume           # Resumes the timer countdown, if paused.
 *
 * To start and stop functions, use the original event commands.
 *
 * ---------------------------------------------------------------
 *
 * Some new functions that can be useful for scripters were added as well.
 *
 * Scripting Commands:
 *   $gameTimer.addTime(n); # Adds n seconds to timer. Negative values allowed.
 *   $gameTimer.pause();    # Pauses the timer countdown.
 *   $gameTimer.resume();   # Resumes the timer countdown, if paused.
 *   $gameTimer.count();    # Return the total of frames in the countdown.
 *   $gameTimer.isExpired();# If the Timer runs out, returns true. Returns false otherwise.
 *   
 *   $gameSystem.getWindowskinColor(n);  # The names says it all. n is the index, starting at 0.
 *   
 * (Please observe that now $gameTimer.isWorking() is tied with paused state instead stopped,
 * so, it will be equal to true if the Timer is paused.)
 */

/*
#==============================================================================
# ** PARAMETERS, COMMANDS & MISC
#------------------------------------------------------------------------------
#  Let's handle these values first
#==============================================================================
*/
(function() {
  
  // First let's have the parameters
  var parameters = PluginManager.parameters('TimerExpansion');
  var timerPrefix = parameters['timerPrefix'] || '';
  var timerSuffix = parameters['timerSuffix'] || '';
  var timerSeparator = parameters['timerSeparator'] || ':';
  var timerPosition = Number(parameters['timerPosition'] || 3);
  var showFractions = !!Number(parameters['showFractions']);
  var showSecondsOnly = !!Number(parameters['showSecondsOnly']);
  var flashIntermittency = Number(parameters['flashIntermittency'] || 20);
  var secondsToFlash = Number(parameters['secondsToFlash'] || 30);
  var flashColor1 = Number(parameters['flashColor1'] || 17);
  var flashColor2 = Number(parameters['flashColor2'] || 18);
  
  // Dealing with our commands here
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);

      if (command === 'Timer') {
        // Plugin Commands Goes Here
        switch (args[0]) {
        case 'add_time':
            $gameTimer.addTime(Number(args[1]));
            break;
        case 'pause':
            $gameTimer.pause();
            break;
        case 'resume':
            $gameTimer.resume();
            break;
        }
      }
  };

  // We will need this defined, anyway...
  Game_System.prototype.getWindowskinColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var windowskin = ImageManager.loadSystem($gameSystem.windowskinName || 'Window');
    return windowskin.getPixel(px, py);
  }

/*
#==============================================================================
# ** Game_Timer (EXPANSION)
#------------------------------------------------------------------------------
#  Handles timers. Instances of this class are referenced by $gameTimer.
#==============================================================================
*/
  var _Game_Timer_initialize = Game_Timer.prototype.initialize
  Game_Timer.prototype.initialize = function() {
    _Game_Timer_initialize.call(this);
    this._expired = false;
    this._stopped = true;
  };

  var _Game_Timer_start = Game_Timer.prototype.start;
  Game_Timer.prototype.start = function(count) {
      //_Game_Timer_start.call(this);
      _Game_Timer_start.call(this, count);
      this._stopped = false;
  };

  Game_Timer.prototype.pause = function() {
      this._working = false;
  };

  Game_Timer.prototype.resume = function() {
      this._working = true;
  };

  Game_Timer.prototype.count = function() {
      return this._frames;
  };

  var _Game_Timer_stop = Game_Timer.prototype.stop;
  Game_Timer.prototype.stop  = function() {
      _Game_Timer_stop.call(this);
      this._frames = 0;
      this._stopped = true;
  };

  Game_Timer.prototype.addTime = function(secs) {
      console.log(Graphics.frameRate);
      this._frames = this._frames + (secs * 60);
  };

  Game_Timer.prototype.isExpired = function() {
      return this._expired;
  };

  Game_Timer.prototype.stopped = function() {
      return this._stopped;
  };

  var _Game_Timer_onExpire = Game_Timer.prototype.onExpire;
  Game_Timer.prototype.onExpire = function() {
    this._expired = true;
    _Game_Timer_onExpire.call(this);      
  };

/*
#==============================================================================
# ** Sprite_Timer (MODIFICATION)
#------------------------------------------------------------------------------
#  This sprite is for timer displays. It monitors $gameTimer and automatically
# changes sprite states.
#==============================================================================
*/
  var _Sprite_Timer_initialize = Sprite_Timer.prototype.initialize;
  Sprite_Timer.prototype.initialize = function() {
    this._timerPosition = timerPosition;
    this._flashIntermittency = flashIntermittency;
    this._secondsToFlash = secondsToFlash;
    this._flashColor1 = flashColor1;
    this._flashColor2 = flashColor2;
  
    this._prefix = timerPrefix;
    this._suffix = timerSuffix;
    this._separator = timerSeparator;

    this._secondsOnly = showSecondsOnly;
    this._showFractions = showFractions;

    //this._total_sec = 0;
    this.__alt = false;

    _Sprite_Timer_initialize.call(this);
  };

  Sprite_Timer.prototype.updateVisibility = function() {
    this.visible = !$gameTimer.stopped();
  };

  Sprite_Timer.prototype.updateBitmap = function() {
    if ((Graphics.frameCount) % 4 !== 0) {
      return;
    }

    var flash = (Graphics.frameCount % this._flashIntermittency);

    if (($gameTimer.count() <= this._secondsToFlash * 60) && $gameTimer.isWorking()) { // if ($gameTimer.seconds() <= this._secondsToFlash) {
      if (flash == 0) {
        this.__alt = !this.__alt;
        if (this.__alt == true) {
          this.bitmap.textColor = $gameSystem.getWindowskinColor(this._flashColor1);
        }
        else{
          this.bitmap.textColor = $gameSystem.getWindowskinColor(this._flashColor2);
        }
      }
    }
    else{
      this.bitmap.textColor = $gameSystem.getWindowskinColor(0);
    }
    this._seconds = $gameTimer.seconds();
    this.redraw();
  };

  Sprite_Timer.prototype.timerText = function() {
    var min = Math.floor(this._seconds / 60) % 60;
    var sec = this._seconds % 60;
    var fraction = Math.floor($gameTimer.count() % 100);

    if (this._secondsOnly){
      if (this._showFractions){
        return this._prefix + this._seconds + '.' +
               fraction.padZero(2) + this._suffix;
      }
      else{
        return this._prefix + this._seconds + this._suffix;
      }
    }
    else {
      if (this._showFractions){
        return this._prefix + min.padZero(2) + this._separator + sec.padZero(2)
               + '.' + fraction.padZero(2) + this._suffix;
      }
      else{
        return this._prefix + min.padZero(2) + this._separator +
               sec.padZero(2) + this._suffix;
      }
    }
  };

  Sprite_Timer.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(96 + 180, 48);
    this.bitmap.fontSize = 32;
  };
  
  Sprite_Timer.prototype.updatePosition = function() {
    // this._timerPosition = (this._timerPosition > 1 && this._timerPosition < 6) ? 
                           // this._timerPosition : 3;
    switch (this._timerPosition) {
    case 1:
      this.x = 0;
      this.y = 0;
      break;
    case 2:
      this.x = (Graphics.width / 2) - (this.bitmap.width / 2);
      this.y = 0;
      break;
    case 3:
      this.x = Graphics.width - this.bitmap.width;
      this.y = 0;
      break;
    case 4:
      this.x = 0
      this.y = Graphics.height  - this.bitmap.height;
      break;
    case 5:
      this.x = (Graphics.width / 2) - (this.bitmap.width / 2);
      this.y = Graphics.height  - this.bitmap.height;
      break;
    case 6:
      this.x = Graphics.width - this.bitmap.width;
      this.y = Graphics.height  - this.bitmap.height;  
      break;
    }
  };
  
/*
#==============================================================================
# ** END OF CODE
#==============================================================================
*/
})(); //Don't remove this!