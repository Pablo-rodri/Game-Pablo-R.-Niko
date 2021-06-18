class Background { // NECESITAMOS EL CONTEXTO, ANCHO, ALTO Y LA IMAGEN

    constructor(ctx, canvasSizeWidth) {
        this.ctx = ctx;
        this.backwidth = canvasSizeWidth;
        this.backheight = 300;
        this.image = "city.jpg";
        this.imageInstance = undefined;
        this.backPos = { x: 0, y: 0 } // POSICION DE LA IMAGEN
        this.velX = 6; // VELOCIDAD DE LA IMAGEN

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.image}`
    }

    drawBack() { //DIBUJAMOS EL FONDO 
        this.ctx.drawImage(this.imageInstance, this.backPos.x, this.backPos.y, this.backwidth, this.backheight);
        this.ctx.drawImage(this.imageInstance, this.backPos.x + this.backwidth, this.backPos.y, this.backwidth, this.backheight);
        this.moveBack()
    }

    moveBack() { // PARA QUE CORRA LA IMAGEN DE FORMA CONTINUA
        if (this.backPos.x <= -this.backwidth) {
            this.backPos.x = 0;
        }
        this.backPos.x -= this.velX;
    }
}