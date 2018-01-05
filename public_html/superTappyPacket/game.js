// ============================================================================= //
// - SuperTappyPacket ---------------------------------------------------------- //
// - By Robert Hardy, 2016 ----------------------------------------------------- //
// ============================================================================= //

// Initiation, when browser window loads: Starts game, with dimensions, generates canvas,
// sets browser tab title. The preload function triggers the preloading, followed by the
// create function which creates the game from the preloaded assets.
window.onload = function () {

    var game = new Phaser.Game(1920, 1080, Phaser.CANVAS);

    // ========================================================================================================== Fonts
    // START: Google Fonts -------------------------------------------------------------------------------------- \/
    // The config used for Google Fonts
    WebFontConfig = {
        active: function () {
            game.time.events.add(Phaser.Timer.SECOND, preload);
        },

        // An array for all google fonts used in SuperTappyPacket
        google: {
            families: ['Courgette', 'Chewy']
        }
    }
    // END: Google Fonts ---------------------------------------------------------------------------------------- /\
    // ========================================================================================================== Fonts


    // ========================================================================================================== Default
    // START: Default State ------------------------------------------------------------------------------------- \/
    var preload = function (game) {
    }
    preload.prototype = {

        // ----------------------------------------------------------
        // Preload
        preload: function () {
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            game.load.image('background', 'assets/background.png');
            game.load.image('tappyPacket', 'assets/tappyPacket.png');
            //game.load.image('particles', 'assets/star.png');
            game.load.image('maltBroke', 'assets/malt_broke.png');
            game.load.image('maltWhole', 'assets/malt_whole.png');
        },

        // ----------------------------------------------------------
        // Create
        create: function () {
            game.state.start("title");
        }
    }
    // END: Default State --------------------------------------------------------------------------------------- /\
    // ========================================================================================================== Default


    // ========================================================================================================== Globals
    // START: Global Variables & Constants ---------------------------------------------------------------------- \/
    var score = 0;
    var scoreText;
    var text = null;
    var title = null;
    var subTitle = null;
    var sigText_1 = null;
    var sigText_2 = null;
    var sigText_3 = null;
    var sigText_4 = null;
    // END: Global Variables & Constants ------------------------------------------------------------------------ /\
    // ========================================================================================================== Globals


    // ========================================================================================================== Title
    // START: Title State --------------------------------------------------------------------------------------- \/
    var title = function (game) {
    }
    title.prototype = {

        // ------------------------------------------------------------
        // Create
        create: function () {

            // scales game & maintains aspect ratio
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // prevent the game from stopping when the page loses focus
            game.stage.disableVisibilityChange = true;

            // adds backgrounds image
            game.add.sprite(0, 0, 'background');

            // Places Tappy Packet
            tappyPacket = game.add.sprite(330, 460, 'tappyPacket');

            // =======================================================
            // TITLE TEXT --------------------------------------------
            // Variable holding the text and creating it upon creation
            title = game.add.text(game.width * 0.5, game.height * 0.33, "SuperTappyPacket");

            // Positioning
            title.anchor.setTo(0.5);
            title.padding.x = 50;
            title.padding.y = 50;

            // text properties
            title.fill = '#FFFFFF';
            title.font = 'Courgette';
            title.fontSize = 180;
            title.align = 'center';
            title.stroke = '#000000';
            title.strokeThickness = 5;
            title.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);


            // =======================================================
            // SUBTITLE TEXT -----------------------------------------
            // Variable holding the text and creating it upon creation
            subTitle = game.add.text(game.width * 0.5, game.height * 0.5, " Tap, click, or press a key to start!");

            // Positioning
            subTitle.anchor.setTo(0.5);
            subTitle.padding.x = 100;
            subTitle.padding.y = 100;

            // text properties
            subTitle.fill = '#FFFFFF';
            subTitle.font = 'Chewy';
            subTitle.fontSize = 60;
            subTitle.align = 'center';
            subTitle.stroke = '#000000';
            subTitle.strokeThickness = 5;
            subTitle.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);


            // =======================================================
            // SIGNATURE TEXT ----------------------------------------
            // Variable holding the text and creating it upon creation
            sigText_1 = game.add.text(game.width * 0.8, game.height * 0.9, "   A                      based game. ");

            // Positioning
            sigText_1.anchor.setTo(0.5);
            sigText_1.padding.x = 100;
            sigText_1.padding.y = 100;

            // text properties
            sigText_1.fill = '#FFFFFF';
            sigText_1.font = 'Chewy';
            sigText_1.fontSize = 50;
            sigText_1.align = 'right';
            sigText_1.stroke = '#000000';
            sigText_1.strokeThickness = 5;
            sigText_1.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            sigText_2 = game.add.text(game.width * 0.8, game.height * 0.9, " Maltesers             ");

            // Positioning
            sigText_2.anchor.setTo(0.5);
            sigText_2.padding.x = 100;
            sigText_2.padding.y = 100;

            // text properties
            sigText_2.fill = '#FFFFFF';
            sigText_2.font = 'Courgette';
            sigText_2.fontSize = 50;
            sigText_2.align = 'right';
            sigText_2.stroke = '#000000';
            sigText_2.strokeThickness = 5;
            sigText_2.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            sigText_3 = game.add.text(game.width * 0.8, game.height * 0.975, "   By                             2016.    ");

            // Positioning
            sigText_3.anchor.setTo(0.5);
            sigText_3.padding.x = 100;
            sigText_3.padding.y = 100;

            // text properties
            sigText_3.fill = '#FFFFFF';
            sigText_3.font = 'Chewy';
            sigText_3.fontSize = 50;
            sigText_3.align = 'right';
            sigText_3.stroke = '#000000';
            sigText_3.strokeThickness = 5;
            sigText_3.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            sigText_4 = game.add.text(game.width * 0.8, game.height * 0.975, " Robert Hardy     ");

            // Positioning
            sigText_4.anchor.setTo(0.5);
            sigText_4.padding.x = 100;
            sigText_4.padding.y = 100;

            // text properties
            sigText_4.fill = '#FFFFFF';
            sigText_4.font = 'Courgette';
            sigText_4.fontSize = 50;
            sigText_4.align = 'right';
            sigText_4.stroke = '#000000';
            sigText_4.strokeThickness = 5;
            sigText_4.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // =======================================================
            // An event handler for interaction ----------------------
            game.input.onDown.add(this.startGame, this);
            game.input.onTap.add(this.startGame, this);
            var pressSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            pressSpace.onDown.add(this.startGame, this);
        },
        // method to call on user input click
        startGame: function () {
            game.state.start("play");
        }
    }
    // END: Title State ----------------------------------------------------------------------------------------- /\
    // ========================================================================================================== Title


    // ========================================================================================================== Play
    // START: Play State ---------------------------------------------------------------------------------------- \/
    var play = function (game) {
    }
    play.prototype = {

        // ----------------------------------------------------------
        // Create
        create: function () {
            // ==================================================================== Game Settings
            // GAME SETTINGS ------------------------------------------------------ \/
            // scales & maintains aspect ratio
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // prevent the game from stopping when the page loses focus
            game.stage.disableVisibilityChange = true;

            // adds backgrounds image
            game.add.sprite(0, 0, 'background');

            // Define phsyics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // set gravity (pixels per second - 400 is quite realistic)
            // game.physics.arcade.gravity.y = 1000;

            // turn on cursor keys
            cursors = game.input.keyboard.createCursorKeys();
            // -------------------------------------------------------------------- /\


            // ==================================================================== Tappy Packet
            // TAPPY PACKET ------------------------------------------------------- \/
            // Add to game
            tappyPacket = game.add.sprite(330, 460, 'tappyPacket');

            // Scale & anchor of Tappy Packet
            tappyPacket.scale.setTo(1, 1);
            tappyPacket.anchor.setTo(.5, .5);

            // Adds physics to Tappy Packet:
            game.physics.arcade.enable(tappyPacket);
            tappyPacket.body.gravity.y = 850;

            // Adds collision to Tappy Packet
            tappyPacket.body.collideWorldBounds = false;

            // Adds bounce upon object collision
            tappyPacket.body.bounce.x = 0.5;
            tappyPacket.body.bounce.y = 0.5;

            // Defines collision box size
            tappyPacket.body.width = 100;
            tappyPacket.body.height = 160;


            // Adds space bar and tap JUMP to Tappy Packet
            var interactJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            interactJump.onDown.add(this.tappyJump, this);
            game.input.onDown.add(this.tappyJump, this);
            // -------------------------------------------------------------------- /\


            // ==================================================================== Obstacles
            // Maltesers Balls OBSTACLES ------------------------------------------ \/
            // Creates a group to hold all of the obstacles.
            this.obstacleGroup = game.add.group();

            // -------------------------------------------------------------------- /\


            // ==================================================================== Timer
            // Maltesers Balls TIMER ---------------------------------------------- \/
            // Creates a timer to spawn new obstacles every 1.5 seconds.
            this.obstacleTimer = game.time.events.loop(2000, this.addObstaclesWorld, this);

            // -------------------------------------------------------------------- /\


            // ==================================================================== Score
            // Score Text --------------------------------------------------------- \/
            // Creates a timer to spawn new obstacles every 1.5 seconds.
            this.score = -3;
            this.scoreText = game.add.text(game.width * 0.5, game.height * 0.1, "Your score: " + this.score);

            // Positioning
            this.scoreText.anchor.setTo(0.5);
            this.scoreText.padding.x = 100;
            this.scoreText.padding.y = 100;

            // text properties
            this.scoreText.fill = 'FFFFFF';
            this.scoreText.addColor('#FFFFFF', 0);
            this.scoreText.addColor('#FE0002', 11);
            this.scoreText.font = 'Chewy';
            this.scoreText.fontSize = 60;
            this.scoreText.align = 'center';
            this.scoreText.stroke = '#000000';
            this.scoreText.strokeThickness = 5;
            this.scoreText.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);
            // -------------------------------------------------------------------- /\
        },


        // ===============================================================X
        // TAPPY JUMP ----------------------------------------------------X
        tappyJump: function () {
            // Rapidly increase vertical velocity per jump
            tappyPacket.body.velocity.y = -425;

            // Create an animation on the packet
            // Changes the angle of Tappy Packet to -10° 1/10 second
            // Starts the animation
            var animation = game.add.tween(tappyPacket).to({angle: -10}, 100).start();
        },


        // ===============================================================X
        // OBSTACLE Properties -------------------------------------------X
        addObstacleSingle: function (x, y) {

            // Adds one to position x and y, chooses image randomly to show
            // either broken or whole malteser.
            var obstacleSingle = Math.random() < 0.5 ? game.add.sprite(x, y, 'maltWhole') : game.add.sprite(x, y, 'maltBroke');

            // Adds it to the group
            this.obstacleGroup.add(obstacleSingle);

            // Adds phsyics to it
            game.physics.arcade.enable(obstacleSingle);

            // Add side scrolling to it
            obstacleSingle.body.velocity.x = -200;
            obstacleSingle.body.mass = 0;

            obstacleSingle.anchor.setTo(0.5);

            obstacleSingle.body.width = 40;
            obstacleSingle.body.height = 40;

            // Remove when out of screen (as not to fill memory)
            obstacleSingle.checkWorldBounds = true;
            obstacleSingle.outOfBoundsKill = true;
        },


        // ===============================================================X
        // Adding OBSTACLES ----------------------------------------------X
        addObstaclesWorld: function () {

            // Defines gap where player can jump through
            // Maltesers balls can be stacked 20 high in world space
            // gap will always be away from top and bottom edges,
            // so minus 1 and add 1 to height.
            // Using Math.floor rounds the number to nearset integer
            // Using Math.random choses a random decimal between 0 and 1.
            var gap = Math.floor(Math.random() * 6) + 1;

            // Add the pipes
            // With hole at position "gap" and "gap + 1"
            for (var g = 0; g < 10; g++) {
                if (g != gap && g != gap + 1 && g != gap + 2) {
                    this.addObstacleSingle(game.width, g * 110 + 10);
                }
                ;
            }
            ;

            // Increases score when new line spawned
            this.score += 1;
            this.scoreText.text = "Your score: " + this.score;
        },


        // ===============================================================X
        // UPDATE --------------------------------------------------------X
        update: function () {
            // check if Tappy Packet goes out of world heights
            if (tappyPacket.y <= 0 || tappyPacket.y >= 1080) {
                this.over();
            }
            ;

            if (tappyPacket.x < game.width * 0.35) {
                tappyPacket.body.velocity.x += 1;
            } else if (tappyPacket.x >= game.width * 0.4) {
                tappyPacket.body.velocity.x = 0;
            }
            ;

            // Collision detection
            game.physics.arcade.overlap(tappyPacket, this.obstacleGroup, this.over);

            // Tappy Packet animation
            if (tappyPacket.angle < 10) {
                tappyPacket.angle += 1;
            }
            ;
        },


        // ===============================================================X
        // Game over, triggers game over state ---------------------------X
        over: function () {
            game.state.start("over");
        },


        /*
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                 (Uncomment to view collision boxes)
        // ------------- DEBUGGING -----------------
        render: function() {
        // Displays the collision box for debug
        game.debug.body(tappyPacket);

        // Extracts each member of the obstacle group and submits for debug
        this.obstacleGroup.forEachAlive(this.renderGroup, this);
        },

        // Renders the submitted obstacles
        renderGroup: function(member) {
        game.debug.body(member);
        }
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        */

    }
    // END: Play State ------------------------------------------------------------------------------------------ /\
    // ========================================================================================================== Play


    // ========================================================================================================== Over
    // START: Over State ---------------------------------------------------------------------------------------- \/
    var over = function (game) {
    }
    over.prototype = {
        create: function () {
            // draw backgrounds
            game.add.sprite(0, 0, 'background');

            // ---------------------------------------------------------------------------X
            // Game over text
            overText = game.add.text(game.width * 0.5, game.height * 0.33, " Game over! ");

            // Positioning
            overText.anchor.setTo(0.5);
            overText.padding.x = 50;
            overText.padding.y = 50;

            // text properties
            overText.fill = '#FFFFFF';
            overText.font = 'Courgette';
            overText.fontSize = 180;
            overText.align = 'center';
            overText.stroke = '#000000';
            overText.strokeThickness = 5;
            overText.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);
            // ---------------------------------------------------------------------------X
            // Game over text sub title
            overSub = game.add.text(game.width * 0.5, game.height * 0.5, " You ran out of lives!");

            // Positioning
            overSub.anchor.setTo(0.5);
            overSub.padding.x = 100;
            overSub.padding.y = 100;

            // text properties
            overSub.fill = '#FE0002';
            overSub.font = 'Chewy';
            overSub.fontSize = 60;
            overSub.align = 'center';
            overSub.stroke = '#000000';
            overSub.strokeThickness = 5;
            overSub.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);
            // ---------------------------------------------------------------------------X
            // Game over help text
            overHelp = game.add.text(game.width * 0.5, game.height * 0.6, " Tap, click, or press space to restart!");

            // Positioning
            overHelp.anchor.setTo(0.5);
            overHelp.padding.x = 100;
            overHelp.padding.y = 100;

            // text properties
            overHelp.fill = '#FFFFFF';
            overHelp.font = 'Chewy';
            overHelp.fontSize = 60;
            overHelp.align = 'center';
            overHelp.stroke = '#000000';
            overHelp.strokeThickness = 5;
            overHelp.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);
            // ---------------------------------------------------------------------------X

            // =======================================================
            // SIGNATURE TEXT ----------------------------------------
            // Variable holding the text and creating it upon creation
            overSig_1 = game.add.text(game.width * 0.8, game.height * 0.9, "   A                      based game. ");

            // Positioning
            overSig_1.anchor.setTo(0.5);
            overSig_1.padding.x = 100;
            overSig_1.padding.y = 100;

            // text properties
            overSig_1.fill = '#FFFFFF';
            overSig_1.font = 'Chewy';
            overSig_1.fontSize = 50;
            overSig_1.align = 'right';
            overSig_1.stroke = '#000000';
            overSig_1.strokeThickness = 5;
            overSig_1.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            overSig_2 = game.add.text(game.width * 0.8, game.height * 0.9, " Maltesers             ");

            // Positioning
            overSig_2.anchor.setTo(0.5);
            overSig_2.padding.x = 100;
            overSig_2.padding.y = 100;

            // text properties
            overSig_2.fill = '#FFFFFF';
            overSig_2.font = 'Courgette';
            overSig_2.fontSize = 50;
            overSig_2.align = 'right';
            overSig_2.stroke = '#000000';
            overSig_2.strokeThickness = 5;
            overSig_2.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            overSig_3 = game.add.text(game.width * 0.8, game.height * 0.975, "   By                             2016.    ");

            // Positioning
            overSig_3.anchor.setTo(0.5);
            overSig_3.padding.x = 100;
            overSig_3.padding.y = 100;

            // text properties
            overSig_3.fill = '#FFFFFF';
            overSig_3.font = 'Chewy';
            overSig_3.fontSize = 50;
            overSig_3.align = 'right';
            overSig_3.stroke = '#000000';
            overSig_3.strokeThickness = 5;
            overSig_3.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // -----------------------------------------------------
            overSig_4 = game.add.text(game.width * 0.8, game.height * 0.975, " Robert Hardy     ");

            // Positioning
            overSig_4.anchor.setTo(0.5);
            overSig_4.padding.x = 100;
            overSig_4.padding.y = 100;

            // text properties
            overSig_4.fill = '#FFFFFF';
            overSig_4.font = 'Courgette';
            overSig_4.fontSize = 50;
            overSig_4.align = 'right';
            overSig_4.stroke = '#000000';
            overSig_4.strokeThickness = 5;
            overSig_4.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);

            // add user input
            game.input.onDown.add(this.restartGame, this);
            game.input.onTap.add(this.restartGame, this);
            var pressSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            pressSpace.onDown.add(this.restartGame, this);

        },
        // method to call on user input click
        restartGame: function () {
            //reset variables etc.
            game.state.start("play");
        }
    }
    // END: Over State ------------------------------------------------------------------------------------------ /\
    // ========================================================================================================== Over


    game.state.add("preload", preload);
    game.state.add("title", title);
    game.state.add("play", play);
    game.state.add("over", over);

    // kick things off
    game.state.start("preload");
}