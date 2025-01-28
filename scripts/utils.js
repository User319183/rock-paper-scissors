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

// * Trigger losing animation
export function triggerLosingAnimation() {
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 },
		colors: ["#ff0000", "#ff6347", "#ff4500"], // * Red and orange colors for confetti particles for losing animation
	});
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
	const roundResultElement = document.getElementById("roundResult");
	if (!roundResultElement) {
		console.error("roundResult element not found");
		return;
	}

	const roundResult = roundResultElement.querySelector(".card-text");
	if (!roundResult) {
		console.error("roundResult .card-text element not found");
		return;
	}

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

	player1Score.innerHTML = `<i class="fas fa-user"></i> ${userName}: ${userScore}`;
	player2Score.innerHTML = `${
		gameMode === 1 ? '<i class="fas fa-robot"></i> Computer' : '<i class="fas fa-user"></i> ' + userName2
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
	const roundResultElement = document.getElementById("roundResult");
	if (!roundResultElement) {
		console.error("roundResult element not found");
		return;
	}

	const roundResult = roundResultElement.querySelector(".card-text");
	if (!roundResult) {
		console.error("roundResult .card-text element not found");
		return;
	}

	roundResult.classList.add("result-animation");
	setTimeout(() => {
		roundResult.classList.remove("result-animation");
	}, 1000);

	if (userScore > computerScore) {
		roundResult.textContent += ` ${userName} wins the game! Congratulations!`;
		// * Trigger confetti animation for winning
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	} else if (userScore < computerScore) {
		roundResult.textContent += ` ${
			gameMode === 1 ? "Computer" : userName2
		} wins the game! Better luck next time, ${userName}.`;
		// * Trigger losing animation
		triggerLosingAnimation();
	} else {
		roundResult.textContent += " It's a draw! Well played!";
	}
}
