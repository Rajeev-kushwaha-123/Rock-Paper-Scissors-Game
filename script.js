let userScore = 0;
let compScore = 0;
let roundCount = 0;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const modal = document.getElementById("gameOverModal");
const modalMsg = document.getElementById("modal-message");
const closeBtn = document.querySelector(".close");
const playAgainBtn = document.getElementById("play-again");

// Sounds
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");
const gameOverSound = document.getElementById("gameOverSound");

const playSound = (sound) => sound.play();

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
};

const drawGame = () => {
    msg.textContent = "It's a draw! Play again.";
    msg.style.backgroundColor = "#8B8000";
    playSound(drawSound);
};

const showModal = () => {
    let resultText = userScore > compScore ? "🎉 You won the game!" :
                     compScore > userScore ? "💻 Computer won the game!" :
                     "🤝 It's a tie!";
    modalMsg.textContent = resultText;
    modal.style.display = "block";
    playSound(gameOverSound);
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    roundCount = 0;
    userScorePara.textContent = 0;
    compScorePara.textContent = 0;
    msg.textContent = "Make your move";
    msg.style.backgroundColor = "#081b31";
    modal.style.display = "none";
};

const playGame = (userChoice) => {
    if (roundCount >= maxRounds) return;
    playSound(clickSound);

    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        userScore++;
        msg.textContent = `You win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        playSound(winSound);
    } else {
        compScore++;
        msg.textContent = `Computer wins! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        playSound(loseSound);
    }

    userScorePara.textContent = userScore;
    compScorePara.textContent = compScore;
    roundCount++;

    if (roundCount === maxRounds) {
        setTimeout(showModal, 800);
    }
};

// Dark Mode Toggle
const darkModeBtn = document.getElementById("toggleDarkMode");

// Check if dark mode was previously enabled
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Toggle dark mode
darkModeBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }
});

// Events
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

closeBtn.onclick = () => modal.style.display = "none";
playAgainBtn.onclick = resetGame;
