//=============================================================================
// Animated busts
// by Astfgl
// Date: 05/06/2017
// Free for commercial and non commercial use, credits required: any of
// Astfgl/Astfgl (Pierre MATEO)/ Pierre MATEO.
// Edits and reposts allowed, as long as it it kept under the same terms of use.
// Do not remove this header, do not claim as your own.
// 03/06/2017 V2 -> Added the possibility to set a frozen image independently from
// the animation, and to remove it.
// 05/06/2017 V3 -> Small revisions, updated documentation.
// 05/06/2017 V4 -> Text codes \fa \ufa \da \sa added.
// 05/06/2017 V5 -> Text code \ca added.
// 06/06/2017 V6 -> Loop interval feature added, Loop number limit added,
// added compatibility to the \ca text code.
// 07/07/2017 V7 -> Compatibility with SRD Camera core, Set frame Rate command
// 05/09/2017 V8 -> Compatibility with slow text
// 26/10/2017 V9 -> "Fixed" saving and loading issue.
// 01/11/2017 V10 -> Fixed crash after erasing pictures.
// 24/01/2018 V11 -> Added set frozen and remove frozen animation features, compatibility with slow text broken
// 02/10/2018 V12 -> Finalized saving pictures bugfix and release
//=============================================================================
 

/*:
 * @plugindesc Allows animating pictures
 * @author Astfgl
 * @help 
 * In order to ensure compatibility with Kino's slow text plugin, you have
 * to use the modified version of slow text I provide in my thread, and
 * place this plugin below slow text.
 *
 * ===================================================================
 * Animation setup:
 * ===================================================================
 * First, setup the pictures using the event commands.
 * Then use the following script call:
 * $gameScreen.picture(pictureId).setAnim([array],interval);
 * Replace array by the file names without the extension, surrounded by "" and
 * separated by ",".
 * Ex: ["mouth_closed","mouth_1","mouth_2","mouth_3"]
 * These will be, in order the pictures displayed for the animations.
 * The first picture will be used when the animation is paused.
 *
 * Then replace interval by a number, this will be the number of frames
 * between image changes.
 * Ex: 5
 *
 * Ex: $gameScreen.picture(2).setAnim(["mouth_closed","mouth_1","mouth_2","mouth_3"],5)
 * This will cause the picture to loop between the frames you set in the array
 * until told to stop.
 *
 * ===================================================================
 * Freezing an animation
 * ===================================================================
 * You can tell a picture to stop looping by using:
 * $gameScreen.picture(pictureId).freeze();
 * It will set the picture to the first image in the list and stop it from looping.
 * Notice: when synching the animation to a message, it will freeze and unfreeze the
 * animation automatically when the message pauses. So you have to remove the animation
 * if you don't want it synching with a message, not freeze it.
 * This command is for out of message use.
 *
 * You can tell a picture to begin looping again by using:
 * $gameScreen.picture(pictureId).unfreeze();
 * This will make the picture start looping again, starting at the first frame.
 * Again, same disclaimer as for the freeze command: intended for out of message use.
 *
 * ===================================================================
 * Synchronizing an animation with a message box
 * ===================================================================
 * In order to synch up a picture looping animation to a message window use:
 * $gameMessage.setAnim(pictureId)
 *
 * Ex: $gameMessage.setAnim(2)
 * This will cause the picture to synch up its looping animation with the message
 * window: it will loop while text is writing, stop for pauses and between windows.
 * Using fast forward will make it skip the animation altogether.
 *
 * If you want a picture to no longer synch up with the message window, use:
 * $gameMessage.removeAnim(pictureId)
 *
 * Ex: $gameMessage.removeAnim(2)
 *
 * ===================================================================
 * Frozen or message end picture outside of animation loop
 * ===================================================================
 * By default the plugin will use the first image in the array as the frozen or
 * message end picture. If you would like to define a frozen picture outside of
 * the loop you can use the following command:
 * $gameScreen.picture(pictureId).setFrozenBmp(filename);
 *
 * Ex: $gameScreen.picture(2).setFrozenBmp("mouth_closed")
 *
 * If you would like to remove a frozen picture and start using the first picture
 * of the loop again, use the following command:
 *
 * $gameScreen.picture(pictureId).removeFrozenBmp()
 *
 * Ex: $gameScreen.picture(2).removeFrozenBmp()
 * ===================================================================
 * Wait time in between animation loops:
 * ===================================================================
 * If you want to pause the picture in between loops, use the following:
 * $gameScreen.picture(pictureId).setLoopInterval(number)
 *
 * Ex: $gameScreen.picture(2).setLoopInterval(60)
 * This will make the picture wait 60 frames before each animation loop.
 *
 * If you want to remove the wait between loops, use:
 * $gameScreen.picture(pictureId).removeLoopInterval();
 *
 * Ex: $gameScreen.picture(2).removeLoopInterval();
 *
 * Both of these commands are intended for out of message use.
 *
 * ===================================================================
 * Run animation loop only X times:
 * ===================================================================
 * If you'd like the animation loop to only run on certain amount of
 * times, use:
 * $gameScreen.picture(pictureId).setLoopTimes(number)
 * 
 * Ex: $gameScreen.picture(2).setLoopTimes(5)
 * This will cause the picture to loop 5 times and them freeze itself,
 * until the loop times are removed or set again.
 *
 * If you want to remove the limitation, use:
 * $gameScreen.picture(pictureId).removeLoopTimes();
 *
 * Ex: $gameScreen.picture(2).removeLoopTimes();
 *
 * Both of these commands are intended for out of message use.
 *
 *
 * ===================================================================
 * Changing the frame Rate
 * ===================================================================
 * If you'd like to change the frame rate of the picture you can use the
 * following command:
 *
 * $gameScreen.picture(pictureId).setFrameRate(number)
 *
 * Ex: $gameScreen.picture(2).setFrameRate(10)
 * This will set picture 2 framerate to 10.
 *
 * ===================================================================
 * Text codes:
 * ===================================================================
 * This will also add several escape codes to use with message boxes:
 * \fa[pictureId] this will freeze the target picture animation. Again, if the animation
 * is synched it won't have any effect.
 *
 * \ufa[pictureId] this will unfreeze the target picture animation. Just as above,
 * if the animation is synched it won't have any effect.
 *
 * \da[pictureId] this will desynchronise the target picture animation with the 
 * message window and automatically freeze it. Unfreeze it after if you'd rather
 * it kept running.
 *
 * \sa[pictureId] this will synchronize the target picture animation with the
 * message window. 
 *
 * \ca[variableId] this will create an animation, you must have a picture already shown.
 * First you must setup a variable using the control variable: script command
 * the following way:
 * Control variables: script: [id,[spriteArray],interval,frozenBmp*,loopInterval*,loopTimes*].
 * Replace id by the picture id you want to animate.
 * Replace sprite array by the array of sprite names.
 * Replace interval by a number.
 * frozenBmp can be omitted, if it is present it will set the new animation to use
 * the file name you replace frozenBmp by as its frozen frame.
 * loopInterval can be omitted but you must provide a frozenBmp to be able to use it
 * it will set a wait time between loops, replace it with a number.
 * loopTimes can be omitted but you must provide a  frozenBmp and a loopInterval to
 * be able to use it. Replace it with a number, this will be the number of times the
 * animation will repeat. 
 *
 * Ex: Control variables: script:[1,["mouth_closed","mouth_1","mouth_2","mouth_3"],5,"mouth_frozen"];
 * Then in the message use \ca[variableId], replacing variableId by the id of the
 * variable you just used.
 * So if you used variable 1, use \ca[1].
 * This will start the animation on target picture (1 here) using the sprites in the array, 
 * and the interval there too, when the message reaches that point.
 * It will also synchronize it automatically.
 *
 * ===================================================================
 * Saving and loading animated pictures
 * ===================================================================
 * Due to a bug within MV's core files, if you try to save when showing
 * an animated picture, your game will crash. I introduced a fix in V9.
 * However, it only works with the default way of saving: going into the menu
 * and then saving.
 * If you call the save screen in any other way, or save manually via script
 * call, you'll have to save pictures manually in order to avoid the crash.
 *
 * $gameScreen.savePictures();
 * This script call will save the state of all current animated pictures
 * and then delete them, allowing you to save.
 *
 * $gameScreen.restorePictures();
 * After calling the above script call, this command will restore animated
 * pictures exactly as they were before saving.
 *
 * Restoring pictures is done automatically when a you exit the menu or enter
 * a new map.
 * This means that if you direct the player to the save menu with a script call
 * you just have to save the pictures beforehand, loading them will happen
 * automatically.
 */
 
 var Imported = Imported || {};
 (function(){
	Game_Message.prototype.setAnim = function(picId) {
		SceneManager._scene._messageWindow.setAnim(picId);
	}
	
	
	Window_Message.prototype.setAnim = function(picId) {
		this._anim = true;
		if (!this._picIds) {
			this._picIds = [];
		}
		if (!this._picIds.contains(picId)) {
			this._picIds.push(picId);
		}
	}
	
	Game_Message.prototype.removeAnim = function(picId) {
		SceneManager._scene._messageWindow.removeAnim(picId);
	}
	
	Window_Message.prototype.removeAnim = function(picId) {
		if (this._picIds) {
			for (var i = 0; i  < this._picIds.length; i++) {
				if (this._picIds[i] === picId) {
					this._picIds.splice(i,1);
				}
			}
		}
	}
	
	var _Astfgl_newWMU = Window_Message.prototype.update
	Window_Message.prototype.update = function() {
		_Astfgl_newWMU.call(this);
		if (this._anim) {
			 if (this._waitCount > 0 || this.pause || !this._textState) {
				this._picIds.forEach(function(num){
					$gameScreen.picture(num).freeze();
				})
			 } else {
				this._picIds.forEach(function(num){
					$gameScreen.picture(num).unfreeze();
				})
			 }
		}
	}
	
	var _Astfgl_newGPIB = Game_Picture.prototype.initBasic
	Game_Picture.prototype.initBasic = function() {
		this._animated = false;
		this._interval = 0;
		this._timer = 0;
		this._index = 0;
		this._frozen = false;
		this._bmpArray = [];
	}
	
	Game_Picture.prototype.setAnim = function(sprArray,interval) {
		this._animated = true;
		this._interval = interval;
		for (var i = 0; i < sprArray.length; i++) {
			this._bmpArray.push(ImageManager.loadPicture(sprArray[i]))
		}
	}
	
	Game_Picture.prototype.setFrozenAnim = function(sprArray,interval) {
		this._Fanimated = true;
		this._Finterval = interval;
		this._Ftimer = 0;
		this._Findex = 0;
		this._FbmpArray = [];
		for (var i = 0; i < sprArray.length; i++) {
			this._FbmpArray.push(ImageManager.loadPicture(sprArray[i]))
		}
	}
	
	Game_Picture.prototype.removeFrozenAnim = function() {
		delete this._Fanimated
		delete this._Finterval
		delete this._Ftimer
		delete this._Findex
		delete this._FbmpArray
	}
	
	Game_Picture.prototype.setFrozenBmp = function(path) {
		this._frozenBmp = ImageManager.loadPicture(path);
	}
	
	Game_Picture.prototype.removeFrozenBmp = function() {
		delete this._frozenBmp;
	}
	
	var _Astfgl_newGPU = Game_Picture.prototype.update
	Game_Picture.prototype.update = function() {
		_Astfgl_newGPU.call(this);
		this.updateAnim();
	}
	
	Game_Picture.prototype.updateAnim = function() {
		if (this._animated) {
			this._timer += 1;
			if (this._timer >= this._interval) {
				this._timer = 0;
				this._index += 1;
			}
			if (this._index >= this._bmpArray.length) {
				this._index = 0;
				if (this._loopInterval) {
					this._loopTime = this._loopInterval;
				}
				if (this._loopLimit) {
					this._loopTimes -= 1;
				}
			}
			if (this._loopInterval) {
				if (this._loopTime > 0) {
					this._loopTime -= 1;
					this.freeze();
				}
				if (this._loopTime <= 0) {
					this.unfreeze();
				}
			}
			if (this._loopLimit && this._loopTimes <= 0) {
				this.freeze();
			}
			if (this._frozen) {
				this._index = 0;
				this._timer = 0;
			} else {
				this._Findex = 0;
				this._Ftimer = 0;
			}
			if (this.sprite) {
				this.sprite.bitmap = this._bmpArray[this._index]
				if (this._frozen && this._frozenBmp) {
					this.sprite.bitmap = this._frozenBmp;
				} else if (this._frozen && this._Fanimated) {
					this._Ftimer += 1;
					if (this._Ftimer >= this._Finterval) {
						this._Ftimer = 0;
						this._Findex += 1;
					}
					if (this._Findex >= this._FbmpArray.length) {
						this._Findex = 0;
					}
					this.sprite.bitmap = this._FbmpArray[this._Findex]
				}
			}
		}
	}
	
	Game_Picture.prototype.freeze = function() {
		this._frozen = true;
	}
	
	Game_Picture.prototype.unfreeze = function() {
		this._frozen = false;
	}

	Game_Picture.prototype.setLoopInterval = function(num) {
		this._loopTime = 0;
		this._loopInterval = num;
	}
	
	Game_Picture.prototype.removeLoopInterval = function() {
		delete this._loopTime;
		delete this._loopInterval;
		this.unfreeze();
	}
	
	Game_Picture.prototype.setLoopTimes = function(num) {
		this._loopLimit = true;
		this._loopTimes = num;
	}
	
	Game_Picture.prototype.removeLoopTimes = function() {
		delete this._loopLimit;
		delete this._loopTimes;
	}
	
	var _Astfgl_newGSSP = Game_Screen.prototype.showPicture
	Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y,
                                             scaleX, scaleY, opacity, blendMode) {
		_Astfgl_newGSSP.call(this,pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
		var rpid = this.realPictureId(pictureId);
		if (!Imported["SumRndmDde Camera Core"]) {
			var spr = SceneManager._scene._spriteset._pictureContainer.children[rpid - 1];
		} else {
			var spr = SceneManager._scene._pictureContainer.children[rpid - 1];
		}
		this._pictures[rpid].sprite = spr;
	}
	
	var _Astfgl_newGSEP = Game_Screen.prototype.erasePicture
	Game_Screen.prototype.erasePicture = function(id) {
		_Astfgl_newGSEP.call(this,id);
		if (SceneManager._scene._messageWindow) {
			if (SceneManager._scene._messageWindow._anim) {
				SceneManager._scene._messageWindow._anim = false;
				for (var i = 0; i < SceneManager._scene._messageWindow._picIds.length; i++) {
					if (SceneManager._scene._messageWindow._picIds[i] === id) {
						SceneManager._scene._messageWindow._picIds.splice(i,1);
					}
				}
			}
		}
	}
	
	var _Astfgl_newWBCEC = Window_Message.prototype.processEscapeCharacter
	Window_Message.prototype.processEscapeCharacter = function(code, textState) {
		_Astfgl_newWBCEC.call(this,code,textState);
		if (code === 'FA') {
			$gameScreen.picture(Number(this.obtainEscapeParam(textState))).freeze();
		} else if (code === 'UFA') {
			$gameScreen.picture(Number(this.obtainEscapeParam(textState))).unfreeze();
		} else if (code === 'DA') {
			var num = Number(this.obtainEscapeParam(textState));
			$gameScreen.picture(num).freeze();
			this.removeAnim(num);
		} else if (code === 'SA') {
			this.setAnim(Number(this.obtainEscapeParam(textState)));
		} else if (code === 'CA') {
			var array = $gameVariables.value(this.obtainEscapeParam(textState));
			var id = array[0];
			var arr = array[1];
			var num = array[2];
			$gameScreen.picture(id).setAnim(arr,num);
			this.setAnim(id);
			if (array[3]) {
				$gameScreen.picture(id).setFrozenBmp(array[3]);
			}
			if (array[4]) {
				$gameScreen.picture(id).setLoopInterval(array[4]);
			}
			if (array[5]) {
				$gameScreen.picture(id).setLoopTimes(array[5]);
			}
		}
	}
	
	Game_Picture.prototype.setFrameRate = function(num) {
		this._interval = num;
	}
	
	Game_Screen.prototype.savePictures = function () {
		$gameSystem._savedPictures = [];
		for (var i = 1; i < this._pictures.length; i++) {
			var pic = this._pictures[i]
			if (pic) {
				var obj = {
					_id : i,
					_x: pic._x,
					_y: pic._y,
					_angle: pic._angle,
					_blendMode: pic._blendMode,
					_duration: pic._duration,
					//_frozen: pic._frozen,
					//_index: pic._index,
					//_interval: pic._interval,
					_name: pic._name,
					_opacity: pic._opacity,
					_origin: pic._origin,
					_rotationSpeed: pic._rotationSpeed,
					_scaleX: pic._scaleX,
					_scaleY: pic._scaleY,
					_targetOpacity: pic._targetOpacity,
					_targetScaleX: pic._targetScaleX,
					_targetScaleY: pic._targetScaleY,
					_targetX: pic._targetX,
					_targetY: pic._targetY,
					_timer: pic._timer,
					_tone: pic._tone,
					_toneDuration: pic._toneDuration,
					_toneTarget: pic._toneTarget,
				}
				if (pic._animated) {
					obj._index = pic._index;
					obj._interval = pic._interval;
					obj._frozen = pic._frozen;
					obj._bmpArray = [];
					for (var ii = 0; ii < pic._bmpArray.length; ii++) {
						obj._bmpArray.push(pic._bmpArray[ii]._url)
					}
				}
				if (pic._loopTimes) {
					obj._loopTimes  = pic._loopTimes;
				}
				if (pic._loopTime) {
					obj._loopTime  = pic._loopTime;
				}
				if (pic._loopInterval) {
					obj._loopInterval  = pic._loopInterval;
				}
				if (pic._loopLimit) {
					obj._loopLimit = pic._loopLimit;
				}
				$gameSystem._savedPictures.push(obj)
				this.erasePicture(i);
			}
		}
	}
	
	Game_Screen.prototype.restorePictures = function() {
		if ($gameSystem._savedPictures) {
			$gameSystem._savedPictures.forEach(function(pic,index){
				this.showPicture(pic._id, pic._name, pic._origin, pic._x, pic._y,
                                             pic._scaleX, pic._scaleY, pic._opacity, pic._blendMode);
				if (pic && pic._bmpArray) {							 
					var ar = [];
					for (var i = 0; i < pic._bmpArray.length; i++) {
						ar.push(pic._bmpArray[i].slice(13,pic._bmpArray[i].length-4))
					}
					this.picture(pic._id).setAnim(ar,pic._interval);
					if (pic._loopTime && pic._loopInterval) {
						this.picture(pic._id).setLoopInterval(pic._loopInterval);
					}
					if (pic._loopLimit && pic._loopTimes) {
						this.picture(pic._id).setLoopTimes(pic._loopTimes);
					}
				}
				var shownPic = this.picture(pic._id);
					shownPic._angle  = pic._angle;
					shownPic._duration = pic._duration;
					shownPic._frozen = pic._frozen;
					shownPic._index = pic._index;
					shownPic._rotationSpeed = pic._rotationSpeed;
					shownPic._targetOpacity = pic._targetOpacity;
					shownPic._targetScaleX = pic._targetScaleX;
					shownPic._targetScaleY = pic._targetScaleY;
					shownPic._targetX = pic._targetX;
					shownPic._targetY = pic._targetY;
					shownPic._timer = pic._timer;
					shownPic._tone = pic._tone;
					shownPic._toneDuration = pic._toneDuration;
					shownPic._toneTarget = pic._toneTarget;
				
			})
			$gameSystem._savedPictures = [];
		}
	}
	
	var _Astfgl_newCM = Scene_Map.prototype.callMenu
	Scene_Map.prototype.callMenu = function() {
		$gameSystem._savedPictures = [];
		for (var i = 1; i < $gameScreen._pictures.length; i++) {
			var pic = $gameScreen._pictures[i]
			if (pic) {
				var obj = {
					_id : i,
					_x: pic._x,
					_y: pic._y,
					_angle: pic._angle,
					_blendMode: pic._blendMode,
					_duration: pic._duration,
					//_frozen: pic._frozen,
					//_index: pic._index,
					//_interval: pic._interval,
					_name: pic._name,
					_opacity: pic._opacity,
					_origin: pic._origin,
					_rotationSpeed: pic._rotationSpeed,
					_scaleX: pic._scaleX,
					_scaleY: pic._scaleY,
					_targetOpacity: pic._targetOpacity,
					_targetScaleX: pic._targetScaleX,
					_targetScaleY: pic._targetScaleY,
					_targetX: pic._targetX,
					_targetY: pic._targetY,
					_timer: pic._timer,
					_tone: pic._tone,
					_toneDuration: pic._toneDuration,
					_toneTarget: pic._toneTarget,
				}
				if (pic._animated) {
					obj._index = pic._index;
					obj._interval = pic._interval;
					obj._frozen = pic._frozen;
					obj._bmpArray = [];
					for (var ii = 0; ii < pic._bmpArray.length; ii++) {
						obj._bmpArray.push(pic._bmpArray[ii]._url)
					}
				}
				if (pic._loopTimes) {
					obj._loopTimes  = pic._loopTimes;
				}
				if (pic._loopTime) {
					obj._loopTime  = pic._loopTime;
				}
				if (pic._loopInterval) {
					obj._loopInterval  = pic._loopInterval;
				}
				if (pic._loopLimit) {
					obj._loopLimit = pic._loopLimit;
				}
				$gameSystem._savedPictures.push(obj)
				$gameScreen.erasePicture(i);
			}
		}
		_Astfgl_newCM.call(this)
	}
	
	var _Astfgl_newSMS = Scene_Map.prototype.start
	Scene_Map.prototype.start = function() {
		_Astfgl_newSMS.call(this);
		if ($gameSystem._savedPictures) {
			$gameSystem._savedPictures.forEach(function(pic,index){
				$gameScreen.showPicture(pic._id, pic._name, pic._origin, pic._x, pic._y,
                                             pic._scaleX, pic._scaleY, pic._opacity, pic._blendMode);
				if (pic && pic._bmpArray) {
					var ar = [];
					for (var i = 0; i < pic._bmpArray.length; i++) {
						ar.push(pic._bmpArray[i].slice(13,pic._bmpArray[i].length-4))
					}
					$gameScreen.picture(pic._id).setAnim(ar,pic._interval);
					if (pic._loopTime && pic._loopInterval) {
						$gameScreen.picture(pic._id).setLoopInterval(pic._loopInterval);
					}
					if (pic._loopLimit && pic._loopTimes) {
						$gameScreen.picture(pic._id).setLoopTimes(pic._loopTimes);
					}
				}
				var shownPic = $gameScreen.picture(pic._id);
					shownPic._angle  = pic._angle;
					shownPic._duration = pic._duration;
					shownPic._frozen = pic._frozen;
					shownPic._index = pic._index;
					shownPic._rotationSpeed = pic._rotationSpeed;
					shownPic._targetOpacity = pic._targetOpacity;
					shownPic._targetScaleX = pic._targetScaleX;
					shownPic._targetScaleY = pic._targetScaleY;
					shownPic._targetX = pic._targetX;
					shownPic._targetY = pic._targetY;
					shownPic._timer = pic._timer;
					shownPic._tone = pic._tone;
					shownPic._toneDuration = pic._toneDuration;
					shownPic._toneTarget = pic._toneTarget;
				
			})
			$gameSystem._savedPictures = [];
		}
	}
	
	//Compatibility with Kino's slow text
	var KR = KR || {};
	if (KR) {
		if (KR.Plugins) {
			if (KR.Plugins.SlowText) {
				Window_Message.prototype.update = function() {
					_Astfgl_newWMU.call(this);
					if (this._anim) {
						 if ( (this._waitCount > 0 && this._normalWait === false) || this.pause || !this._textState) {
							this._picIds.forEach(function(num){
								$gameScreen.picture(num).freeze();
							})
						 } else {
							this._picIds.forEach(function(num){
								$gameScreen.picture(num).unfreeze();
							})
						 }
					}
				};    
				
				var textSpeed = PluginManager.parameters("SlowText")["Text Speed"] || 5;
				Window_Message.prototype.updateTextSpeed = function(value) {
				  textSpeed = value;
				};

				Window_Message.prototype.processNormalCharacter = function(textState) {
				  Window_Base.prototype.processNormalCharacter.call(this, textState);
				  this.startWait(textSpeed);
				  this._normalWait = true; //added this to signal automatic waits from deliberate ones, to keep animating busts if it's an automated break.
				};

				Window_Message.prototype.updateWait = function() {
				  if (this._waitCount > 0 && !this._showFast) {
					  this._waitCount--;
					  return true;
				  } else {
					  this._waitCount = 0;
					  this._normalWait = false; //resetting the marker
					  return false;
				  }
				};
			}
		}
	}
		

 })()