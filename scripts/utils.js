/**
 * @file utils.js
 * @description Utility functions for Rock, Paper, Scissors game.
 */

// * Get the computer's choice
export function getComputerChoice() {
	const choices = ["rock", "paper", "scissors"];
	const randomIndex = Math.floor(Math.random() * choices.length);
	return choices[randomIndex];
}

// * Determine the winner of the round
export function determineWinner(userChoice, computerChoice) {
	if (userChoice === computerChoice) {
		return "draw";
	} else if (
		(userChoice === "rock" && computerChoice === "scissors") ||
		(userChoice === "paper" && computerChoice === "rock") ||
		(userChoice === "scissors" && computerChoice === "paper")
	) {
		return "user";
	} else {
		return "computer";
	}
}

// * Update the score based on the result
export function updateScore(result, userScore, computerScore) {
	if (result === "user") {
		userScore++;
	} else if (result === "computer") {
		computerScore++;
	}
	return { userScore, computerScore };
}

// * Display the result of each round
export function displayRoundResult(
	userChoice,
	computerChoice,
	result,
	userName,
	userName2,
	userScore,
	computerScore,
	gameMode
) {
	const roundResult = document.getElementById("roundResult");
	const player1Score = document.getElementById("player1Score");
	const player2Score = document.getElementById("player2Score");

	roundResult.classList.add("result-animation");
	setTimeout(() => {
		roundResult.classList.remove("result-animation");
	}, 1000);

	if (gameMode === 1) {
		roundResult.textContent = `${userName} chose ${userChoice}, Computer chose ${computerChoice}. ${
			result === "draw"
				? "It's a draw!"
				: result === "user"
				? `${userName} wins this round!`
				: "Computer wins this round!"
		}`;
	} else {
		roundResult.textContent = `${userName} chose ${userChoice}, ${userName2} chose ${computerChoice}. ${
			result === "draw"
				? "It's a draw!"
				: result === "user"
				? `${userName} wins this round!`
				: `${userName2} wins this round!`
		}`;
	}

	player1Score.textContent = `${userName}: ${userScore}`;
	player2Score.textContent = `${
		gameMode === 1 ? "Computer" : userName2
	}: ${computerScore}`;
}

// * Display the final result
export function displayFinalResult(
	userName,
	userName2,
	userScore,
	computerScore,
	gameMode
) {
	const roundResult = document.getElementById("roundResult");

	roundResult.classList.add("result-animation");
	setTimeout(() => {
		roundResult.classList.remove("result-animation");
	}, 1000);

	if (userScore > computerScore) {
		roundResult.textContent += ` ${userName} wins the game! Congratulations!`;
	} else if (userScore < computerScore) {
		roundResult.textContent += ` ${
			gameMode === 1 ? "Computer" : userName2
		} wins the game! Better luck next time, ${userName}.`;
	} else {
		roundResult.textContent += " It's a draw! Well played!";
	}
}
