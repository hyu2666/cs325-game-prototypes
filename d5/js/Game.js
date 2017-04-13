"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
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
    var goldText;
    var smallGoldText;
    var stateText;
    var stateText2;
    var crown;
    var bloodbar;
    var blood = 10000;
    var magic = 1000;
    var setlives = 2;
    var monstergroup;
    var facing = 'right';
    var framework;
    var frame;
    var magicbar;
    var player_mode = 0;
    var skill0;
    var attack1;
    var attack0;
    var blue;
    var red;
    var red_status;
    var blue_status;
    var item_interface;
    var item_buttom;
    var item_interface_status;
    var player_interface;
    var player_buttom;
    var player_interface_status;
    var items;
    var gold;
    var gold_score = 0;
    var monsterbloodbar;
    var monsterblood = 5000;
    var idx;
    var idy;
    var enemy_live = 0;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    // function createmonster () {
    //     // monstergroup.removeAll();
      
    //     for (var y = 0; y < setlives; y++)
    //     {
    //         var monsterblood=game.add.group();
    //         {
    //             var monsterblood=game.add.group();
    //             var monster=game.add.sprite(0, 50*y,'monster1');
    //             var blood=game.add.sprite(5, 50*y-10,'bloodbar');
    //             monster.scale.setTo(1.5,1.5);
    //             monster.health=20;
    //             monster.animations.add('attack', [0,1,2,3,4,5], 5, false);
    //             monster.animations.add('attackleft', [8,7,6,11,10,9], 5, false);
    //             monster.animations.add('normal', [0], 5, false);
    //             monster.animations.add('normalleft', [8], 5, false);
    //             game.physics.enable(monster, Phaser.Physics.ARCADE);
    //             game.physics.enable(blood, Phaser.Physics.ARCADE);
    //             monsterblood.add(monster);
    //             blood.scale.setTo(0.1,0.1);
    //             monsterblood.add(blood);
    //             monstergroup.add(monsterblood);
    //       }
    //     }
    // 

    function attack01() {

        player_mode = 1;
        player.loadTexture('attack01', 0);

        player.animations.add('attack01');

        player.animations.play('attack01', 10, false);
    }

    function attack02() {
        player_mode = 1;
        player.loadTexture('attack02', 0);

        player.animations.add('attack02');

        player.animations.play('attack02', 10, false);
    }

    function attack11() {

        player_mode = 1;
        player.loadTexture('attack11', 0);

        player.animations.add('attack11');

        player.animations.play('attack11', 10, false);
    }

    function attack12() {
        player_mode = 1;
        player.loadTexture('attack12', 0);

        player.animations.add('attack12');

        player.animations.play('attack12', 10, false);
    }

    function skill01() {

        player_mode = 1;
        player.loadTexture('skill01', 0);

        player.animations.add('skill01');

        player.animations.play('skill01', 10, false);
    }

    function skill02() {
        player_mode = 1;
        player.loadTexture('skill02', 0);

        player.animations.add('skill02');

        player.animations.play('skill02', 10, false);
    }

    function open_item() {
        if(item_interface_status == 0)
        {
            smallGoldText.visible = true;
            item_interface.visible = true;
            item_interface_status = 1;
        }
        else
        {
            smallGoldText.visible = false;
            item_interface.visible = false;
            item_interface_status = 0;
        }
    }

    function open_player() {
        if(player_interface_status == 0)
        {
            player_interface.visible = true;
            player_interface_status = 1;
        }
        else
        {
            player_interface.visible = false;
            player_interface_status = 0;
        }
    }

    function walk() {
        player_mode = 0;
        player.loadTexture('dude', 0);
        player.animations.add('down', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
        player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('stand', [16,17,18], 3, true);
    }

    function blood_down (player,enemy) {
        if(player_mode != 0)
        {
            if(monsterblood ==0)
            {
                kill();
            }
            else
            {
                monsterbloodbar.scale.setTo((monsterblood - 10)/5000 * 1, 1);
                monsterblood -= 10;
            }

        }
        else
        {
            bloodbar.scale.setTo(1.25, (blood - 10)/10000 * 1.25);
            blood -= 10;
        }
    }
    function blood_up () {
        red.visible = false;
        if(blood > 6000)
        {
            bloodbar.scale.setTo(1.25, 1.25);
            blood = 10000;
        }
        else
        {
            bloodbar.scale.setTo(1.25, (blood + 4000)/10000 * 1.25);
            blood += 4000;
        }
    }
    function magic_down () {
        magicbar.scale.setTo(1.25, (magic - 10)/1000 * 1.25);
        magic -= 10;
    }
    function magic_up () {
        blue.visible = false;
        if(magic > 600)
        {
            magicbar.scale.setTo(1.25, 1.25);
            magic == 1000;
        }
        else
        {
            magicbar.scale.setTo(1.25, (magic + 400)/1000 * 1.25);
            magic += 400;
        }
    }

    function collect_gold(player, gold) {
        //  Increase the score
        gold_score += 50;
        goldText.text = gold_score + ' gold';
        smallGoldText.text = gold_score + ' g';
        gold.kill();
    }

    function outcome (player,latch1) {
        enemy.visible = true;
    }

    function createEnemy()
    {
        // enemy = game.add.sprite(2900, 400, 'boss');
        enemy = game.add.sprite(2200, 200, 'boss');
        game.physics.arcade.enable(enemy);
        enemy.body.collideWorldBounds = true;
        game.physics.arcade.moveToObject(enemy, player, 120);
        enemy_live = 1;
    }

    function kill () {
        gold = items.create(enemy.x, enemy.y, 'gold');
        enemy.kill();
        latch2.kill();
        bgm.stop();
        win_bgm.play();
    }

    function win_chess (chess1,chess2) {
        stateText.text=" You Won the Chess! \nNow go to next room";
        chess2.kill();
        latch1.kill();
        createEnemy();
    }

    function win_game (player,crown) {
        stateText2.visible = true;
    }

    return {
    
        create: function () {
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

        // createmonster();
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
        game.physics.arcade.enable(crown);
        //Chess2, enemy chess
        chess2 = platforms.create(1650, 450, 'chess2');
        chess2.scale.setTo(0.5, 0.5);
        chess2.body.immovable = true;

        chess1 = platforms.create(1350, 450, 'chess1');
        chess1.scale.setTo(0.5, 0.5);
        chess1.body.collideWorldBounds = true;


        // The player and its settings
        player = game.add.sprite(0, 350, 'dude');
        player.scale.setTo(1.82,1.82);
        game.physics.arcade.enable(player);
    
        game.camera.follow(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        player.animations.add('down', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('left', [8,9,10,11,12,13,14,15], 10, true);
        player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('stand', [16,17,18], 3, true);


        framework = game.add.group();
        attack0 = framework.create(476, 557, 'attack0');
        attack0.scale.setTo(1.25, 1.25);
        attack0.fixedToCamera=true;

        attack1 = framework.create(516, 557, 'attack1');
        attack1.scale.setTo(1.25, 1.25);
        attack1.fixedToCamera=true;

        skill0 = framework.create(556, 557, 'skill0');
        skill0.scale.setTo(1.25, 1.25);
        skill0.fixedToCamera=true;


        frame = framework.create(0, 0, 'frame');
        frame.scale.setTo(1.25, 1.25);
        frame.fixedToCamera=true;
        frame.bringToTop();

        monsterbloodbar = framework.create(0, 100, 'monsterbloodbar');
        monsterbloodbar.fixedToCamera=true;

        bloodbar = framework.create(52, 597, 'bloodbar');
        bloodbar.scale.setTo(1.25, 1.25);
        bloodbar.fixedToCamera=true;
        bloodbar.angle = 180;
        magicbar = framework.create(792, 597, 'magicbar');
        magicbar.scale.setTo(1.25, 1.25);
        magicbar.fixedToCamera=true;
        magicbar.angle = 180;

        red = framework.create(95, 557, 'red');
        red.scale.setTo(1.25, 1.25);
        red.fixedToCamera=true;
        red.visible = true;
        red_status = 1;

        blue = framework.create(132, 555, 'blue');
        blue.scale.setTo(1.25, 1.25);
        blue.fixedToCamera=true;
        blue.visible = true;
        blue_status = 1;

        item_buttom = game.add.button(420, 545, 'item_buttom', open_item);
        item_buttom.scale.setTo(1.25, 1.25);
        item_buttom.fixedToCamera=true;

        item_interface = framework.create(0, 0, 'item_interface');
        item_interface.visible = false;
        item_interface_status = 0;
        item_interface.fixedToCamera=true;
        item_interface.inputEnabled = true;
        item_interface.input.enableDrag(false, true);

        player_buttom = game.add.button(345, 575, 'player_buttom', open_player);
        player_buttom.scale.setTo(1.25, 1.25);
        player_buttom.fixedToCamera=true;

        player_interface = framework.create(510, 0, 'player_interface');
        player_interface.visible = false;
        player_interface_status = 0;
        player_interface.fixedToCamera=true;
        player_interface.inputEnabled = true;
        player_interface.input.enableDrag(false, true);

        

        //create hearts
        items = game.add.group();
        items.enableBody = true;
        items.physicsBodyType = Phaser.Physics.ARCADE;

        //  Text
        stateText = game.add.text(1100,300,'Chess Time!', { font: '84px Arial', fill: '#000' });
        stateText.scale.setTo(0.5, 0.5);
        // stateText.visible = false;

        stateText2 = game.add.text(3450, 300,'You Won!', { font: '84px Arial', fill: '#000' });
        stateText2.scale.setTo(0.5, 0.5);
        
        goldText = game.add.text(0,0,'0 gold', { font: '84px Arial', fill: '#FFD700' });
        goldText.scale.setTo(0.5, 0.5);
        goldText.fixedToCamera = true;

        smallGoldText = game.add.text(50,342, gold_score + ' g', { font: '20px Arial', fill: '#FFD700' });
        smallGoldText.fixedToCamera = true;
        smallGoldText.visible = false;

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
        },
    
        update: function () {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;

            if(enemy_live != 0)
            {
                game.physics.arcade.moveToObject(enemy, player, 120);
            }
            // if(monsterblood == 0)
            // {
            //     kill();
            // }
            // else
            // {
            //     enemy.x -= 1;
            // }
            // game.physics.arcade.collide(enemy, platforms);
            game.physics.arcade.collide(player, platforms);
            game.physics.arcade.collide(player, enemy, blood_down);
            // game.physics.arcade.overlap(enemy, player, kill, null, this);
            game.physics.arcade.overlap(player, gold, collect_gold, null, this);
            game.physics.arcade.overlap(player, latch1, outcome, null, this);
            game.physics.arcade.overlap(weapon.bullets, enemy, kill, null, this);
            game.physics.arcade.overlap(chess1, chess2, win_chess, null, this);
            game.physics.arcade.overlap(player, crown, quitGame, null, this);
            if (fireButton.isDown)
            {
                if(facing === 'left')
                {
                    weapon.bulletSpeed = -400;
                    weapon.trackSprite(player, -15, 50, true);
                    weapon.bulletAngleOffset = -180; 
                    weapon.fire();
                }
                else if(facing === 'right')
                {
                    weapon.bulletSpeed = 400;
                    weapon.trackSprite(player, 100, 50, true);
                    weapon.bulletAngleOffset = 0; 
                    weapon.fire();
                }
            }

            if (game.input.keyboard.addKey(Phaser.Keyboard.K).isDown)
            {
                player.reset(player.x + 100, player.y);
                game.camera.follow(player);
            }
            if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
            {
                // player.reset(player.x, player.y -50);
                // game.camera.follow(player);
                if(facing == "right")
                {
                    attack01();
                }
                if(facing == "left")
                {
                    attack02();
                }
                
            }
            if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown)
            {
                if(magic >= 10)
                {
                    magic_down();
                    if(facing == "right")
                    {
                        attack11();
                    }
                    if(facing == "left")
                    {
                        attack12();
                    }
                }
            }
            if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
            {
                if(magic >= 10)
                {
                    magic_down();
                    if(facing == "right")
                    {
                        skill01();
                    }
                    if(facing == "left")
                    {
                        skill02();
                    }
                } 
            }
            if (game.input.keyboard.addKey(Phaser.Keyboard.U).isDown)
            {
                if(magic < 980 && blue_status == 1)
                {
                    magic_up();  
                    blue_status = 0;
                }
            }
            if (game.input.keyboard.addKey(Phaser.Keyboard.I).isDown)
            {
                if(magic < 9800 && red_status == 1)
                {
                    blood_up();  
                    red_status = 0;
                }
            }

            if (cursors.left.isDown)
            {
                if(player_mode != 0)
                {
                    walk();
                }

                //  Move to the left
                facing = "left";
                player.body.velocity.x = -300;
                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                if(player_mode != 0)
                {
                    walk();
                }
                facing = "right";
                //  Move to the right
                player.body.velocity.x = 300;
                player.animations.play('right');

            }
            else if (cursors.down.isDown)
            {
                if(player_mode != 0)
                {
                    walk();
                }
                //  Move to the right
                player.body.velocity.y = 300;
                player.animations.play('down');
            }
            //Move up
            else if (cursors.up.isDown)
            {
                if(player_mode != 0)
                {
                    walk();
                }
                player.body.velocity.y = -300;
                player.animations.play('down');
            }
            else
            {
                //  Stand still
                if(player_mode == 0)
                {
                    player.animations.stop();
                    player.animations.play('stand');
                }
            }
            land.tilePosition.x = -game.camera.x;
            land.tilePosition.y = -game.camera.y;
        },
    };
};
