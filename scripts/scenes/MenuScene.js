class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menubg', 'assets/images/menubg.png');
    }
    create() {
        this.add.image(400, 300, 'menubg').setScale(0.63); //bg

        this.add.text(400, 180, 'Asteroid Fury', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 260, 'Press SPACE to Start', {
            fontSize: '28px',
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

