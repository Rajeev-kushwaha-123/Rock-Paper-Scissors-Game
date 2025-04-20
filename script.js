let userScore = 0;
let compScore = 0;
const choices=document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');

const userScorePara= document.querySelector('#user-score');
const compScorePara= document.querySelector('#comp-score');

const genCompChoice = ()=>{
    //rock paper scissors
    const option=["rock","paper","scissors"];
    //1 for rock, 2 for paper, 3 for scissors
    const randIdx = Math.floor(Math.random()*3);
    return option[randIdx];
}
const drawGame = ()=>{
    console.log("It's a draw!");
    msg.innerHTML = `It's a draw! play again`;
    msg.style.backgroundColor = "#8B8000";
}
const playGame = (userChoice)=>{
    console.log("User value = ",userChoice);
    //generate computer choice
    const compChoice = genCompChoice();
    console.log("computer choice = ",compChoice);
    //compare user choice and computer choice   
    if(userChoice === compChoice){
        drawGame();
    }
    else if(userChoice === "rock" && compChoice === "scissors"){
        userScore++;
        console.log("User wins!");
        msg.innerHTML = `User wins! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else if(userChoice === "paper" && compChoice === "rock"){
        userScore++;
        console.log("User wins!");
        msg.innerHTML = `User wins! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else if(userChoice === "scissors" && compChoice === "paper"){
        userScore++;
        console.log("User wins!");
        msg.innerHTML = `User wins! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        console.log("Computer wins!");
        msg.innerHTML = `Computer wins! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    //update score
    userScorePara.innerHTML = userScore;
    compScorePara.innerHTML = compScore;
    console.log("User score = ",userScore);
    console.log("Computer score = ",compScore);  
}
choices.forEach(
   (choice)=>{
    choice.addEventListener('click', ()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });

   })

//reset game
document.querySelector("#reset").addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerHTML = 0;
    compScorePara.innerHTML = 0;
    msg.innerHTML = "Make your move";
    msg.style.backgroundColor = "#081b31";
});

