"use strict";

function make_main_game_state( game )
{

    function createPlayer ()
    {
        player = game.add.sprite(30, 30, 'player');
        // player = game.add.sprite(850, 450, 'player');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        player.animations.add('down', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        player.animations.add('up', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        player.animations.add('right', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        player.animations.add('left', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        player.animations.add('stand', [0, 1], 3, true);
        player.scale.setTo(0.8, 0.8);
    }
    function createGold() {
        for (var i = 0; i < 3; i++)
        {
            //  Create a star inside of the 'stars' group
            var gold = golds.create(i * 140, 30, 'gold');
            gold.scale.setTo(0.5, 0.5);
        }

    }

    function createFireball2()
    {
        fireball2 = game.add.sprite(770, 300, 'fireball');
        game.physics.enable(fireball2);
        fireball2.body.collideWorldBounds = true;
        fireball2.scale.setTo(0.2);
        fireball2.invisible = true;
    }

    function createFireball3()
    {
        fireball3 = game.add.sprite(930, 200, 'fireball');
        game.physics.enable(fireball3);
        fireball3.body.collideWorldBounds = true;
        fireball3.scale.setTo(0.2);
        fireball3.invisible = true;
    }
    function kill(player, fireball1)
    {   
        player.kill();
    }
    function collectKey1 (player, key1) {
        pass1 = 1;
        key1.kill();
    }
    function collectKey2 (player, key2) {
        pass2 = 1;
        key2.kill();
    }
    function collectKey3 (player, key3) {
        pass3 = 1;
        key3.kill();
    }
    function openDoor1 (player, door1) {
        if(pass1 == 1)
        {
            door1.kill();
            barrier1.kill();
            mask.scale.setTo(0.4);
        }
    }
    function openDoor2 (player, door3) {
        if(pass2 == 1)
        {
            door3.kill();
            barrier3.kill();
            mask.scale.setTo(0.5);
        }
    }
    function openDoor3 (player, door4) {
        if(pass3 == 1)
        {
            door4.kill();
            barrier4.kill();
            mask.scale.setTo(0.8);
        }
    }

    function trans (player, door5) {
        player.body.x = 855;
        player.body.y = 442;
        game.camera.follow(player);
        mask.kill();
    }

    function sw_change()
    {
        var sw1 = game.add.sprite(sw.x, sw.y, 'switch2');
        sw.kill();
        sw1.scale.setTo(1.5, 1.5);
        fireball_status = 1;
        createFireball2();
        createFireball3();
    }

    function collectGold (player, gold) {

        // Removes the star from the screen
        gold.kill();
        // gold_sound.play();
        //  Add and update the score
        // score += 10;
        // scoreText.text = 'Score: ' + score;

    }
    function win()
    {
        stateText.text = 'You Win!!!';
        fireball2.kill();
        fireball3.kill();
    }
    function updateS1(fireball)
    {
        if(fireball.x <= 50)
        {
            fireball.body.velocity.x = 50;
        }
        if(fireball.x >= 430)
        {
            fireball.body.velocity.x = -50;
        }
    }

    function updateS2(fireball)
    {
        if(fireball.x <= 770)
        {
            fireball.body.velocity.x = 100;
        }
        if(fireball.x >= 930)
        {
            fireball.body.velocity.x = -100;
        }
    }

    function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);


    if (enemyBullet > 0)
    {
        // And fire the bullet from this enemy
        enemyBullet.reset(300, 300);
        game.physics.arcade.moveToObject(enemyBullet,player,120);
    }

}

    function preload() {
        game.load.spritesheet('player', 'assets/player.png', 18, 32);
        game.load.audio('bgm', 'assets/bgm.mp3');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('HarryPotterMap', 'assets/HarryPotterMap.png'); 
        game.load.image('bar', 'assets/bar.png'); 
        game.load.image('gold', 'assets/gold.png'); 
        game.load.image('key', 'assets/key.png'); 
        game.load.image('glow', 'assets/glow.png');
        game.load.image('door', 'assets/door.png'); 
        game.load.image('switch1', 'assets/switch1.png'); 
        game.load.image('switch2', 'assets/switch2.png'); 
        game.load.image('door1', 'assets/door5.png'); 
        game.load.image('fireball', 'assets/fireball.png');
        game.load.image('barrier', 'assets/barrier.png'); 
        game.load.image('pointer', 'assets/pointer.png'); 
        game.load.tilemap('tilemap', 'assets/Background.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('button', 'assets/button.png');
    }

    var facing = 'left';
    var bgm;
    var back_layer;
    var collision_layer;
    var map;
    var cursors;
    var player;
    var score = 0;
    var scoreText;
    var golds;
    var mask;
    var door1;
    var door2;
    var door3;
    var door4;
    var door5;
    var doors;
    var barriers;
    var barrier1;
    var barrier2;
    var barrier3;
    var barrier4;
    var keys;
    var key1;
    var key2;
    var key3;
    var pass1 = 0;
    var pass2 = 0;
    var pass3 = 0;
    var enemyBullet;
    var enemyBullets;
    var stateText;
    var fireball1;
    var fireball2;
    var fireball3;
    var sw;
    var sw2;
    var fireball_status = 0;

    function create() {
        bgm = game.add.audio('bgm');
        // bgm.play();
        game.world.setBounds(0, 0, 1600, 600);
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('HarryPotterMap');
        back_layer = map.createLayer('Background');
        collision_layer = map.createLayer('Collision');

        map.setCollisionBetween(1, 10000, true, collision_layer); 
        
        // some gold to collect
        golds = game.add.group();
        //  We will enable physics for any star that is created in this group
        golds.enableBody = true;
        createGold();

        stateText = game.add.text(800, 150, 'You Win? ', { fontSize: '32px', fill: '#ffffff' });
        doors = game.add.group();
        doors.enableBody = true;
        game.physics.enable(doors);
        door1 = doors.create(78, 179, 'door');
        door1.body.immovable = true;
        door2 = doors.create(5, 179, 'door');
        door2.body.immovable = true;
        door3 = doors.create(195, 464, 'door');
        door3.body.immovable = true;
        door4 = doors.create(360, 251, 'door');
        door4.body.immovable = true;
        door5 = doors.create(380, 0, 'door1');
        door5.body.immovable = true;

        barriers = game.add.group();
        barriers.enableBody = true;
        game.physics.enable(barriers);
        barrier1 = barriers.create(78, 180, 'door');
        barrier1.body.immovable = true;
        barrier2 = barriers.create(5, 180, 'door');
        barrier2.body.immovable = true;
        barrier3 = doors.create(195, 463, 'door');
        barrier3.body.immovable = true;
        barrier4 = doors.create(360, 250, 'door');
        barrier4.body.immovable = true;



        keys = game.add.group();
        keys.enableBody = true;
        game.physics.enable(keys);
        key1 = keys.create(295, 100, 'key');
        key1.body.immovable = true;
        key1.scale.setTo(0.6, 0.6);
        key2 = keys.create(433, 436, 'key');
        key2.body.immovable = true;
        key2.scale.setTo(0.6, 0.6);
        key3 = keys.create(216, 336, 'key');
        key3.body.immovable = true;
        key3.scale.setTo(0.6, 0.6);

        createPlayer();

        game.camera.follow(player);


        // The enemy's bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'bullet');
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

        cursors = game.input.keyboard.createCursorKeys();

        fireball1 = game.add.sprite(50, 530, 'fireball');
        game.physics.enable(fireball1);
        fireball1.body.collideWorldBounds = true;
        fireball1.scale.setTo(0.2);




        sw = game.add.sprite(850, 350, 'switch1');
        game.physics.enable(sw);
        sw.scale.setTo(1.5);

        sw2 = game.add.sprite(850, 150, 'switch1');
        game.physics.enable(sw2);
        sw2.scale.setTo(0.05);

        
        mask = game.add.sprite(player.x+10, player.y+10, 'glow');
        mask.anchor.setTo(0.5);
        mask.scale.setTo(0.5);
        mask.scale.setTo(0.3);


    }

    function update() {
        game.physics.arcade.collide(player, collision_layer);
        game.physics.arcade.collide(player, barrier1);
        game.physics.arcade.collide(player, barrier2);
        game.physics.arcade.collide(player, barrier3);
        game.physics.arcade.collide(player, barrier4);
        game.physics.arcade.overlap(player, golds, collectGold, null, this);
        game.physics.arcade.overlap(player, door1, openDoor1, null, this);
        game.physics.arcade.overlap(player, door3, openDoor2, null, this);
        game.physics.arcade.overlap(player, door4, openDoor3, null, this);
        game.physics.arcade.overlap(player, door5, trans, null, this);
        game.physics.arcade.overlap(player, key1, collectKey1, null, this);
        game.physics.arcade.overlap(player, key2, collectKey2, null, this);
        game.physics.arcade.overlap(player, key3, collectKey3, null, this);
        game.physics.arcade.overlap(player, fireball1, kill, null, this);
        game.physics.arcade.overlap(player, fireball2, kill, null, this);
        game.physics.arcade.overlap(player, fireball3, kill, null, this);
        game.physics.arcade.overlap(player, sw, sw_change, null, this);
        game.physics.arcade.overlap(player, sw2, win, null, this);
        mask.x = player.x + 8;
        mask.y = player.y + 10;
        
        updateS1(fireball1);
        if(fireball_status == 1)
        {
            updateS2(fireball2);
            updateS2(fireball3);

        }


            if (cursors.left.isDown || game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
            {
                //  Move to the left
                player.body.velocity.x = -100;
                player.animations.play('left');
                facing = 'left';
            }
            else if (cursors.right.isDown || game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
            {
                //  Move to the right
                player.body.velocity.x = 100;
                player.animations.play('right');
                facing = 'right';
            }
            else if (cursors.down.isDown || game.input.keyboard.addKey(Phaser.Keyboard.S).isDown)
            {
                //  Move to the right
                player.body.velocity.y = 100;
                player.animations.play('down');
                facing = 'down';
            }
            //Move up
            else if (cursors.up.isDown || game.input.keyboard.addKey(Phaser.Keyboard.W).isDown)
            {
                player.body.velocity.y = -100;
                player.animations.play('up');
                facing = 'up';
            }
            else
            {
                player.body.velocity.y = 0;
                player.body.velocity.x = 0;
                //  Stand still
                player.animations.stop();

                player.animations.play('stand');
            }
        }
    
    return { "preload": preload, "create": create, "update": update};
}


window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other_bin
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
