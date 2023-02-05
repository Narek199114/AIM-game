const startBtn=document.querySelector('#start')
const screens=document.querySelectorAll('.screen')
const timeList=document.querySelector('#time-list')
const timeEl=document.querySelector('#time')
const board=document.querySelector('#board')
const colors=['#FF4500',';#40ff00','#1a1aff',' #ffff1a','#ff1ac6','#ff1a1a','#2eb82e','#00e6e6','#5c00e6']
let time=0
let score=0
const circle=document.createElement('div')

startBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click',event=>{
    if (event.target.classList.contains('time-btn')){
        time=parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up') 
        startGame()
    }
})

board.addEventListener('click',event=>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        getRandomCircle()
        
    }
})

function startGame() {
    
    setInterval(decreaseTime,1000 )
    getRandomCircle()
    setTime(time)  
    
}

function decreaseTime(){
    if(time===0){
        finishGame()
    }else{
    let current=--time
    if(current<10){
        current=`0${current}`
        }
    setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML=`00:${value}` 
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML=`<h1> Счет:  <span class="primary"> ${score}</span></h1>`
}

function getRandomCircle(){
    const circle=document.createElement('div')
    const size=getRandomNumber(10,60)
    const {width, height}=board.getBoundingClientRect()
    const x=getRandomNumber(0,width-size)
    const y=getRandomNumber(0,height-size)

    setColor(circle)

    circle.classList.add('circle')
    circle.style.width=`${size}px`
    circle.style.height=`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    
    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)
}


function setColor(element) {
    const color=getRandomColor()
    element.style.background=color
    element.style.boxShadow=`0 0 2px ${color},0 0 10px ${color}`
}


function getRandomColor(){
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}