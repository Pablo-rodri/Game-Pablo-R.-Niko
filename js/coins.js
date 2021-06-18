class Coins {
    constructor(ctx, canvasSizeWidth, altura, velocidad, soundCoin) {

        this.ctx = ctx;
        this.width = 50;
        this.height = 100;
        this.posX = canvasSizeWidth;
        this.posY = altura          //canvasSizeHeight - 150
        this.velX = velocidad                   //20;
        this.imageInstance = undefined
        this.coinsImage = "moneda2.png"
        this.soundCoin = "audio2.mp3"

        this.init()
    }

    init() {


        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.coinsImage}`

        this.soundCoin = new Audio()
        this.soundCoin.src = `img/${this.soundCoin}`

    }

    drawCoins() { // DIBUJAMOS OBSTACULO
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)

        this.moveCoins()
    }


    moveCoins() {
        this.posX -= this.velX;
    }
}