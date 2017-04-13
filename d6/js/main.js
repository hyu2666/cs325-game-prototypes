"use strict";

function make_main_game_state( game )
{

    function createPlayer ()
    {
        player = game.add.sprite(700, 300, 'dude');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        player.animations.add('down', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [4, 5, 6, 7], 10, true);
        player.animations.add('right', [8, 9, 10, 11], 10, true);
        player.animations.add('up', [12, 13, 14, 15], 10, true);
        player.animations.add('stand', [0, 1], 3, true);
        player.scale.setTo(0.5, 0.5);
    }
    function createPlayer1 ()
    {
        player1 = game.add.sprite(0, 150, 'dude1');
        game.physics.enable(player1);
        player1.body.collideWorldBounds = true;
        player1.animations.add('down', [0, 1, 2, 3], 10, true);
        player1.animations.add('left', [4, 5, 6, 7], 10, true);
        player1.animations.add('right', [8, 9, 10, 11], 10, true);
        player1.animations.add('up', [12, 13, 14, 15], 10, true);
        player1.animations.add('stand', [0, 1], 3, true);
        player1.scale.setTo(1.2, 1.2);
    }
    function pointer_run()
    {
        
    }
    function turns ()
    {
        if(turn == 0)
        {
            turn = 1;
        }
        else
        {
            turn = 0;
        }
    }
    function time ()
    {
        if(time_turn == 0)
        {
            time_turn = 1;
        }
        else
        {
            num = pointer.y;
        }
    }

    function collect ()
    {
        tempSprite.kill();
        score += 10;
    }

    function collect1 ()
    {
        tempSprite.kill();
        score1 += 10;
    }

    function preload() {
        game.load.spritesheet('dude', 'assets/player.png', 100, 100);
        game.load.spritesheet('dude1', 'assets/player1.png', 32, 48);
        game.load.audio('bgm', 'assets/bgm.mp3');
        game.load.image('1', 'assets/examples/1.png'); 
        game.load.image('gold', 'assets/gold.png'); 
        game.load.image('2', 'assets/examples/2.png'); 
        game.load.image('bar', 'assets/bar.png'); 
        game.load.image('barrier', 'assets/barrier.png'); 
        game.load.image('pointer', 'assets/pointer.png'); 
        game.load.tilemap('tilemap', 'assets/back.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('button', 'assets/button.png');
    }

    var facing = 'left';
    var bgm;
    var back_layer;
    var collision_layer;
    var eat_layer;
    var deco_layer;
    var map;
    var cursors;
    var player;
    var player1;
    var button;
    var button1;
    var turn = 0;
    var time_turn = 0;
    var num = 0;
    var timeText;
    var buttonText;
    var bar;
    var pointer;
    var barrier;
    var startText;
    var score = 0;
    var score1 = 0;
    var scoreText;
    var scoreText1;
    var gold;
    var tempSprite;

    function create() {
        bgm = game.add.audio('bgm');
        bgm.play();
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('1');
        map.addTilesetImage('2');
        back_layer = map.createLayer('Back');
        collision_layer = map.createLayer('Collision');
        eat_layer = map.createLayer('Eat');
        deco_layer = map.createLayer('Decoration');

        map.setCollisionBetween(1, 10000, true, collision_layer); 
        map.setCollisionBetween(1, 10000, true, eat_layer); 
        
        createPlayer();
        createPlayer1()

        gold = game.add.group();
        gold.enableBody = true;
        for (var i = 2; i < 7; i++)
        {
            tempSprite = gold.create(180 * i, game.world.randomY, 'gold');
            game.physics.arcade.enable(tempSprite);
            tempSprite.body.collideWorldBounds = true;
        }

        button = game.add.sprite(0, 500, 'button');
        button.scale.setTo(0.5, 0.5);
        button.inputEnabled = true;
        button.input.useHandCursor = true;
        button.events.onInputDown.add(turns, this);

        button1 = game.add.sprite(0, 400, 'button');
        button1.scale.setTo(0.5, 0.5);
        button1.inputEnabled = true;
        button1.input.useHandCursor = true;
        button1.events.onInputDown.add(time, this);

        bar = game.add.sprite(160, 490, 'bar');
        bar.scale.setTo(0.5, 0.4);

        pointer = game.add.sprite(180, 465, 'pointer');
        pointer.scale.setTo(0.5, 1);
        game.physics.arcade.enable(pointer);

        timeText = game.add.text(500, 15, 'time: ' + num, { fontSize: '32px', fill: '#000000' });
        scoreText = game.add.text(400, 50, 'player1: ' + score, { fontSize: '32px', fill: '#000000' });
        scoreText1 = game.add.text(580, 50, 'player2: ' + score1, { fontSize: '32px', fill: '#000000' });
        buttonText = game.add.text(3, 520, 'End Turn', { fontSize: '30px', fill: '#000000' });
        startText = game.add.text(3, 420, 'Start', { fontSize: '30px', fill: '#000000' });
        cursors = game.input.keyboard.createCursorKeys();

    }
    // 490, 505, 516
    function update() {
        game.physics.arcade.collide(player, collision_layer);
        game.physics.arcade.collide(player1, collision_layer);
        game.physics.arcade.collide(player, eat_layer);
        game.physics.arcade.collide(player, player1);

        game.physics.arcade.overlap(player, tempSprite, collect, null, this);
        game.physics.arcade.overlap(player1, tempSprite, collect1, null, this);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player1.body.velocity.x = 0;
        player1.body.velocity.y = 0;
        if(time_turn == 1)
        {
            if(pointer.y >= 505)
            {
                pointer.body.acceleration.y = -500;
            }
            else if(pointer.y <= 460 || pointer.y >= 550)
            {
                pointer.body.velocity.y = 0;
            }
            else
            {
                pointer.body.acceleration.y = 500;
            }
        }
        if(num > 0)
        {
            num -= 5;
        }

        timeText.text = 'time: ' + num;
        scoreText.text = 'player1: ' + score;
        scoreText1.text = 'player2: ' + score1;
        if(turn == 0 && num > 0)
        {
           if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
           {
               player1.body.velocity.x = -300;
               player1.animations.play('left');
           }
           else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
           {
               player1.body.velocity.x = 300;
               player1.animations.play('right');
           }
           else if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown)
           {
               player1.body.velocity.y = -300;
               player1.animations.play('up');
           }
           else if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown)
           {
               player1.body.velocity.y = 300;
               player1.animations.play('down');
           }
           else
           {
               //  Stand still
               player1.animations.stop();
           } 
        }
        else if(turn == 1 && num > 0)
        {
            if (cursors.left.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -300;
                player.animations.play('left');
                facing = 'left';
            }
            else if (cursors.right.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 300;
                player.animations.play('right');
                facing = 'right';
            }
            else if (cursors.down.isDown)
            {
                //  Move to the right
                player.body.velocity.y = 300;
                player.animations.play('down');
                facing = 'down';
            }
            //Move up
            else if (cursors.up.isDown)
            {
                player.body.velocity.y = -300;
                player.animations.play('up');
            
            }
            else
            {
                //  Stand still
                player.animations.stop();
            }
        }
        else
        {
            player.animations.stop();
            player1.animations.stop();
        }
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
    // You will need to change the paths you pass to "game.load.image()" or any other_bin
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
