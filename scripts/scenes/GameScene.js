class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('projectile', 'assets/images/projectile.png');
        this.load.image('obstacle', 'assets/images/obstacle.png');

        this.load.audio('bgm', 'assets/audio/bgm.mp3');
        this.load.audio('shoot', 'assets/audio/shoot.wav');
        this.load.audio('hit', 'assets/audio/hit.mp3');
    }

    create() {
        this.add.image(400, 300, 'background').setScrollFactor(0); //bg

        //score
        this.score = 0; 
        this.timeSurvived = 0;

        //add player
        this.player = this.physics.add.sprite(400, 550, 'player')
        .setCollideWorldBounds(true)
        .setScale(0.25);

        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //setup physics for projectiles and obstacles
        this.projectiles = this.physics.add.group();
        this.obstacles = this.physics.add.group();

    
        this.spawnObstacle();


        //timer event for spawning obstacles (*spawns every 1.2 seconds)
        this.time.addEvent({
            delay: 1200,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });

        //ui elements
        this.timerText = this.add.text(16, 16, 'Time: 0', { fontSize: '20px', fill: '#fff' });
        this.scoreText = this.add.text(16, 40, 'Score: 0', { fontSize: '20px', fill: '#fff' });

        //bgm  & audio
        this.bgm = this.sound.add('bgm', { loop: true, volume: 0.3 });
        this.bgm.play();

        this.shootSound = this.sound.add('shoot');
        this.hitSound = this.sound.add('hit');

        //collisions for assets
        this.physics.add.overlap(this.projectiles, this.obstacles, this.handleHit, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.endGame, null, this);
    }

    update(time, delta) {
        //A and D keys for movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        } else {
            this.player.setVelocityX(0);
        }

        //spacebar for shooting
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootProjectile();
        }

        //timer 
        this.timeSurvived += delta;
        this.timerText.setText('Time: ' + Math.floor(this.timeSurvived / 1000));

        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle.y > 600) {
                obstacle.destroy();
                this.spawnObstacle();
            }
        });
    }

    //functions
    shootProjectile() {
        const projectile = this.projectiles.create(this.player.x, this.player.y - 20, 'projectile')
        .setVelocityY(-400)
        .setScale(0.02);
        this.shootSound.play();
        this.shootSound.setVolume(0.5);
    }

    spawnObstacle() {
        const x = Phaser.Math.Between(50, 750); //randomizer for x
        const obstacle = this.obstacles.create(x, -20, 'obstacle')
        .setVelocityY(150)
        .setScale(0.1);
    }

    handleHit(projectile, obstacle) {
        projectile.destroy();
        obstacle.destroy();
        this.hitSound.play();

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    endGame() {
        this.bgm.stop();
        this.scene.start('GameOver', {
            score: this.score,
            time: Math.floor(this.timeSurvived / 1000)
        });
    }
}


