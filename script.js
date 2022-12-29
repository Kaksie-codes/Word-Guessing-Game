//An array of all the possible random words
const wordList = [
    {
        word: 'python',
        hint: 'Programming Language.'
    },
    {
        word: 'guitar',
        hint: 'A musical Instrument.'
    },
    {
        word: 'kenya',
        hint: 'A country in Africa.'
    },
    {
        word: 'niger',
        hint: 'The longest river in West Africa.'
    },
    {
        word: 'buhari',
        hint: 'The current President of Nigeria.'
    },
    {
        word: 'mars',
        hint: 'A planet in our solar system.'
    },
    {
        word: 'java',
        hint: 'The Programming Language for the web.'
    },
    {
        word: 'aim',
        hint: 'A purpose or intention.'
    },
    {
        word: 'python',
        hint: 'A powerful but non-poisonous snake.'
    },
    {
        word: 'tech',
        hint: 'The richest industry in the world.'
    },
    {
        word: 'banana',
        hint: 'A fruit from the tropics.'
    },
    {
        word: 'zulu',
        hint: 'A language spoken in southern Africa.'
    },
    {
        word: 'vscode',
        hint: 'A code editor for writing code.'
    },
    {
        word: 'orange',
        hint: 'A commn citrus fruit.'
    },
    {
        word: 'lagos',
        hint: 'The largest city in Africa.'
    },
    {
        word: 'china',
        hint: 'The most populous country in the world.'
    }
]

const resetBtnEl = document.querySelector('.reset-btn');
const hintEl = document.querySelector('.hint span');
const guessesLeftEl = document.querySelector('.guesses-left span');
const wrongLettersEl = document.querySelector('.wrong-letters span');
const inputEl = document.querySelector('.inputs');
const typingInputEl = document.querySelector('.typing-input');

let word;
let incorrectLetters = [];
let guessesLeft;
let correctletter = []

//this function selects random words from our WordList Array
function getRandomWord(){ 
    incorrectLetters = [];
    correctletter = [];
    wrongLettersEl.textContent = incorrectLetters;
    const randomObject = wordList[Math.floor(Math.random() * wordList.length)];
    const hint = randomObject.hint
    word = randomObject.word;
    guessesLeft = 10;
    guessesLeftEl.textContent = guessesLeft
    hintEl.textContent = hint;
    
    let wordEl = '';    
    console.log(word);
    for(let i = 0; i < word.length; i++){  
      wordEl += `<input type="text" class="input">`;        
    }
    inputEl.innerHTML = wordEl;   
}

//this function compare the user input with the computer generated word.
function playGame(e){    
    let key = e.target.value;
    
    /*if the input is an alphabet and it is not found in the incorrect letters array
    then compare it with the computer generated word*/ 
    if(key.match(/[a-zA-Z]/) && !incorrectLetters.includes(key)){
        //If the guessesLeft is less than 1, end the game play
        setTimeout(() => {
            if(guessesLeft <= 0) {
                alert('Game Over');
                for(let i = 0; i < word.length; i++){
                    inputEl.querySelectorAll('.input')[i].value = word[i];                             
                }   
                return
            }
            
        })    

    /*if the input is found in the computer generated word
     decrement the guesses left, push the key into the correctletters array*/
        if(word.includes(key)){
            console.log('letter found')
            for(let i = 0; i < word.length; i++){
                if(word[i] == key){
                    inputEl.querySelectorAll('.input')[i].value = key; 
                    guessesLeft--;                   
                    correctletter.push(key) 
                }
            }
        }else{
            console.log('letter not found')
            incorrectLetters.push(key)
            guessesLeft--;
        }        
        
        guessesLeftEl.textContent = guessesLeft;

        wrongLettersEl.textContent = ` ${incorrectLetters}`;
        wrongLettersEl.style.color = 'red';

        /*if the correctletters array and the computer generated word have the same length
        then, the user has guessed the word correctly*/
    setTimeout(() => {
        if(correctletter.length == word.length){
            alert(`You successfully guessed the word ${word.toUpperCase()}`)
        }
    }) 
    }
    typingInputEl.value = '';
        
}

//Generate Random words once the resetBtn is clicked.
resetBtnEl.addEventListener('click', getRandomWord);

//Add click event listeners to the inputEl, once its clicked put the typingInputEl in focus.
inputEl.addEventListener('click', () => typingInputEl.focus());

//Once the Input value of the typingInputEl changes intitialize the game.
typingInputEl.addEventListener('input', playGame);

//Once the webPage loads, generate random words.
document.addEventListener('DOMContentLoaded', getRandomWord)