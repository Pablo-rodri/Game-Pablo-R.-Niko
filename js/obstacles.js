class Obstacle {
    constructor(ctx, canvasSizeWidth, altura, velocidad) {

        this.ctx = ctx;
        this.width = 100;
        this.height = 80;
        this.posX = canvasSizeWidth;
        this.posY = altura          //canvasSizeHeight - 150
        this.velX = velocidad                   //20;
        this.imageInstance = undefined
        this.obsImage = "piedra2.png"
        this.soundBomb = "audio2.mp3"
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.obsImage}`

        this.soundBonb = new Audio()
        this.soundBonb.src = `img/${this.soundCoin}`

        //this.obsImage2 = new Image()
        // this.obsImage2.src = `img/${this.obsImage2}`


    }

    drawObstacles() { // DIBUJAMOS OBSTACULO
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)

        this.moveObstacles()
    }


    moveObstacles() {
        this.posX -= this.velX;
    }
}