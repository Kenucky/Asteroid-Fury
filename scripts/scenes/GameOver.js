class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalTime = data.time || 0;
    }

    create() {
        this.cameras.main.setBackgroundColor('#1a1a1a');

        this.add.text(400, 150, 'Game Over', {
            fontSize: '48px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 230, `Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(400, 280, `Time Survived: ${this.finalTime}s`, {
            fontSize: '28px',
            fill: '#cccccc'
        }).setOrigin(0.5);

    
        this.add.text(400, 380, 'Press SPACE to Restart', {
            fontSize: '24px',
            fill: '#00ffcc'
        }).setOrigin(0.5);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('GameScene');
        }
    }
}


