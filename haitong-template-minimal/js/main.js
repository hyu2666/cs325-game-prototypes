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


    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    function preload() {
    game.load.image('white', 'assets/white.jpg');
    game.load.image('sky', 'assets/bk3.png');
    // game.load.image('ground', 'assets/black_plat.png');
    game.load.image('ground', 'assets/plat.png');
    game.load.image('star', 'assets/gold3.png');
    game.load.atlasJSONHash('firstaid', 'assets/running_bot.png', 'assets/running_bot.json');
    game.load.spritesheet('dude', 'assets/aaa.png', 32, 23);
    game.load.spritesheet('baddie', 'assets/baddie.png');
    game.load.audio('background', 'assets/Happy_Bee.mp3');
    game.load.audio('weapon_sound', 'assets/weapon_sound.wav');
    game.load.audio('gold_sound', 'assets/gold_sound.mp3');
    game.load.image('bullet', 'assets/shmup-bullet.png');
    }

    var white;
    var player;
    var platforms;
    var cursors;
    var enemy;

    var stars;
    var score = 0;
    var scoreText;
    var lives = 3;
    var livesText;
    var background;
    var diamonds;
    var aliens;
    var stateText;
    var sprite;
    var weapon;
    var fireButton;
    var enemy_x = 0;
    var weapon_sound;
    var gold_sound;
    function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  background music
    background = game.add.audio('background');
    background.play();
    weapon_sound = game.add.audio('weapon_sound');
    gold_sound = game.add.audio('gold_sound');

    //  A simple background for our game
    game.add.sprite(0, 0, 'white');
    game.add.sprite(-50, -100, 'sky');

    
    enemy = game.add.sprite(game.world.width - 450, 475, 'baddie');
    game.physics.arcade.enable(enemy);
    enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 600;
    enemy.body.collideWorldBounds = true;


    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 175, 16, 'Lives : 3', { font: '32px', fill: '#000' });

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 375, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 225, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(0, game.world.height - 300, 'dude');
    player.scale.setTo(2,2);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    // //  Our two animations, walking left and right.
    // player.animations.add('left', [4, 5, 6, 7], 10, true);
    // player.animations.add('right', [8, 9, 10, 11], 10, true);

        //  Our two animations, walking left and right.
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [0, 1, 2, 3], 10, true);


    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');
    weapon.enableBody = true;
    weapon.physicsBodyType = Phaser.Physics.ARCADE;
    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 500;
    weapon.trackSprite(player, 50, 17, true);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // player.anchor.set(0.5);
    // weapon.bulletAngleOffset = 90; 


     // The aliens!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    createAliens();


    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#000' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    //  Finally some stars to collect
    stars = game.add.group();
    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    createStar();

    //  The score
    scoreText = game.add.text(425, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    }

    function update() {
        alien.x -= 1;


    // weapon.fire();
    if (fireButton.isDown)
        {
            weapon.fire();
            weapon_sound.play();
        }
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(enemy, platforms);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(aliens, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, aliens, die, null, this);
    game.physics.arcade.overlap(weapon.bullets, aliens, beat, null, this);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -300;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 300;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 0;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -500;
    }

    if(score >= 60)
    {
        stateText.text=" You Won! \n";
        stateText.visible = true;
    }
    }

    function createStar() {
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 6; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 140, 0, 'star');
            star.scale.setTo(0.8,0.8);
            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.2 + Math.random() * 0.2;
        }

    }
    function createAliens() {
            //  Create a star inside of the 'stars' group   
            alien = aliens.create(620, 0, 'firstaid');
            //  Let gravity do its thing
            alien.body.gravity.y = 300;
            //  This just gives each alien a slightly random bounce value
            alien.body.bounce.y = 0.2 + Math.random() * 0.2;
            alien.animations.add('run');
            alien.animations.play('run', 10, true);
    }

    function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();
    gold_sound.play();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

    }
    function beat (bullet,aliens) {
        
        aliens.kill();
        bullet.kill();

    }

    function die (player,aliens) {
        
        aliens.kill();

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();

            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }

    }
    function restart () {

        //  A new level starts
        
        //resets the life count
        lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        aliens.removeAll();
        createAliens();

        //revives the player
        player.revive();

        //hides the text
        stateText.visible = false;

    }
    };
