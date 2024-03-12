// setting of name the game
const gameName = "Guess The Word";

document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Made by Abdulrahman Ahmed Bin Saad`;

// setting of inputs
let numsOfTries = 6;
let numsOfLetter = 6;
let currentTry = 1;
// number of hints 
let numberHints = 2;

//the word want to guess
let  wordToGuess = "";
// list of words want to guess will take one of them
const words = ["School", "create", "Delete", "Update", "Master", "Branch", "Mainly", "Google", "Lovely", "Doctor"];
// take random word
wordToGuess = words[Math.floor(Math.random() * words.length)]
// message 
let messageArea = document.querySelector(".message")

// make inputs
function generateInput() {
    const divInput= document.querySelector(".inputs")
    // loop for numbers of tries
    for(let i = 1; i <= numsOfTries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        // make class disabled for all eles except the frist ele
        if (i !== 1) tryDiv.classList.add("disabled-inputs");
        // loop for numbers of letters        
        for(let j = 1; j <= numsOfLetter;j++){
            const inputLetter = document.createElement("input");
            inputLetter.type = "text"
            inputLetter.classList.add(`guess-${i}-letter-${j}`)
            inputLetter.setAttribute("maxlength", "1")
            tryDiv.appendChild(inputLetter)
        }
        divInput.appendChild(tryDiv)
    }
    // focus for frist ele
    divInput.children[0].children[1].focus()

    // make the inputs disabled
    const inputsDisabled = document.querySelectorAll(`.disabled-inputs input`)
    inputsDisabled.forEach( input => {
        input.disabled = true
    })
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) =>{
        // if you write make the letter upperCase and switch to an other input
        input.addEventListener("input", _=>{
            if(input.value){
                input.value = input.value.toUpperCase();
                const currentIndex = index +1;
                if (inputs.length >= currentIndex) inputs[currentIndex].focus();
            }
        })
        // function the keyboards
        input.addEventListener("keydown", (event)=>{
            const currentInput = Array.from(inputs).indexOf(event.target);
            if (event.key == "ArrowRight"){
                if (inputs.length >= currentInput +1) inputs[currentInput +1].focus();
            }
            if (event.key == "ArrowLeft"){
                if (0 <= currentInput -1) inputs[currentInput -1].focus();
            }
            if (event.key == "Backspace"){
                if (0 <= currentInput -1){
                    event.preventDefault();
                    inputs[currentInput].value = "";
                    inputs[currentInput -1].focus();
                }
            }
        })
    })
}
// the buttons of page
const checkButton = document.querySelector(".check");
const hintButton = document.querySelector(".hint");
const againButton = document.querySelector(".again");
// the number of button
const hintSpan = document.querySelector(".hint span");
hintSpan.innerHTML = numberHints;

// function buttons
checkButton.addEventListener("click", handleGuess);
hintButton.addEventListener("click", gethint);
againButton.addEventListener("click", again);

// if you click Enter check the word
window.addEventListener("keypress", e =>{
    if(e.key == "Enter"){
        handleGuess();
        document.querySelectorAll("input").forEach(e => e.blur());
        let ele = document.querySelector(`.try-${currentTry}`)
        if(ele){
            ele.classList.remove("disabled-inputs");
            ele.children[1].focus()
        }
    }
    
})

// function check button
function handleGuess(){
    let successGuess = true;
    for(let i = 1; i <= numsOfLetter; i++){
        let inputField = document.querySelector(`.guess-${currentTry}-letter-${i}`);
        let letterCheck = inputField.value.toLowerCase();
        let letterWord = wordToGuess[i - 1].toLowerCase();
        // game logic
        if (letterCheck == letterWord){
            // Letter Is Correct And In Place
            inputField.classList.add("yes-in-place");
        }
        else if(wordToGuess.includes(letterCheck) && letterCheck != ""){
            inputField.classList.add("not-in-place");
            successGuess = false;
        }
        else{
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    // if you win or lose
    if(successGuess){
        messageArea.innerHTML = `You Win! The word is <span>${wordToGuess}</span>`;
        
        document.querySelectorAll(".inputs > div").forEach(e =>{
            e.classList.add("disabled-inputs");
        });

        checkButton.disabled = true;
        hintButton.disabled = true;

    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentInput.forEach((input) => (input.disabled = true));
        
        ++currentTry
        const nextInput = document.querySelectorAll(`.try-${currentTry} input`);
        nextInput.forEach((input) => (input.disabled = false));
        let ele = document.querySelector(`.try-${currentTry}`)
        if(ele){
            ele.classList.remove("disabled-inputs");
            ele.children[1].focus()
        }else{
            // Disable Guess Button
            checkButton.disabled = true;
            hintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
        }
    }
}
// function hint button
function gethint(){
    numberHints--
    if(numberHints >= 0){
        hintSpan.innerHTML = numberHints;
    }
    if(numberHints === 0){
        hintButton.disabled = true
    }
    // Select all avaliable inputs 
    let inputsAvailable = document.querySelectorAll("input:not([disabled])");
    // Select all Empty inputs 
    let emptyinputs = Array.from(inputsAvailable).filter(e => e.value == "")

    if(emptyinputs.length > 0 ){
        // random index
        let randomIndex = Math.floor(Math.random() * inputsAvailable.length);
        // random input
        let randomInput = emptyinputs[randomIndex];
        // take the input
        let indexToFill = Array.from(inputsAvailable).indexOf(randomInput)
        if (indexToFill != -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase()
        }
    }
}
// function again button
function again(){
    window.location.reload()
}

window.onload = function(){
    generateInput();
}
