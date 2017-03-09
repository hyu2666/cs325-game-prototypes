"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            game.load.spritesheet('attack01', 'assets/game/attack01.png', 155, 107, 7);
            game.load.spritesheet('attack02', 'assets/game/attack02.png', 155, 107, 7);
            game.load.spritesheet('attack11', 'assets/game/attack11.png', 179, 113, 8);
            game.load.spritesheet('attack12', 'assets/game/attack12.png', 179, 113, 8);
            game.load.spritesheet('skill01', 'assets/game/skill01.png', 157, 124, 11);
            game.load.spritesheet('skill02', 'assets/game/skill02.png', 157, 124, 11);
            game.load.image('gold', 'assets/game/gold.png');
            game.load.image('monsterbloodbar', 'assets/game/monsterbloodbar.png');
            game.load.image('skill0', 'assets/game/skill0.png' );
            game.load.image('attack1', 'assets/game/attack1.png' );
            game.load.image('attack0', 'assets/game/attack0.png' );
            game.load.image('logo', 'assets/phaser.png' );
            game.load.image('frame', 'assets/game/frame.png' );
            game.load.image('bloodbar', 'assets/game/bloodbar.png' );
            game.load.image('magicbar', 'assets/game/magicbar.png' );
            game.load.image('red', 'assets/game/red.png' );
            game.load.image('blue', 'assets/game/blue.jpg' );
            game.load.image('monster1', 'assets/monster1.png' );
            game.load.image('earth', 'assets/game/back.bmp');
            game.load.image('grass', 'assets/game/grass.bmp');
            game.load.image('grass2', 'assets/game/grass2.png');
            game.load.image('barrier', 'assets/game/barrier.png');
            game.load.image('tree', 'assets/game/tree.png');
            game.load.image('tree2', 'assets/game/tree2.png');
            game.load.image('root', 'assets/game/root.png');
            game.load.image('root2', 'assets/game/root2.png');
            game.load.image('road', 'assets/game/road.png');
            game.load.image('wall', 'assets/game/stone.png');
            game.load.image('wall2', 'assets/game/stone2.png');
            game.load.image('door', 'assets/game/door.png');
            game.load.image('latch', 'assets/game/door1.png');
            game.load.image('flower', 'assets/game/flower.png');
            game.load.image('chess1', 'assets/game/chess1.png');
            game.load.image('chess2', 'assets/game/chess2.png');
            game.load.image('ground', 'assets/plat.png');
            game.load.image('crown', 'assets/game/crown.png');
            game.load.spritesheet('boss', 'assets/game/boss1.png');
            game.load.spritesheet('dude', 'assets/game/player.png', 85, 67);
            game.load.image('bullet', 'assets/game/skill.png',78, 51);
            game.load.spritesheet('item_buttom', 'assets/game/item_buttom.png', 18, 18);
            game.load.image('item_interface', 'assets/game/item_interface.png');
            game.load.spritesheet('player_buttom', 'assets/game/player_buttom.png', 18, 18);
            game.load.image('player_interface', 'assets/game/player_interface.png');
            game.load.audio('bgm', 'assets/game/characterSelectStage.ogg');
            game.load.audio('win_bgm', 'assets/game/win.ogg');
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title.jpg');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.image( 'logo', 'assets/phaser.png' );
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
