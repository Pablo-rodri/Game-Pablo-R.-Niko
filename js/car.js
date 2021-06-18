class Car {

    constructor(ctx, CarPosX, CarPosY, CarWidth, CarHeight, CarSpeed, CarCanvasSize) {
        //this.car = new Car(this.ctx, 30, this.canvasSize.h / 2 + 100, 200, 100, 10, 50); EN GAME.JS
        this.ctx = ctx
        this.carPos = { x: CarPosX, y: CarPosY }
        this.carSize = { w: CarWidth, h: CarHeight }
        this.carImage = "coche rojo.png"
        this.imageInstance = undefined
        this.carSpeed = CarSpeed
        this.canvasSize = CarCanvasSize

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.carImage}`
    }


    drawCar() { // DIBUJAMOS EL COCHE
        this.ctx.drawImage(this.imageInstance, this.carPos.x, this.carPos.y, this.carSize.w, this.carSize.h)

    }

    moveUp() { // DESPLAZAMIENTO AL PRESIONAR LAS TECLAS
        if (this.carPos.y - 150 <= this.canvasSize.h - (this.canvasSize.h / 1.7)) {
            this.carPos.y

        } else {
            this.carPos.y -= 150
        }
    }
    moveDown() {
        if (this.carPos.y + 150 >= this.canvasSize.h) {
            this.carPos.y

        } else {
            this.carPos.y += 150
        }


    }
    /*moveCar() {
        if (this.carPos.y >= this.canvasSize.h - this.carSize.y) {

            this.carPos.y
        }*/

}




