let randomNumber;
let attemptsLeft;
let maxNumber;
let score = 0;
let gameOver = false;

function startGame() {
    maxNumber = Number(document.getElementById("difficulty").value);
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    attemptsLeft = 5;
    gameOver = false;

    document.getElementById("gameArea").classList.remove("hidden");
    setMessage("Game started!");

    updateUI();
}

function checkGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput").value.trim();

    // ❌ empty
    if (input === "") {
        setMessage("Enter a number!");
        return;
    }

    // ❌ not a whole number
    if (!/^\d+$/.test(input)) {
        setMessage("Only whole numbers allowed (no decimals/symbols).");
        return;
    }

    const guess = Number(input);

    // ❌ out of range
    if (guess < 1 || guess > maxNumber) {
        setMessage(`Stay between 1 and ${maxNumber}.`);
        return;
    }

    attemptsLeft--;

    if (guess === randomNumber) {
        score++;
        setMessage("🎉 Correct!");
        gameOver = true;
        updateUI();
        return;
    }

    if (guess < randomNumber) {
        setMessage("Too low!");
    } else {
        setMessage("Too high!");
    }

    if (attemptsLeft === 0) {
        setMessage(`❌ Game Over! Number was ${randomNumber}`);
        gameOver = true;
    }

    updateUI();
}

function getHint() {
    if (gameOver) return;

    setMessage(randomNumber % 2 === 0 ? "Hint: Even number" : "Hint: Odd number");
}

function updateUI() {
    document.getElementById("attempts").textContent = "Attempts: " + attemptsLeft;
    document.getElementById("score").textContent = "Score: " + score;
}

function setMessage(msg) {
    document.getElementById("message").textContent = msg;
}
