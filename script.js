const canvas = document.getElementById('canvas')
const ctx    = canvas.getContext('2d')

canvas.width  = innerWidth
canvas.height = innerHeight

class Symbol {
	constructor(x,y,fontSize,canvasHeight){
		this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙CHESS♚♛♜♝♞♟'
		this.x = x
		this.y = y
		this.text = ''  // currently active symbol
		this.fontSize = fontSize
		this.canvasHeight = canvasHeight
	}
	draw(ctx){
		this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length))
		ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
		if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
			this.y = 0			
		} else {
			this.y += 1
		}

	}
}

class Rain {
	constructor(canvasWidth,canvasHeight){
		this.canvasWidth  = canvasWidth
		this.canvasHeight = canvasHeight
		this.fontSize     = 25
		this.columns      = this.canvasWidth/this.fontSize | 0
		this.symbols      = []
		this.#init()
	}
	// private method
	#init(){
		for(let i = 0; i < this.columns; i++){
			this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
		}
	}
	resize(width,height){
		this.canvasWidth  = width
		this.canvasHeight = height
		this.columns = this.canvasWidth/this.fontSize
		this.symbols = []
		this.#init()
	}
}

const rain   = new Rain(canvas.width, canvas.height)
let lastTime = 0
const fps    = 30
const nextFrame = 1000/fps
let timer = 0

addEventListener('resize', function(){
	canvas.width  = innerWidth
	canvas.height = innerHeight
	rain.resize(canvas.width,canvas.height)
})


function animate(timestamp){
	let deltaTime = timestamp - lastTime
	lastTime = timestamp
	if(timer > nextFrame){
		ctx.fillStyle = 'rgba(0,0,0,0.05)'
		ctx.textAlign = 'center'
		ctx.fillRect(0,0,canvas.width, canvas.height)
		ctx.fillStyle = 'lime'		
		ctx.font = rain.fontSize + 'px monospace'
		rain.symbols.forEach(symbol => symbol.draw(ctx))
		timer = 0
	} else {
		timer += deltaTime
	}
	requestAnimationFrame(animate)
}

animate(0)