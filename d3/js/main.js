"use strict";

function make_main_game_state( game )
{

    function playerInvisible() {
        game.add.tween(player).to( { alpha: 0.6 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }
    function dia() {
        // black.visible = true;
        diaText.visible = true;   
        tipText.visible = false;    
    }
    function move() {
        move_true = true;
        enemy1.body.static = false;
        enemy2.body.static = false;
        enemy3.body.static = false;
        wall2.kill();
    }
    function kill (bullet,enemy) {
        // if(hp_monster <= 12)
        // {
            bullet.kill();
            enemy.kill();
            monster1.kill();
            energy ++;
        // }

    }
    // function restart ()
    // {
    //     enemy1.kill();
    //     enemy2.kill();
    //     enemy3.kill();
    //     enemy4.kill();
    //     enemy5.kill();
    //     dead.kill();
    //     createPlayer();
    //     createEnemy();
    //     game.camera.follow(player);
    // }
    function die(body1, body2)
    {
        if(move_true === true)
        {
            dead = game.add.sprite(player.x, player.y, 'dead');
            body1.sprite.kill();
            var deadText = game.add.text(dead.x - 200, dead.y, 'Refresh to restart', {
            fontSize: '40px',
            fill: 'white'
        });
            // //the "click to restart" handler
            // game.input.onTap.addOnce(restart,this);
        }
    }
    function createPlayer ()
    {
        player = game.add.sprite(0, 250, 'dude');
        player.scale.setTo(1.5,1.5);
        // game.physics.arcade.enable(player);
        game.physics.p2.enable(player);
        player.body.fixedRotation = true;
    }
    function createEnemy ()
    {
        enemy1 = game.add.sprite(game.world.randomX, game.world.randomY, 'enemy');
        enemy1.enableBody = true;
        game.physics.p2.enable(enemy1);
        enemy1.body.setRectangle(100,100,0,0)
        enemy1.body.setZeroVelocity();
        enemy1.body.fixedRotation = true;
        enemy1.body.static = true;
        // accelerateToObject(enemy, player, 250);
        player.body.createBodyCallback(enemy1, die, this);
        // player.body.createBodyCallback(enemy, playerDamage, this);

        enemy2 = game.add.sprite(game.world.randomX, game.world.randomY, 'enemy');
        enemy2.enableBody = true;
        game.physics.p2.enable(enemy2);
        enemy2.body.setRectangle(100,100,0,0)
        enemy2.body.setZeroVelocity();
        enemy2.body.fixedRotation = true;
        enemy2.body.static = true;
        player.body.createBodyCallback(enemy2, die, this);

        enemy3 = game.add.sprite(game.world.randomX, game.world.randomY, 'enemy');
        enemy3.enableBody = true;
        game.physics.p2.enable(enemy3);
        enemy3.body.setRectangle(100,100,0,0)
        enemy3.body.setZeroVelocity();
        enemy3.body.fixedRotation = true;
        enemy3.body.static = true;
        player.body.createBodyCallback(enemy3, die, this);

        enemy4 = game.add.sprite(game.world.randomX, game.world.randomY, 'enemy');
        enemy4.enableBody = true;
        game.physics.p2.enable(enemy4);
        enemy4.body.setRectangle(100,100,0,0)
        enemy4.body.setZeroVelocity();
        enemy4.body.fixedRotation = true;
        enemy4.body.static = true;
        player.body.createBodyCallback(enemy4, die, this);

        enemy5 = game.add.sprite(game.world.randomX, game.world.randomY, 'enemy');
        enemy5.enableBody = true;
        game.physics.p2.enable(enemy5);
        enemy5.body.setRectangle(100,100,0,0)
        enemy5.body.setZeroVelocity();
        enemy5.body.fixedRotation = true;
        enemy5.body.static = true;
        player.body.createBodyCallback(enemy5, die, this);
    }
    function clothDie(body1, body2)
    {
        body1.sprite.kill();
        tipText.text = "Press U to wear the invisible cloak"
    }

    function accelerateToObject(object1, object2, speed)
    {
      if (typeof speed === 'undefined')
      {
        speed = 60;
      }
       var angle = Math.atan2(object2.y - object1.y, object2.x - object1.x);
       object1.body.rotation = angle + game.math.degToRad(90);
       object1.body.force.x = Math.cos(angle) * speed;
       object1.body.force.y = Math.sin(angle) * speed;
    }

    function preload() {
        game.load.image('background', 'assets/bg2.jpg');
        game.load.spritesheet('dude', 'assets/kk.png', 32, 48);
        game.load.spritesheet('dead', 'assets/dead.png');
        game.load.image('bullet', 'assets/shouriken.png');
        game.load.image('ground', 'assets/bg2.jpg');
        game.load.image('black', 'assets/black.jpg');
        game.load.image('enemy', 'assets/gargoyle.png');
        game.load.image('gargoyle', 'assets/gargoyle1.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('redline', 'assets/redline.png');
        game.load.image('root', 'assets/root.png');
        game.load.image('house', 'assets/house.png');
        game.load.spritesheet('cloth', 'assets/cloth.png', 32, 32);
        game.load.audio('bgm', 'assets/bgm.mp3');
        game.load.audio('ninfa', 'assets/ninfa.mp3');
        game.load.audio('biao', 'assets/biao.wav');
    }
    var i = 0;
    var cursors;
    var player;
    var land;
    var platforms;
    var weapon;
    var fireButton;
    var facing = 'left';
    var enemy1;
    var enemy2;
    var enemy3;
    var enemy4;
    var enemy5;
    var wall;
    var monster;
    var monster1;
    var redline;
    var energy = 0;
    var hp_monster = 10;
    var wall2;
    var move_true = false;
    var tipText;
    var dead;
    var house;
    var diaText;
    var black;
    var bgm;
    var biao;
    var ninfa;
    
    function create() {
        bgm = game.add.audio('bgm');
        bgm.play();
        biao = game.add.audio('biao');
        ninfa = game.add.audio('ninfa');

        game.world.setBounds(0, 0, 1280, 600);
        // game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.5;
        game.physics.p2.setImpactEvents(true);

        land = game.add.tileSprite(0, 0, 1280, 600, 'ground');
        land.fixedToCamera = true;

        black = game.add.sprite(0, 80, 'black');
        black.visible = false;

        diaText = game.add.text(540, 200, 'You have entered the congress\nas an eavesdropper', {
            fontSize: '40px',
            fill: 'white'
        });
        diaText.visible = false;
        black.bringToTop();
        diaText.bringToTop();


        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        // platforms.enableBody = true;
        // game.physics.p2.enable(platforms);
        // // platforms.body.fixedRotation = true;
        // // Here we create the ground.
        // var ground = platforms.create(600, 0, 'wall');
        // ground.body.immovable = true;
        // game.physics.p2.enable(ground);
        wall = game.add.sprite(650, 80, 'wall');
        game.physics.p2.enable(wall);
        // wall.body.setRectangle(50,50,0,0)
        // wall.body.setZeroVelocity();
        wall.body.static = true;
        wall2 = game.add.sprite(650, 380, 'wall');
        game.physics.p2.enable(wall2);
        wall2.body.static = true;
        wall = game.add.sprite(650, 550, 'wall');
        game.physics.p2.enable(wall);
        wall.body.static = true;



        tipText = game.add.text(200, 16, 'Try to find the invisible cloak', {
            fontSize: '32px',
            fill: 'white'
        });

        // redline = game.add.sprite(650, 250, 'redline');
        // game.physics.p2.enable(redline);
        // // redline.body.setRectangle(0,0,0,0)
        // redline.body.static = true;

        // The player and its settings
        createPlayer();
        game.camera.follow(player);
        
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.collideWorldBounds = true;
        player.animations.add('down', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [4, 5, 6, 7], 10, true);
        player.animations.add('right', [8, 9, 10, 11], 10, true);
        player.animations.add('up', [12, 13, 14, 15], 10, true);
        player.animations.add('stand', [0, 1], 3, true);


        house = game.add.sprite(1250, 200, 'house');
        house.scale.setTo(0.5, 0.5);
        game.physics.p2.enable(house);
        house.body.static = true;
        house.body.createBodyCallback(player, dia, this);

        redline = game.add.sprite(650, 225, 'redline');
        game.physics.p2.enable(redline);
        redline.body.setRectangle(0,0,0,0)
        redline.body.static = true;
        redline.body.createBodyCallback(player, move, this);

        //  Creates 30 bullets, using the 'bullet' graphic
        weapon = game.add.weapon(30, 'bullet');
        weapon.enableBody = true;
        game.physics.arcade.enable(weapon);

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 500;
        weapon.trackSprite(player, 100, 50, true);


        createEnemy();

        var cloth = game.add.sprite(420, 500, 'cloth');
        game.physics.p2.enable(cloth);
        cloth.body.static = true;
        cloth.body.createBodyCallback(player, clothDie, this);

        

        monster = game.add.sprite(300, 400, 'root');
        game.physics.arcade.enable(monster);
        monster1 = game.add.sprite(395, 500, 'root');
        game.physics.p2.enable(monster1);
        monster1.body.static = true;

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        game.camera.focusOnXY(0, 0);
    }
    
    function update() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        game.physics.arcade.overlap(weapon.bullets, monster, kill, null, this);

        player.alpha = 1;
        if (fireButton.isDown)
        {
            biao.play();
            if(facing === 'left')
            {
                weapon.bulletSpeed = -400;
                weapon.trackSprite(player, -15, 10, true);
                weapon.bulletAngleOffset = -180; 
                weapon.fire();
            }
            else if(facing === 'right')
            {
                weapon.bulletSpeed = 400;
                weapon.trackSprite(player, 15, 10, true);
                weapon.bulletAngleOffset = 0; 
                weapon.fire();
            }
            else if(facing === 'up')
            {
                weapon.bulletSpeed = 400;
                weapon.trackSprite(player, 10, -15, false);
                weapon.bulletAngleOffset = 0; 
                weapon.fire();
            }
            else if(facing === 'down')
            {
                weapon.bulletSpeed = -400;
                weapon.trackSprite(player, 15, 50, false);
                weapon.bulletAngleOffset = -180; 
                weapon.fire();
            }
        }
        else
        {
            accelerateToObject(enemy1, player, 250);
            accelerateToObject(enemy2, player, 250);
            accelerateToObject(enemy3, player, 250);
            // accelerateToObject(enemy4, player, 250);
            // accelerateToObject(enemy5, player, 250);
        }
        if(energy === 1)
        {
            if (game.input.keyboard.addKey(Phaser.Keyboard.U).isDown)
            {
                ninfa.play();
                redline.kill();
                player.alpha = 0.4;
                playerInvisible();
            }
        }
        
        if (cursors.left.isDown || game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
            facing = 'left';
        }
        else if (cursors.right.isDown || game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');
            facing = 'right';
        }
        else if (cursors.down.isDown || game.input.keyboard.addKey(Phaser.Keyboard.S).isDown)
        {
            //  Move to the right
            player.body.velocity.y = 300;
            player.animations.play('down');
            facing = 'down';
        }
        //Move up
        else if (cursors.up.isDown || game.input.keyboard.addKey(Phaser.Keyboard.W).isDown)
        {
            player.body.velocity.y = -300;
            player.animations.play('up');
            facing = 'up';
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
    
    return { "preload": preload, "create": create, "update": update };
}


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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
