let gameState = {

}



class mainScene {
    currentIndex = 0;

    preload(){
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', { frameWidth: 131, frameHeight: 200});
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', { frameWidth: 212, frameHeight:200});
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', { frameWidth: 297, frameHeight: 200});
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', { frameWidth: 244, frameHeight: 200});
        this.load.image('arrow', 'assets/images/arrow.png');

        this.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
        this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
        this.load.audio('pigSound', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
        this.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);
    }

    create() {
        gameState.background = this.add.image(0, 0, 'background').setOrigin(0,0);
        
        let animal;
        let animals = [ 
            {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'}, 
            {key: 'horse', text: 'HORSE', audio: 'horseSound'}, 
            {key: 'pig', text: 'PIG', audio: 'pigSound'}, 
            {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}];

        gameState.animals = this.add.group();

        for (let item of animals) {
            animal = this.add.sprite(-1000, this.physics.world.bounds.centerY, item.key);
            animal.setInteractive({ pixelPerfect: true});
            animal.customParams = {text: item.text, sound: this.sound.add(item.audio)};
            gameState.animals.add(animal);
            animal.setName(item.key);
            
            this.anims.create({
                key: item.key,
                frames: this.anims.generateFrameNumbers(item.key, {frames: [0, 1, 2, 1, 0, 1, 0]}),
                frameRate: 3,
                repeat: 0
            })

            animal.on('pointerup', function () {
                this.play(this.name);
                this.customParams.sound.play();
                // console.log(this)
                // gameState.animals.playAnimation('animate');
            })
        }

        // console.log(this.currentIndex);
        if (this.currentIndex < gameState.animals.getLength()){
            gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex];
            gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
            gameState.currentText = this.add.text(this.physics.world.bounds.centerX, this.physics.world.bounds.height * 0.85, gameState.currentAnimal.customParams.text, { font: 'bold 20pt Arial', align: 'center', color: '#D71A1C'});
            gameState.currentText.setX(this.physics.world.bounds.centerX - gameState.currentText.width/2);
        }
        // gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex];
        // gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);

        // console.log(this.physics.world.bounds);
        
        
        gameState.rightArrow = this.add.sprite(580, this.physics.world.bounds.centerY, 'arrow');
        gameState.rightArrow.customParams = {direction: 1};
        gameState.rightArrow.setInteractive();

        // gameState.rightArrow.on('pointerup', this.next);
        
        
        gameState.rightArrow.on('pointerup', () => {
            gameState.currentText.visible = false;
            if (this.currentIndex + gameState.rightArrow.customParams.direction >= gameState.animals.getLength()) {
                // gameState.currentAnimal.x = this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                gameState.ToLeft = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: - (this.physics.world.bounds.width + gameState.currentAnimal.width/2),
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0
                })
                this.currentIndex = 0;
                gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex];
                gameState.currentAnimal.x = this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                gameState.fromRight = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.centerX,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0,
                    onComplete: () => {
                        gameState.currentText.setText(gameState.currentAnimal.customParams.text);
                        gameState.currentText.setX(this.physics.world.bounds.centerX - gameState.currentText.width/2);
                        gameState.currentText.visible = true;
                    }
                })
                // gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
                // console.log(this.currentIndex);
            } else{
                // gameState.currentAnimal.x = this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                gameState.ToLeft = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: - (this.physics.world.bounds.width + gameState.currentAnimal.width/2),
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0
                })
                gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex + gameState.rightArrow.customParams.direction];
                gameState.currentAnimal.x = this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                console.log(gameState.currentAnimal.isMoving);
                gameState.fromRight = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.centerX,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0,
                    onComplete: () => {
                        gameState.currentText.setText(gameState.currentAnimal.customParams.text);
                        gameState.currentText.setX(this.physics.world.bounds.centerX - gameState.currentText.width/2);
                        gameState.currentText.visible = true;
                    }
                })
                // gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
                this.currentIndex++;
            }
            // }
            
            // console.log(this.currentIndex);
            // console.log(gameState.animals.getChildren());
        });
        
        
        gameState.leftArrow = this.add.sprite(60, this.physics.world.bounds.centerY, 'arrow');
        gameState.leftArrow.setFlipX(-1);
        gameState.leftArrow.customParams = {direction: -1};
        gameState.leftArrow.setInteractive();
        // console.log(this)
        gameState.leftArrow.on('pointerup', () => {
            gameState.currentText.visible = false;
            if (this.currentIndex + gameState.leftArrow.customParams.direction < 0) {
                // gameState.currentAnimal.x -= this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                gameState.ToRight = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.width + gameState.currentAnimal.width/2,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0
                })
                this.currentIndex = gameState.animals.getLength() - 1;
                gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex];
                gameState.currentAnimal.x = -(this.physics.world.bounds.width + gameState.currentAnimal.width/2);
                gameState.fromLeft = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.centerX,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0,
                    onComplete: () => {
                        gameState.currentText.setText(gameState.currentAnimal.customParams.text);
                        gameState.currentText.setX(this.physics.world.bounds.centerX - gameState.currentText.width/2);
                        gameState.currentText.visible = true;
                    }
                })
                // gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
            } else{
                // gameState.currentAnimal.x -= this.physics.world.bounds.width + gameState.currentAnimal.width/2;
                gameState.ToRight = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.width + gameState.currentAnimal.width/2,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0
                });
                gameState.currentAnimal = gameState.animals.getChildren()[this.currentIndex + gameState.leftArrow.customParams.direction];
                gameState.currentAnimal.x = -(this.physics.world.bounds.width + gameState.currentAnimal.width/2);
                gameState.fromLeft = this.tweens.add({
                    targets: gameState.currentAnimal,
                    x: this.physics.world.bounds.centerX,
                    ease: 'Linear',
                    duration: 1000,
                    repeat: 0,
                    onComplete: () => {
                        gameState.currentText.setText(gameState.currentAnimal.customParams.text);
                        gameState.currentText.setX(this.physics.world.bounds.centerX - gameState.currentText.width/2);
                        gameState.currentText.visible = true;
                    }
                })
                // gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
                this.currentIndex--;
            }

            

            

        });
    }

    update() {
        
    }

    animateAnimal(sprite) {
        // console.log(sprite);
        // sprite.play('animate');
        
        // gameState.animals.playAnimation('animate');
    }

    next() {
        if (gameState.currentAnimal)
        {
            //  Wrap the cursor?
            if (gameState.currentIndex >= gameState.animals.getLength() - 1)
            {
                gameState.currentIndex = 0;
            }
            else
            {
                gameState.currentIndex++;
            }
    
            gameState.currentAnimal = gameState.animals.getChildren()[gameState.currentIndex];
    
            return gameState.currentAnimal;
            gameState.currentAnimal.setPosition(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
        }
    
    }

    previous() {

        if (gameState.currentAnimal)
        {
            //  Wrap the cursor?
            if (gameState.currentIndex === 0)
            {
                gameState.currentIndex = gameState.animals.getLength() - 1;
            }
            else
            {
                gameState.currentIndex--;
            }
    
            gameState.currentAnimal = gameState.animals.getChildren()[gameState.currentIndex];
    
            return gameState.currentAnimal;
        }
    
    }
}



const config = {
    pixelArt: true,
    width: 640,
    height: 360,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: mainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    
}

const game = new Phaser.Game(config);