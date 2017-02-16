window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('logo', 'assets/phaser.png' );
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
        game.load.audio('bgm', 'assets/game/characterSelectStage.ogg');
        game.load.audio('win_bgm', 'assets/game/win.ogg');
    }
    var land;
    var bouncy;
    var cursors;
    var player;
    var enemy;
    var fireButton;
    var platforms;
    var weapon;
    var bgm;
    var grass_it;
    var latch1;
    var latch2;
    var chess1;
    var chess2;
    var lives = 3;
    var win_bgm;
    var stateText;
    var stateText2;
    var crown;

    function create() {

        //  Resize our game world to be a 2000 x 600 square
        game.world.setBounds(0, 0, 3700, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  background music
        bgm = game.add.audio('bgm');
        bgm.play();

        win_bgm = game.add.audio('win_bgm');
        //  Our tiled scrolling background
        land = game.add.tileSprite(0, 0, 3700, 600, 'earth');
        land = game.add.tileSprite(0, 225, 3700, 600, 'grass');
        land.fixedToCamera = true;

        grass_it = game.add.group();
        var flower2 = grass_it.create(800, 300, 'grass2');
        flower2 = grass_it.create(600, 225, 'grass2');//under tree 1
        flower2 = grass_it.create(650, 250, 'grass2');//under tree 1
        flower2 = grass_it.create(900, 300, 'grass2');
        flower2 = grass_it.create(900, 300, 'flower');
        flower2 = grass_it.create(920, 320, 'flower');
        flower2 = grass_it.create(940, 280, 'flower');

        flower2 = grass_it.create(0, 400, 'road');
        flower2 = grass_it.create(224, 420, 'road');
        flower2 = grass_it.create(448, 410, 'road');
        flower2 = grass_it.create(1400, 400, 'road');
        flower2 = grass_it.create(1500, 370, 'road');

        flower2 = grass_it.create(1500, 225, 'door');
        flower2 = grass_it.create(3000, 225, 'door');


        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, 145, 'barrier');
        ground.body.immovable = true;

        ground = platforms.create(640, 145, 'barrier');
        ground.body.immovable = true;

        ground = platforms.create(1280, 145, 'barrier');
        ground.body.immovable = true;

        ground = platforms.create(1920, 145, 'barrier');
        ground.body.immovable = true;

        var ledge = platforms.create(600, 0, 'tree');
        ledge.scale.setTo(1.3,1.3);
        ledge.body.immovable = true;

        ledge = platforms.create(2500, 0, 'tree2');
        ledge.scale.setTo(0.8, 0.8);
        ledge.body.immovable = true;

        ledge = platforms.create(1000, 300, 'root');
        ledge.scale.setTo(0.5,0.5);
        ledge.body.immovable = true;

        ledge = platforms.create(0, 150, 'wall');
        ledge.body.immovable = true;

        latch1 = platforms.create(1530, 270, 'latch');
        latch1.body.immovable = true;

        ledge = platforms.create(1375, 250, 'root2');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        ledge = platforms.create(1700, 420, 'wall2');
        ledge.body.immovable = true;
        ledge = platforms.create(1760, 450, 'wall2');
        ledge.body.immovable = true;

        // Door 2
        latch2 = platforms.create(3030, 270, 'latch');
        latch2.body.immovable = true;

        ledge = platforms.create(2875, 250, 'root2');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        ledge = platforms.create(3200, 420, 'wall2');
        ledge.body.immovable = true;
        ledge = platforms.create(3260, 450, 'wall2');
        ledge.body.immovable = true;

        crown = platforms.create(3450, 400, 'crown');
        crown.body.immovable = true;
        crown.scale.setTo(2, 2);

        //Chess2, enemy chess
        chess2 = platforms.create(1650, 450, 'chess2');
        chess2.scale.setTo(0.5, 0.5);
        chess2.body.immovable = true;

        chess1 = platforms.create(1350, 450, 'chess1');
        chess1.scale.setTo(0.5, 0.5);
        chess1.body.collideWorldBounds = true;


        // The player and its settings
        player = game.add.sprite(0, 350, 'dude');
        player.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(player);
    
        game.camera.follow(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        player.animations.add('down', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
        player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('stand', [16,17,18], 3, true);
        player.animations.add('attack', [16,17,18], 3, true);

        enemy = game.add.sprite(2900, 400, 'boss');
        game.physics.arcade.enable(enemy);
        enemy.body.collideWorldBounds = true;



        //  Text
        stateText = game.add.text(1100,300,'Chess Time!', { font: '84px Arial', fill: '#000' });
        stateText.scale.setTo(0.5, 0.5);
        // stateText.visible = false;

        stateText2 = game.add.text(3450, 300,'You Won!', { font: '84px Arial', fill: '#000' });
        stateText2.scale.setTo(0.5, 0.5);
        

        //  Creates 30 bullets, using the 'bullet' graphic
        weapon = game.add.weapon(30, 'bullet');
        weapon.enableBody = true;
        game.physics.arcade.enable(weapon);

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 1000;
        weapon.trackSprite(player, 100, 50, true);

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        // game.camera.deadzone = new Phaser.Rectangle(300, 250, 250, 100);
        game.camera.focusOnXY(0, 0);

    }
    
    function update() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        // game.physics.arcade.collide(enemy, platforms);
        game.physics.arcade.collide(player, platforms);

        game.physics.arcade.overlap(player, enemy, die, null, this);
        game.physics.arcade.overlap(player, latch1, outcome, null, this);
        game.physics.arcade.overlap(weapon.bullets, enemy, kill, null, this);
        game.physics.arcade.overlap(chess1, chess2, win_chess, null, this);
        game.physics.arcade.overlap(player, crown, win_game, null, this);
        // weapon.fire();
        if (fireButton.isDown)
        {
            weapon.fire();
            player.animations.play('attack');
        }

        if (cursors.left.isDown || game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (cursors.right.isDown || game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');

        }
        else if (cursors.down.isDown || game.input.keyboard.addKey(Phaser.Keyboard.S).isDown)
        {
            //  Move to the right
            player.body.velocity.y = 300;
            player.animations.play('down');
        }
        //Move up
        else if (cursors.up.isDown || game.input.keyboard.addKey(Phaser.Keyboard.W).isDown)
        {
            player.body.velocity.y = -300;
            player.animations.play('down');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.animations.play('stand');
        }
        land.tilePosition.x = -game.camera.x;
        land.tilePosition.y = -game.camera.y;
    }

    function die (player,enemy) {
        player.kill();
    }
    function outcome (player,latch1) {
        enemy.visible = true;
    }
    function kill (bullet,enemy) {

        enemy.kill();
        latch2.kill();
        bullet.kill();
        bgm.stop();
        win_bgm.play();
    }
    function win_chess (chess1,chess2) {
        
        stateText.text=" You Won the Chess! \nNow go to next room";
        chess2.kill();
        latch1.kill();
    }
    function win_game (player,crown) {
        stateText2.visible = true;
    }

};
