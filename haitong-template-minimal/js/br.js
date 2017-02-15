window.onload = function() {
    "use strict";

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


    function preload() {

        game.load.image('sky', 'assets/sky.jpg');
        game.load.image('ground', 'assets/platform.jpg');
        game.load.image('meteor', 'assets/meteor.png');
        game.load.image('cowboy', 'assets/cowboy.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.audio('jumping', 'assets/smw_jump.ogg');
        game.load.audio('death', 'assets/smb_mariodie.ogg');
        game.load.audio('collecting', 'assets/smw_coin.ogg');
    }

    var player;
    var platforms;
    var cursors;

    var jumpingSound;
    var deathSound;
    var collectingSound;

    var meteors;
    var diamonds;
    var score = 0;
    var scoreText;
    var stateText;
    function create() {

    // Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Add background
    game.add.sprite(0, 0, 'sky');

    //  Add ground to platforms group
    platforms = game.add.group();

    //   enable physics for platforms object
    platforms.enableBody = true;

    // create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(2, 2);

    //  Stop ground from falling
    ground.body.immovable = true;


    // add player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'cowboy');

    // enable physics on the player
    game.physics.arcade.enable(player);

    //add gravity for player
    player.body.gravity.y = 300;
    //bound player in the map
    player.body.collideWorldBounds = true;


    //  meteors to avoid and diamonds to collect
    meteors = game.add.group();
    diamonds = game.add.group();

    //add game sound 
    jumpingSound = game.add.audio('jumping');
    deathSound = game.add.audio('death');
    collectingSound = game.add.audio('collecting');

    //  enable physics for any meteor and diamonds in a group
    meteors.enableBody = true;
    diamonds.enableBody = true;
    //  create first wave of meteors and diamonds
    for (var i = 0; i < 16; i++)
    {
        //  Create a meteor at random locations
        var meteor = meteors.create(Math.random() * 800, Math.random(), 'meteor');

        //  add random gravity 
        meteor.body.gravity.y = Math.random() * 50;

        //  Create a diamonds at random locations inside of the 'meteors' group
        var diamond = diamonds.create(Math.random() * 800, Math.random(), 'diamond');

        //  add random gravity 
        diamond.body.gravity.y = Math.random() * 50;

    
    }
    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    //add score counter
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


    
}

function update() {
if(player.alive){
    //  cheack for Collide the player, diamonds, and the meteors with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(platforms, meteors, destroyMeteor, null, this);

    game.physics.arcade.collide(platforms, diamonds, destroyDiamond, null, this);

    //  Checks if the player overlaps with  meteors, if he does call the meteorStrike function to kill player
    game.physics.arcade.overlap(player, meteors, meteorStrike, null, this);
//  Checks if the player overlaps with  diamond, if he does call the diamondCatch function to collect diamonds and get points
    game.physics.arcade.overlap(player, diamonds, diamondCatch, null, this);

    //  Reset the players velocity 
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;  
    }

    
    // jump as much as you want
    if (cursors.up.isDown )
    {
        player.body.velocity.y = -200;
        jumpingSound.play(); //jump sound
    }
}
else{
	//Restart Option
	    stateText.text = " You lose, \n Click to restart";
    stateText.visible = true;
game.input.onTap.addOnce(restart,this);
}

}
function restart(){
	//Reset Score
	score = 0;
	scoreText.text = 'Score: ' + score;
	//Restart Assets
	meteors.removeAll();
	diamonds.removeAll();
	    for (var i = 0; i < 16; i++)
    {
        //  Create a meteor at random locations
        var meteor = meteors.create(Math.random() * 800, Math.random(), 'meteor');

        //  add random gravity 
        meteor.body.gravity.y = Math.random() * 50;

        //  Create a diamonds at random locations inside of the 'meteors' group
        var diamond = diamonds.create(Math.random() * 800, Math.random(), 'diamond');

        //  add random gravity 
        diamond.body.gravity.y = Math.random() * 50;

    
    }
    //Move player
    player.reset(32, game.world.height - 150);
	  //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;
 
}

function meteorStrike (player, meteor) {

    // Removes the meteor from the screen
    player.kill();
    deathSound.play();

}

function destroyMeteor(ground, meteor){
    meteor.kill();
//meteor respawn
    for (var i = 0; i < 1; i++)
    {
        //  Create meteors at random spots
        var meteor = meteors.create( Math.random() * 800, Math.random(), 'meteor');

        //  random gravity
        meteor.body.gravity.y = Math.random() * 50;

      
    }

}


function destroyDiamond(ground, diamond){
    diamond.kill();

    for (var i = 0; i < Math.random() * 1; i++)
    {

         //  Create diamonds at random spots
         var diamond = diamonds.create(Math.random() * 800, Math.random(), 'diamond');

        //  random gravity
        diamond.body.gravity.y = Math.random() * 50;
    }

    score -= 2; //lose points for dropped diamonds
    scoreText.text = 'Score: ' + score;

}
function diamondCatch(player, diamond){
    diamond.kill();

    for (var i = 0; i <  1; i++)
    {

         //  Create diamonds at random spots
         var diamond = diamonds.create(Math.random() * 800, Math.random(), 'diamond');

        //  random gravity
        diamond.body.gravity.y = Math.random() * 50;
    }

    score += 10;// gain points for caught diamonds 
    scoreText.text = 'Score: ' + score;
    collectingSound.play();
}

}