// ============================================================================= //
// - SuperTappyPacket ---------------------------------------------------------- //
// - By Robert Hardy, 2016 ----------------------------------------------------- //
// ============================================================================= //

// Initiation, when browser window loads: Starts game, with dimensions, generates canvas,
// sets browser tab title. The preload function triggers the preloading, followed by the
// create function which creates the game from the preloaded assets.
var mainState = {

	// =========================================================================================================== Preload
	// PRELOAD STATE --------------------------------------------------------------------------------------------- \/
	preload: function() {
		game.load.image('background', 'assets/backgrounds.png');
		game.load.image('tappyPacket', 'assets/tappyPacket.png');
		game.load.image('particles', 'assets/star.png');
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	},



	// =========================================================================================================== Create Text
	// Creates all of the text appearing on the screen ----------------------------------------------------------- \/
	createText: function() {

		// ==============================================================================
		// TITLE TEXT -------------------------------------------------------------------
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
		
		
		// ==============================================================================
		// SUBTITLE TEXT ----------------------------------------------------------------
		// Variable holding the text and creating it upon creation
		subTitle = game.add.text(game.width * 0.5, game.height * 0.5, " Tap, click, or press space to start!");
		
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
		
		
		// ==============================================================================
		// SIGNATURE TEXT ---------------------------------------------------------------
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
		
		// ==============================================================================
		// An event handler for interaction ---------------------------------------------
		game.input.onDown.addOnce(removeTitle, this);
		var pressSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		pressSpace.onDown.add(this.removeTitle, this);
		
	},
	
	
		
	// ================================================================================
	// When player interacts with title screen, this removes the text -----------------
	removeTitle: function() {
		
		title.destroy();
		subTitle.destroy();
		sigText_1.destroy();
		sigText_2.destroy();
		sigText_3.destroy();
		sigText_4.destroy();
		
	},
	
	
	
	// ======================================================================================
	// CREATE STATE -------------------------------------------------------------------------
	create: function() {
			
		// scales game & maintains aspect ratio	
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		// prevent the game from stopping when the page loses focus
		game.stage.disableVisibilityChange = true;
		
		// adds backgrounds image
		game.add.sprite(0, 0, 'background');
		
		// Places Tappy Packet
		this.tappyPacket = game.add.sprite(330, 460, 'tappyPacket');
		
		// Define phsyics
		// game:
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// tappyPacket:
		game.physics.enable(this.tappyPacket, Phaser.Physics.ARCADE);
		this.tappyPacket.body.collideWorldBounds = false;
		this.tappyPacket.body.gravity.y = 1000;
		this.tappyPacket.body.bounce.x = 0.5;
		
		// Adds space bar JUMP to Tappy Packet
		var interactJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		interactJump.onDown.add(this.tappyJump, this);
	},
	
	

	
	// ================================================================================
	// Controls the jumping of Tappy Packet -------------------------------------------
	tappyJump: function() {
		
		this.tappyPacket.body.velocity.y = -350;	
	},
	
	
	// ================================================================================
	// Updates the game 60 times a second, acting as an event loop --------------------
	update: function() {
		
		// If Tappy Packet reaches game world bounds, ends game.
		if (this.tappyPacket.y < 0 || this.tappyPacket.y > 490){
			this.over();
		}

	},
	
	
	// ================================================================================
	// A state for when the player dies, or the game is over --------------------------
	over: function() {
		
		// Stops Tappy Packet from moving
		this.tappyPacket.body.velocity.y = 0;
		this.tappyPacket.body.velocity.x = 0;
		
		// Game over text
		overText = game.add.text(game.width * 0.5, game.height * 0.5, " Game over! ");
		
		// Positioning
		overText.anchor.setTo(0.5);
		overText.padding.x = 100;
		overText.padding.y = 100;
		
		// text properties
		overText.fill = '#FE0002';
		overText.font = 'Courgette';
		overText.fontSize = 180;
		overText.align = 'center';
		overText.stroke = '#000000';
		overText.strokeThickness = 5;
		overText.setShadow(10, 10, 'rgba(0,0,0,0.25)', 10, false, true);
	},
}

// =====================================================================================
// Global variable declarations (Creating the "game"" variable creates the game itself!)
var game = new Phaser.Game(1920, 1080);

// The config used for Google Fonts
WebFontConfig = {
		active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
		
		// An array for all google fonts used in SuperTappyPacket
		google: {
			families: ['Courgette', 'Chewy']
		}
}
	
// Adds a "main" state, called main.
game.state.add('main', mainState);

// STARTS EVERYTHING
game.state.start('main');

