let randomNumber;
let attemptsLeft;
let maxNumber;
let score = 0;
let gameOver = false;

const input = document.getElementById("guessInput").value.trim();

// Empty input
if (input === "") {
    setMessage("⚠️ Please enter a number.");
    return;
}

// Not a number at all (letters, symbols)
if (!/^\d+$/.test(input)) {
    setMessage("⚠️ Only whole numbers are allowed (no decimals or symbols).");
    return;
}

const guess = Number(input);

// Out-of-range
if (guess < 1 || guess > maxNumber) {
    setMessage(`⚠️ Stay within 1 and ${maxNumber}.`);
    return;
}
function startGame() {
    maxNumber = parseInt(document.getElementById("difficulty").value);
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    attemptsLeft = 5;
    gameOver = false;

    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("message").textContent = "Game started! Guess a number.";

    removeEndButtons();
    updateUI();
}

function checkGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput").value;

    // Reject non-numbers
    if (input.trim() === "" || isNaN(input)) {
        setMessage("⚠️ Please enter a valid number.");
        return;
    }

    const guess = parseInt(input);

    // Reject out-of-range numbers
    if (guess < 1 || guess > maxNumber) {
        setMessage(`⚠️ Stay within 1 and ${maxNumber}.`);
        return;
    }

    attemptsLeft--;

    if (guess === randomNumber) {
        score++;
        setMessage("🎉 Correct!");
        gameOver = true;
        saveScore();
        showEndButtons();
    } else if (guess < randomNumber) {
        setMessage("Too low!");
    } else {
        setMessage("Too high!");
    }

    if (attemptsLeft === 0 && guess !== randomNumber) {
        setMessage(`❌ Game Over! Number was ${randomNumber}`);
        gameOver = true;
        showEndButtons();
    }

    updateUI();
}

function updateUI() {
    document.getElementById("attempts").textContent = "Attempts left: " + attemptsLeft;
    document.getElementById("score").textContent = "Score: " + score;
}

function setMessage(msg) {
    document.getElementById("message").textContent = msg;
}

function getHint() {
    if (gameOver) return;

    if (randomNumber % 2 === 0) {
        alert("Hint: The number is even.");
    } else {
        alert("Hint: The number is odd.");
    }
}

function showEndButtons() {
    const container = document.getElementById("gameArea");

    const sameBtn = document.createElement("button");
    sameBtn.textContent = "Play Same Mode";
    sameBtn.onclick = startGame;
    sameBtn.id = "sameBtn";

    const diffBtn = document.createElement("button");
    diffBtn.textContent = "Choose Difficulty";
    diffBtn.onclick = resetGame;
    diffBtn.id = "diffBtn";

    container.appendChild(sameBtn);
    container.appendChild(diffBtn);
}

function removeEndButtons() {
    const sameBtn = document.getElementById("sameBtn");
    const diffBtn = document.getElementById("diffBtn");

    if (sameBtn) sameBtn.remove();
    if (diffBtn) diffBtn.remove();
}

function resetGame() {
    document.getElementById("gameArea").classList.add("hidden");
    removeEndButtons();
    setMessage("Pick a difficulty and start again!");
}

function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}
