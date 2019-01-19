//-----State

const state = {

    playerScore:0,
    playerInput:'',
    playerRoc:0,
    playerSci:0,
    playerPap:0,
    
    compScore:0,
    compInput:'',

    result:'',
    draws: 0,
    totalRounds:0,

}

//----Query Selectors

const buttons = document.querySelector('.js-buttons')
const restart = document.querySelector('.js-restart')
const wins = document.querySelector('.js-wins')
const losses = document.querySelector('.js-losses')
const draws = document.querySelector('.js-draws')
const playArea = document.querySelector('.js-playArea')

//----Game Functions

const calcInput = state => {

    const roc = state.playerRoc
    const pap = state.playerPap
    const sci = state.playerSci

    const dataSet = [
        {input: 'rock', value: roc}, 
        {input: 'paper', value: pap},
        {input: 'scissors', value: sci}]

    let maxI = '';
    
    for (let i = 0; i < dataSet.length; i++){

        let maxV = 0;

        if(dataSet[i].value > maxV){
            maxV = dataSet[i].value
            maxI = dataSet[i].input
        }

    }

    const options = ['rock', 'paper', 'scissors'];
    const rChoice = Math.floor(Math.random() * 3);
    const chance = Math.random();

    if(chance > 0.5){
        state.compInput = options[rChoice];
    }
    else {
        state.compInput = maxI;
    }

    let cI = state.compInput
    let pI = state.playerInput

    if(cI === pI){
        state.result = "It's a Draw"
        state.draws++
    }

    else if((pI === 'rock' && cI === 'scissors') ||
            (pI === 'paper' && cI === 'rock') ||
            (pI === 'scissors' && cI === 'paper')){
                state.result = 'You win!'
                state.playerScore++
            }

    else if ((cI === 'rock' && pI === 'scissors') ||
    (cI === 'paper' && pI === 'rock') ||
    (cI === 'scissors' && pI === 'paper')){
        state.result = 'AI wins!'
        state.compScore++
    }

    objectToHTML(state)

}

//----Event Listeners

buttons.addEventListener('click', e => {

    if(e.target.matches('.js-rock')){
        state.playerInput = 'rock'
        state.playerRoc++
        state.totalRounds++

        calcInput(state)
        render(state)
    }
    else if(e.target.matches('.js-paper')){
        state.playerInput = 'paper'
        state.playerPap++
        state.totalRounds++

        calcInput(state)
        render(state)
    }
    else if(e.target.matches('.js-scissors')){
        state.playerInput = 'scissors'
        state.playerSci++
        state.totalRounds++

        calcInput(state)
        render(state)
    }

})

const objectToHTML = (state) => {

    const pString = `src/${state.playerInput}.png`
    const cString = `src/${state.compInput}.png`

        playArea.innerHTML = `
        <div class='flex-container center text-center'>
                <div class='top10 center largeFont'>${state.result}</div>
        </div>
        <div class='flex-container pic'>
            <img src=${pString}>
            <img src=${cString}>
        </div>
        `
}

const render = (state) => {

    wins.innerText = state.playerScore
    draws.innerText = state.draws
    losses.innerText = state.compScore

    if(state.playerScore > state.compScore) {
        wins.classList.add('winning')
        losses.classList.add('losing')
    }
    else if (state.playerScore < state.compScore){
        losses.classList.add('winning')
        wins.classList.add('losing')
    }
    else{
        wins.classList.remove('winning')
        wins.classList.remove('losing')
        losses.classList.remove('winning')
        losses.classList.remove('losing')
    }

    if(state.rounds > 0) objectToHTML(state)

}

render(state)