const inputs = document.querySelector(".inputs"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    wrongLetter = document.querySelector(".wrong-letter span"),
    resetBtn = document.querySelector(".reset-btn"),
    hintBtn = document.querySelector(".hint-btn"),
    imageContainer = document.querySelector(".image-container"),
    typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [],
    correctLetters = [],
    hintUsed = false; 

function randomWord() {

    imageContainer.innerHTML = '';

    hintUsed = false; // Enable the hint button for the new word

    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hintTag.innerText = "";
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    hintTag.innerText = ranItem.hint;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}

function displayHintAndImage() {
    if (!hintUsed) {

        let ranItem = wordList.find(item => item.word === word);
        if (ranItem && ranItem.imgsrc) {
            hintTag.innerText = ranItem.hint;

          
            let img = document.createElement("img");
            img.src = ranItem.imgsrc;
            img.alt = "Word Image";
            imageContainer.appendChild(img);


            hintUsed = true;
            hintBtn.disabled = true;
        }
    }
}

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            hintBtn.disabled = false; // Enable hint button after successful guess
            return randomWord();
        } else if (maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", () => {
    randomWord();
    hintBtn.disabled = false; // Enable hint button after resetting the game
});
hintBtn.addEventListener("click", displayHintAndImage);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

// Initial setup: Display a random word when the page loads
randomWord();
