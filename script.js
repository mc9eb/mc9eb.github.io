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
    document.getElementById("endButtons").innerHTML = "";

    setMessage("Game started! Make a guess.");
    updateUI();
}

function checkGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput").value.trim();

    // empty input
    if (input === "") {
        setMessage("⚠️ Enter a number.");
        return;
    }

    // reject decimals, letters, symbols
    if (!/^\d+$/.test(input)) {
        setMessage("⚠️ Only whole numbers allowed.");
        return;
    }

    const guess = Number(input);

    // range check
    if (guess < 1 || guess > maxNumber) {
        setMessage(`⚠️ Stay between 1 and ${maxNumber}.`);
        return;
    }

    attemptsLeft--;

    if (guess === randomNumber) {
        score++;
        setMessage("🎉 Correct!");
        gameOver = true;
        updateUI();
        showEndButtons();
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
        updateUI();
        showEndButtons();
        return;
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

function showEndButtons() {
    const container = document.getElementById("endButtons");
    container.innerHTML = "";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.onclick = startGame;

    const changeDiffBtn = document.createElement("button");
    changeDiffBtn.textContent = "Choose Difficulty";
    changeDiffBtn.onclick = resetGame;

    container.appendChild(playAgainBtn);
    container.appendChild(changeDiffBtn);
}

function resetGame() {
    gameOver = false;

    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("endButtons").innerHTML = "";

    setMessage("Choose a difficulty to start again.");
}
