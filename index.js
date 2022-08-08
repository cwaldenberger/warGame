//btn vars
const shuffleBtn = document.getElementById('shuffle')
const drawCardsBtn = document.getElementById('drawCards')
const resetGameBtn = document.getElementById('resetGame')
//deck value vars
let cardsRemain 
let deckID 

let leftCardImgVar 
let rightCardImgVar 
let leftCardValue
let rightCardValue
let leftCardInt 
let rightCardInt 

let leftCardScore = 0
let rightCardScore = 0

//dom text vars
let cardsRemainingText = document.getElementById('cardsRemainingText')
let alertNotice = document.getElementById('alertNotice')  
let leftScoreText = document.getElementById('scoreLeft')
let rightScoreText = document.getElementById('scoreRight')
let leftCardImgDisp =  document.getElementById('cardLeft')
let rightCardImgDisp =  document.getElementById('cardright')

leftScoreText.innerText= `Left: --` //display player L score in dom
rightScoreText.innerText= `Right: --` //display player R score in dom   



//beginning game State
shuffleBtn.disabled=false // enable shuffle button
drawCardsBtn.disabled=true // disable button
resetGameBtn.disabled=true // disable button
alertNotice.innerText = 'Shuffle the deck to start the game!'
leftCardScore = 0
rightCardScore = 0
leftScoreText.innerText=`Left: ${leftCardScore}`
rightScoreText.innerText=`Right: ${rightCardScore}`    


function cardValueToScore(value){
    if (value =='JACK'){
        value = 11
        console.log(Number(value,10))
        return Number(value,10)
    } else if (value=='QUEEN'){
        value = 12
        console.log(Number(value,10))
       return Number(value,10)
    }else if (value=='KING'){
        value = 13
        console.log(Number(value,10))
        return Number(value,10)
    }else if (value=='ACE'){
        value = 14
        console.log(Number(value,10))
        return Number(value,10)
    } else {
        console.log(Number(value))
        return Number(value,10)
    }
}

function winner(card1, card2){
   if (card1>card2){ //inner if}
        
        leftCardScore=Number(leftCardScore)+1
        alertNotice.innerText = 'Left player wins, +1pt!'
        console.log(leftCardScore)
        console.log(rightCardScore)
        document.getElementById('scoreLeft').innerText = `Left: ${leftCardScore}`

    } else if (card2>card1){
            
        rightCardScore=Number(rightCardScore)+1
        alertNotice.innerText = 'Right player wins, +1pt!'
        console.log(leftCardScore)
        console.log(rightCardScore)
        document.getElementById('scoreRight').innerText = `Right: ${rightCardScore}`

    } else {//inner else
        alertNotice.innerText = 'Its a Tie, no score!'
        } 

         
  
}

function getNewDeck(){
    shuffleBtn.disabled=true // disable shuffle button
    drawCardsBtn.disabled=false // enable drawCards button
    leftScoreText.innerText=`Left: ${leftCardScore}`
    rightScoreText.innerText=`Right: ${rightCardScore}`
    // scoreRight.innerText = rightCardScore
    alertNotice.innerText = "The war has begun! Draw Cards!" //game-on Message
    
        fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') //fetch deck from api
        .then (res=>res.json()) //parse deck into json object 
        .then (data => {
            // console.log(data, data.deck_id) //log entire object
            deckID = data.deck_id //assign deck_id to predeclared globally defined variable
            cardsRemain = data.remaining //assign remaining cards count to predeclared globally defined variable  
            cardsRemainingText.innerText = `Cards in deck: ${cardsRemain}` //display cards remaining count in dom        
        })
}

shuffleBtn.addEventListener('click', getNewDeck) //attach click handler function to getNewDeck Button

drawCardsBtn.addEventListener('click',function(){  
  
   
    if(leftCardScore>2){
        shuffleBtn.disabled = true
   
        drawCardsBtn.disabled = true
       
        resetGameBtn.disabled = false 
        alertNotice.innerText =`Left Player Wins the Game`
    } else if (rightCardScore>2) { //outer Else
        shuffleBtn.disabled = true
   
        drawCardsBtn.disabled = true
        resetGameBtn.disabled = false 
        alertNotice.innerText =`Right Player Wins the Game`
    } else if (cardsRemain>0){ //check if there are playable cards
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`) //if playable cards remain call api to draw cards
        .then(res => res.json()) //parse drawn cards to Json object
        .then(data => {

            console.log(data) //log json object
            leftCardImgVar = data.cards[0].image //assign card image to globally declared left card deckValue var
            rightCardImgVar = data.cards[1].image // assign card image to globally declared right card deckValue var
            cardsRemain = data.remaining
            cardsRemainingText.innerText = `Cards in deck: ${cardsRemain}` // assign cards remaining to globally declared deckValue var
            console.log(cardsRemain)
            leftCardValue = data.cards[0].value // assign card image to globally declared left card deckValue var
            rightCardValue = data.cards[1].value //assign card image to globally declared right card deckValue var
            
            leftCardImgDisp.innerHTML = `<img src=${leftCardImgVar}>` //display left card 
            rightCardImgDisp.innerHTML = `<img src=${rightCardImgVar}>`//display right card
            // cardsRemainingText = `Cards in deck: ${cardsRemaining}`//display card count


            console.log(leftCardImgVar)
            console.log(rightCardImgVar)
            // console.log(cardsRemaining)
            console.log(leftCardValue)
            console.log(rightCardValue)

            
            let card1= cardValueToScore(leftCardValue)
            let card2 = cardValueToScore(rightCardValue)

            let card1Int = Number(card1)
            let card2Int = Number(card2)

            winner(card1Int, card2Int)
          
        })
    } else if(cardsRemain==0) {
        drawCardsBtn.disabled=true
        alertNotice.innerText = 'No more playable cards. Must shuffle deck!'
        shuffleBtn.disabled=false
    }
})


function resetGame(){
    shuffleBtn.disabled=false // enable shuffle button
    drawCardsBtn.disabled=true // disable button
    resetGameBtn.disabled=true // disable button
    alertNotice.innerText = 'Shuffle the deck to start the game!'
    leftCardImgDisp.innerHTML=""
    rightCardImgDisp.innerHTML=""
    leftCardScore = 0
    rightCardScore = 0
    leftScoreText.innerText=`Left: ${leftCardScore}`
    rightScoreText.innerText=`Right: ${rightCardScore}`
}

resetGameBtn.addEventListener('click', resetGame)






































































