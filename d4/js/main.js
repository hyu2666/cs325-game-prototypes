"use strict";

function make_main_game_state( game )
{

    function createPlayer ()
    {
        player = game.add.sprite(0, 250, 'dude');
        player.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(player);
    }
    function collect(bin, trash)
    {
        trash.kill();
        bottle_music.play();
        // Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    function collect1(bin, trash)
    {
        trash.kill();
        paper_music.play();
        // Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    function collect2(bin, trash)
    {
        trash.kill();
        other_music.play();
        // Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    function collect_wrong(bin, trash)
    {
        trash.kill();
        wrong.play();
        // Add and update the score
        score -= 20;
        scoreText.text = 'Score: ' + score;
    }
    function descend() {

        base.x += 10;

    }


    function preload() {
        game.load.image('hook', 'assets/hook.png');
        game.load.image('map', 'assets/map.bmp');
        game.load.spritesheet('dude', 'assets/player.png', 100, 100);
        game.load.image('bullet', 'assets/water2.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('zhalan', 'assets/zhalan.png');
        game.load.image('zhalan1', 'assets/zhalan1.png');
        game.load.image('wall2', 'assets/left.png');
        game.load.image('plastic', 'assets/plastic3.png');
        game.load.image('paper', 'assets/paper.png');
        game.load.image('other', 'assets/apple.png');
        game.load.image('other_bin', 'assets/bin1.png');
        game.load.image('paper_bin', 'assets/bin2.png');
        game.load.image('plastic_bin', 'assets/bin3.png');
        game.load.audio('bgm', 'assets/bgm.mp3');
        game.load.audio('paper_music', 'assets/paper_music.wav');
        game.load.audio('other_music', 'assets/other_music.wav');
        game.load.audio('bottle_music', 'assets/bottle_music.wav');
        game.load.audio('wrong', 'assets/wrong.mp3');
    }
    var i = 0;
    var cursors;
    var player;
    var land;
    var platforms;
    var weapon;
    var fireButton;
    var facing = 'left';
    var wall;
    var bgm;
    var wrong;
    var bullets;
    var ledge1;
    var bottle_music;
    var other_music;
    var paper_music;
    var paper_bin;
    var other_bin;
    var plastic_bin;
    var base;
    var tempSprite;
    var plastic;
    var paper;
    var other;
    var score = 0;
    var scoreText;
    var tipsText;
    var winText;

    function create() {
        bgm = game.add.audio('bgm');
        bgm.play();
        wrong = game.add.audio('wrong');
        bottle_music = game.add.audio('bottle_music');
        paper_music = game.add.audio('paper_music');
        other_music = game.add.audio('other_music');

        game.world.setBounds(0, 0, 1680, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        land = game.add.tileSprite(0, 0, 1680, 600, 'map');
        land.fixedToCamera = true;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        ledge1 = platforms.create(1280, 0, 'wall');
        ledge1.body.immovable = true;
        ledge1.body.collideWorldBounds = true;
        ledge1 = platforms.create(1280, 150, 'wall');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;
        ledge1 = platforms.create(1280, 300, 'wall');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;
        ledge1 = platforms.create(1280, 450, 'wall');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;

        ledge1 = platforms.create(160, 0, 'wall2');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;

        ledge1 = platforms.create(0, 0, 'zhalan1');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;
        ledge1 = platforms.create(0, 590, 'zhalan1');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;
        ledge1 = platforms.create(1500, 0, 'zhalan1');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;
        ledge1 = platforms.create(1500, 590, 'zhalan1');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;

        ledge1 = platforms.create(1300, 0, 'zhalan');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;

        ledge1 = platforms.create(1300, 590, 'zhalan');
        ledge1.body.collideWorldBounds = true;
        ledge1.body.immovable = true;

        paper_bin = platforms.create(1400, 0, 'paper_bin');
        paper_bin.body.collideWorldBounds = true;
        paper_bin.scale.setTo(0.15, 0.15);
        paper_bin.body.immovable = true;

        other_bin = platforms.create(1400, 200, 'other_bin');
        other_bin.body.collideWorldBounds = true;
        other_bin.scale.setTo(0.15, 0.15);
        other_bin.body.immovable = true;

        plastic_bin = platforms.create(1400, 400, 'plastic_bin');
        plastic_bin.body.collideWorldBounds = true;
        plastic_bin.scale.setTo(0.15, 0.15);
        plastic_bin.body.immovable = true;


        plastic = game.add.group();
        plastic.enableBody = true;
        for (var i = 2; i < 7; i++)
        {
            tempSprite = plastic.create(180 * i, game.world.randomY, 'plastic');
            tempSprite.scale.setTo(0.2, 0.2);
            tempSprite.inputEnabled = true;
            tempSprite.input.enableDrag(false, true);
            game.physics.arcade.enable(tempSprite);
            tempSprite.body.collideWorldBounds = true;
        }

        paper = game.add.group();
        paper.enableBody = true;
        for (var i = 2; i < 7; i++)
        {
            tempSprite = paper.create(170 * i, game.world.randomY, 'paper');
            tempSprite.scale.setTo(0.2, 0.2);
            tempSprite.inputEnabled = true;
            tempSprite.input.enableDrag(false, true);
            game.physics.arcade.enable(tempSprite);
            tempSprite.body.collideWorldBounds = true;
        }

        other = game.add.group();
        other.enableBody = true;
        for (var i = 2; i < 7; i++)
        {
            tempSprite = other.create(150 * i, game.world.randomY, 'other');
            tempSprite.scale.setTo(0.05, 0.05);
            tempSprite.inputEnabled = true;
            tempSprite.input.enableDrag(false, true);
            game.physics.arcade.enable(tempSprite);
            tempSprite.body.collideWorldBounds = true;
        }

        createPlayer();
        game.camera.follow(player);
        player.animations.add('down', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [4, 5, 6, 7], 10, true);
        player.animations.add('right', [8, 9, 10, 11], 10, true);
        player.animations.add('up', [12, 13, 14, 15], 10, true);
        player.animations.add('stand', [0, 1], 3, true);
        player.scale.setTo(0.7, 0.7);

        base = game.add.sprite(180, 250, 'hook');
        game.physics.arcade.enable(base);
        base.anchor.set(0, 0.5);
        base.angle = 0;
        var tween = game.add.tween(base).to( { y: 350 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(descend, this);
        //  Creates 30 bullets, using the 'bullet' graphic
        weapon = game.add.weapon(15, 'bullet');
        weapon.enableBody = true;
        game.physics.arcade.enable(weapon);

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 500;
        weapon.trackSprite(base, 30, 0, true);

        //  The score
        scoreText = game.add.text(1500, 16, 'score: 0', { fontSize: '28px', fill: '#000' });

        tipsText = game.add.text(200, 16, 'Clean the trash on the ice \nfrom the other side of the river', { fontSize: '32px', fill: '#000' });
        tipsText = game.add.text(200, 500, "Using 'a' and 'd' to control water pistol\n and space to shoot", { fontSize: '32px', fill: '#000' });

        winText = game.add.text(1200, 200, 'You Protect the river!', { fontSize: '40px', fill: '#000' });
        winText.visible = false;
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        game.camera.focusOnXY(0, 0);
    }
    
    function update() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        game.world.wrap(player, 16);

        game.physics.arcade.overlap(plastic, plastic_bin, collect, null, this);
        game.physics.arcade.overlap(plastic, other_bin, collect_wrong, null, this);
        game.physics.arcade.overlap(plastic, paper_bin, collect_wrong, null, this);

        game.physics.arcade.overlap(paper, paper_bin, collect1, null, this);
        game.physics.arcade.overlap(paper, other_bin, collect_wrong, null, this);
        game.physics.arcade.overlap(paper, plastic_bin, collect_wrong, null, this);

        game.physics.arcade.overlap(other, other_bin, collect2, null, this);
        game.physics.arcade.overlap(other, plastic_bin, collect_wrong, null, this);
        game.physics.arcade.overlap(other, paper_bin, collect_wrong, null, this)


        game.physics.arcade.collide(weapon.bullets, plastic);
        game.physics.arcade.collide(platforms, plastic);
        game.physics.arcade.collide(plastic, plastic);

        game.physics.arcade.collide(weapon.bullets, paper);
        game.physics.arcade.collide(platforms, paper);
        game.physics.arcade.collide(paper, paper);

        game.physics.arcade.collide(weapon.bullets, other);
        game.physics.arcade.collide(platforms, other);
        game.physics.arcade.collide(other, other);

        game.physics.arcade.collide(plastic, other);
        game.physics.arcade.collide(plastic, paper);
        game.physics.arcade.collide(other, paper);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(weapon.bullets, platforms);
        game.physics.arcade.collide(platforms, platforms);


        if (score >= 140)
        {
            winText.visible = true;
        }
        if (fireButton.isDown)
        {
            weapon.bulletAngleOffset = 0; 
            weapon.fire();
        }

        if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown)
        {
            base.angle -= 2;
        }
        else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown)
        {
            base.angle += 2;
        }
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -600;
            player.animations.play('left');
            facing = 'left';
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 600;
            player.animations.play('right');
            facing = 'right';
        }
        else if (cursors.down.isDown)
        {
            //  Move to the right
            player.body.velocity.y = 600;
            player.animations.play('down');
            facing = 'down';
            base.angle = 180;
        }
        //Move up
        else if (cursors.up.isDown)
        {
            base.angle = 0;
            player.body.velocity.y = -600;
            player.animations.play('up');
 
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
    // You will need to change the paths you pass to "game.load.image()" or any other_bin
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
