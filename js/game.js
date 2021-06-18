const gameApp = {
    name: 'Crazy Drive',
    description: 'Canvas app drive',
    version: '1',
    author: 'Nicolas y Pablo Rodríguez',
    license: undefined,
    repository: undefined,
    ctx: undefined,
    canvasDOM: undefined,
    canvasSize: { w: undefined, h: undefined }, // como se estan definiendo abajo aqui podrian ser sus valores "undefined"

    sound: undefined,
    soundCoin: undefined,
    car: undefined,
    bomb: undefined,
    background: undefined,
    velocidad: 1,
    gameOverImage: undefined,
    score: 0,
    lives: 3,
    obstacles: [],
    FPS: 60,
    framesCounter: 0,
    coins: [],


    init() { // LO QUE SE VE AL ABRIR EL NAVEGADOR
        this.reset()
        this.setContext() // inicializido el contexto 
        this.setDimensions() // inicializo el canvas (su dimesion)
        this.setListeners()
        this.createSound()
        this.createAll()
        this.drawAll()
        this.drawAll2()
        this.sound.play()
        this.sound.volume = 0.3
        this.drawLives()
        this.start()

    },
    //STAR (CON EL SETINTERVAL)
    start() {

        this.interval = setInterval(() => { //HAY QUE ASIGNARLO A THIS.INTERVAL PARA FINALIZAR EL JUEGO
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++ //PARA EVITAR CONSUMO DE MEMORIA
            this.clear() //LIMPIAR LA PANTALLA
            this.clearObstacles()
            this.clearCoins()
            this.drawAll() //DIBUJAR TODO
            this.insertObstacles()
            this.drawAll2()
            this.drawScore()

            if (this.lives === 0) {
                this.gameOver()
            }

            this.insertCoins()
            this.isCollision() ? this.gameOver() : null
            this.collisionCoins() ? this.gameWin : null

        }, 20)
    },
    //RESET
    reset() {
        this.obstacles = []
        this.coins = []
        this.lives = 3
        this.framesCounter = 0
        this.score = 0
        this.car = new Car(this.ctx, 30, this.canvasSize.h / 2 + 100, 200, 100, 10, this.canvasSize);
        this.background = new Background(this.ctx, this.canvasSize.w)
    },
    //LIMPIAR LA PANTALLA
    clear() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createAll() {
        this.insertCar() //insertamos el coche
        this.insertBackground()

    },
    // DRAWALL
    drawAll() { // DIBUJA TODO . LE PASA EL FRAMESCOUNTER
        this.drawRoad()
        this.car.drawCar()
        this.background.drawBack()
        //this.drawLives()
        this.obstacles.forEach(obs => obs.drawObstacles())


    },
    //DRAWALL2
    drawAll2() {

        this.coins.forEach(elm => elm.drawCoins())

    },
    //CONTEXTO
    setContext() {
        this.ctx = document.querySelector("#canvas").getContext("2d")
    },
    //DIMENSION
    setDimensions() {
        this.canvasSize.w = window.innerWidth / 1.2
        this.canvasSize.h = window.innerHeight / 1.2
        document.querySelector("#canvas").setAttribute("width", this.canvasSize.w)
        document.querySelector("#canvas").setAttribute("height", this.canvasSize.h)
    },
    //DIBUJAMOS LA CARRETERA
    drawRoad() {

        //void ctx.fillRect(x, y, width, height);
        this.ctx.fillStyle = "green"// realizo un rectangulo verde que ocupe todo el canvasSize
        this.ctx.fillRect(0, this.canvasSize.h / 2 - 100, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillStyle = "grey"
        this.ctx.fillRect(30, this.canvasSize.h / 2 - 80, this.canvasSize.w, this.canvasSize.h / 1.7)

        //LINEAS BLANCAS LATERALES
        //LINEA INFERIOR
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 6
        this.ctx.beginPath() // Esta función sirve para decirle al contexto del canvas que vamos a empezar a dibujar un camino
        this.ctx.setLineDash([0])
        this.ctx.moveTo(30, this.canvasSize.h / 2 - 80) //this.ctx.moveTo(posicion x, posicion y) INICIAL DE LA LINEA
        //this.ctx.lineTo(posicion x, posicion y) FINAL DE LA LINEA DE LA LINEA
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 2 - 80)
        this.ctx.stroke() // DIBUJA EL TRAZO DEL PUNTO INICIAL AL FINAL


        //LINEA CONTINUA SUPERIOR
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 6
        this.ctx.beginPath() // Esta función sirve para decirle al contexto del canvas que vamos a empezar a dibujar un camino
        this.ctx.setLineDash([0])
        this.ctx.moveTo(30, this.canvasSize.h / 2 + 370) //this.ctx.moveTo(posicion x, posicion y) INICIAL DE LA LINEA
        //this.ctx.lineTo(posicion x, posicion y) FINAL DE LA LINEA DE LA LINEA
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 2 + 370)
        this.ctx.stroke() // DIBUJA EL TRAZO DEL PUNTO INICIAL AL FINAL


        this.ctx.lineWidth = 10
        this.ctx.strokeStyle = 'white'
        this.ctx.beginPath()
        this.ctx.setLineDash([70, 30])
        this.ctx.moveTo(30, this.canvasSize.h / 2 + 60) //moveTo(posicion x, posicion y) INICIAL DE LA LINEA
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 2 + 60)
        this.ctx.stroke()


        this.ctx.lineWidth = 10
        this.ctx.strokeStyle = 'white'
        this.ctx.beginPath()
        this.ctx.setLineDash([70, 30])
        this.ctx.moveTo(30, this.canvasSize.h / 2 + 220) //moveTo(posicion x, posicion y) INICIAL DE LA LINEA
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 2 + 220)
        this.ctx.stroke()

    },
    // INSERTAMOS IMAGEN COCHE
    insertCar() {
        this.car = new Car(this.ctx, 30, this.canvasSize.h / 2 + 100, 200, 100, 10, this.canvasSize);

    },
    // INSERTAMOS IMAGEN BACKGROUND
    insertBackground() {
        this.background = new Background(this.ctx, this.canvasSize.w)
    },

    //INSERTAR OBSTACULOS
    insertObstacles() {
        if (this.framesCounter % 150 === 0) {
            //constructor(ctx, canvasSize, obstaclePosY)       
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w + 500, this.canvasSize.h - 420, this.velocidad * 15)) //carril superior
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w + 1500, this.canvasSize.h - 120, this.velocidad * 15)) // carril inferior
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w + 1000, this.canvasSize.h - 275, this.velocidad * 15)) // carril central
        }
    },
    //LIMPIAR OBSTACULOS
    clearObstacles() {
        this.obstacles = this.obstacles.filter(elm => elm.posX + 400 >= 0) // AL SALIR FUERA DE LA PANTALLA LOS ELIMINAMOS
    },
    //INSERTAR MONEDAS
    insertCoins() {
        if (this.framesCounter % 120 === 0) {
            //constructor(ctx, canvasSize, obstaclePosY)       
            this.coins.push(new Coins(this.ctx, this.canvasSize.w + 1500, this.canvasSize.h - 440, this.velocidad * 15)) //carril superior
            this.coins.push(new Coins(this.ctx, this.canvasSize.w + 100, this.canvasSize.h - 150, this.velocidad * 15)) // carril central
            this.coins.push(new Coins(this.ctx, this.canvasSize.w + 900, this.canvasSize.h - 300, this.velocidad * 15)) // carril inferior
        }
    },
    //LIMPIAR MONEDAS
    clearCoins() {
        this.coins = this.coins.filter(elm => elm.posX + 200 >= 0)
    },

    // TECLAS DE CONTROL DEL COCHE
    setListeners() {
        document.onkeydown = e => {
            e.key === 'ArrowUp' ? this.car.moveUp() : null
            console.log(e.key)
            e.key === 'ArrowDown' ? this.car.moveDown() : null
        }
    },

    //COLISION PIEDRAS
    isCollision() {
        return this.obstacles.some((obs, idx) => {
            if (
                this.car.carPos.x + this.car.carSize.w >= obs.posX &&
                this.car.carPos.y + this.car.carSize.h >= obs.posY &&
                this.car.carPos.y <= obs.posY + obs.height &&
                this.car.carPos.x <= obs.posX + obs.width
            ) {
                this.deleteObstacle(idx)
                this.lives--
                this.soundBomb.play()
                this.drawLives()

            }
        })

    },
    //ELIMINAR VIDAS CONTRA OBSTACULOS
    deleteObstacle(idx) {
        this.obstacles.splice(idx, 1)
    },

    //COLISION MONEDAS
    collisionCoins() {
        return this.coins.some((obs, idx) => {
            if (
                this.car.carPos.x + this.car.carSize.w >= obs.posX &&
                this.car.carPos.y + this.car.carSize.h >= obs.posY &&
                this.car.carPos.y <= obs.posY + obs.height &&
                this.car.carPos.x <= obs.posX + obs.width
            ) {
                this.soundCoin.play()
                this.deleteCoin(idx)
                this.score++

                if (this.score === 10) {
                    return this.gameWin()

                }
            }
        })

    },

    deleteCoin(idx) {
        this.coins.splice(idx, 1)
    },
    // DIBUJAR CONTADOR
    drawScore() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '60px Comic Sans';
        this.ctx.fillText("SCORE" + " :" + this.score, this.canvasSize.w - 300, 70);

    },

    drawBomb() {
        //    this.bomb = new obs(this.ctx, 30, this.canvasSize.h / 2 + 100, 200, 100, 10, this.canvasSize);
    },
    // IMAGEN VIDAS
    drawLives() {

        let container = document.querySelector('.heart')
        container.innerHTML = ''

        for (i = 0; i < this.lives; i++) {
            let corazon = document.createElement('img')
            corazon.src = './img/heart.png'
            console.log('dibuja corazon')
            container.appendChild(corazon)
        }
    },
    // IMAGEN GAME OVER
    insertImage() {
        const imageInstance = new Image()
        imageInstance.src = "./img/gameOver2.png"
        imageInstance.onload = () => this.ctx.drawImage(imageInstance, 200, 200, 1200, 600)
    },
    //IMAGEN WIN
    insertImage2() {
        const imageInstance = new Image()
        imageInstance.src = "./img/win.png"
        imageInstance.onload = () => this.ctx.drawImage(imageInstance, 100, 250, 800, 400)
    },
    //FINALIZACION DEL JUEGO
    gameOver() {

        clearInterval(this.interval)
        this.sound.pause()
        this.insertImage()

        //this.interval = undefined

    },
    gameWin() {
        clearInterval(this.interval)
        this.insertImage2()
    },
    //SONIDO 

    createSound() {
        this.soundCoin = new Audio("img/audio3.mp3")
        this.sound = new Audio('img/audio.mp3')
        this.soundBomb = new Audio("img/choquepiedra3.mp3")

    }
}

