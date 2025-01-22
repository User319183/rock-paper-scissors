/**
 * @file game.js
 * @description Game logic for Rock, Paper, Scissors game.
 */

import {
	getComputerChoice,
	determineWinner,
	updateScore,
	displayRoundResult,
	displayFinalResult,
} from "./utils.js";

let userName = "";
let userName2 = "";
let userScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let totalRounds = 5;
let gameMode = 1; // * 1 for single player, 2 for two players
let playerTurn = 1; // * 1 for player 1, 2 for player 2
let player1Choice = "";
let player2Choice = "";

// * Start the game based on user input
export function startGame() {
	const usernameInput = document.getElementById("username");
	const usernameInput2 = document.getElementById("username2");
	const roundsSelect = document.getElementById("rounds");
	const gameModeSelect = document.getElementById("gameMode");
	const launcherSection = document.getElementById("launcher");
	const gameSection = document.getElementById("game");
	userName = usernameInput.value.trim() || "Guest 1";
	userName2 = usernameInput2.value.trim() || "Guest 2";
	totalRounds = parseInt(roundsSelect.value, 10);
	gameMode = parseInt(gameModeSelect.value, 10);
	if (gameMode === 1) {
		userName2 = "Computer";
	}
	if (userName && (gameMode === 1 || (gameMode === 2 && userName2))) {
		launcherSection.classList.add("d-none");
		gameSection.classList.remove("d-none");
		document.getElementById("startGame").disabled = true;
		usernameInput.disabled = true;
		usernameInput2.disabled = true;
		roundsSelect.disabled = true;
		gameModeSelect.disabled = true;
	}
}

// * Reset the game to initial state
export function resetGame() {
	userScore = 0;
	computerScore = 0;
	roundsPlayed = 0;

	const roundResultElement = document.getElementById("roundResult");
	if (roundResultElement) {
		const roundResult = roundResultElement.querySelector(".card-text");
		if (roundResult) {
			roundResult.textContent = "";
		}
	}

	const player1Score = document.getElementById("player1Score");
	if (player1Score) {
		player1Score.textContent = "Player 1: 0";
	}

	const player2Score = document.getElementById("player2Score");
	if (player2Score) {
		player2Score.textContent = "Player 2: 0";
	}

	const resetGameButton = document.getElementById("resetGame");
	if (resetGameButton) {
		resetGameButton.classList.add("d-none");
	}

	const startGameButton = document.getElementById("startGame");
	if (startGameButton) {
		startGameButton.disabled = false;
	}

	const usernameInput = document.getElementById("username");
	if (usernameInput) {
		usernameInput.disabled = false;
		usernameInput.value = "";
	}

	const usernameInput2 = document.getElementById("username2");
	if (usernameInput2) {
		usernameInput2.disabled = false;
		usernameInput2.value = "";
	}

	const roundsSelect = document.getElementById("rounds");
	if (roundsSelect) {
		roundsSelect.disabled = false;
	}

	const gameModeSelect = document.getElementById("gameMode");
	if (gameModeSelect) {
		gameModeSelect.disabled = false;
	}

	const launcherSection = document.getElementById("launcher");
	if (launcherSection) {
		launcherSection.classList.remove("d-none");
	}

	const gameSection = document.getElementById("game");
	if (gameSection) {
		gameSection.classList.add("d-none");
	}
}

// * Handle the user's choice
export function handleChoice(event) {
	if (roundsPlayed < totalRounds) {
		const userChoice = event.target.getAttribute("data-choice");
		if (!userChoice) {
			return; // Exit if userChoice is null or undefined
		}
		event.target.classList.add("choice-animation");
		setTimeout(() => {
			event.target.classList.remove("choice-animation");
		}, 500);
		if (gameMode === 1) {
			const computerChoice = getComputerChoice();
			const result = determineWinner(userChoice, computerChoice);
			const scores = updateScore(result, userScore, computerScore);
			userScore = scores.userScore;
			computerScore = scores.computerScore;
			displayRoundResult(
				userChoice,
				computerChoice,
				result,
				userName,
				userName2,
				userScore,
				computerScore,
				gameMode
			);
		} else {
			if (playerTurn === 1) {
				player1Choice = userChoice;
				playerTurn = 2;
				document
					.getElementById("roundResult")
					.querySelector(
						".card-text"
					).textContent = `${userName2}'s turn!`;
			} else {
				player2Choice = userChoice;
				const result = determineWinner(player1Choice, player2Choice);
				const scores = updateScore(result, userScore, computerScore);
				userScore = scores.userScore;
				computerScore = scores.computerScore;
				displayRoundResult(
					player1Choice,
					player2Choice,
					result,
					userName,
					userName2,
					userScore,
					computerScore,
					gameMode
				);
				playerTurn = 1;
			}
		}
		roundsPlayed++;
		if (roundsPlayed === totalRounds) {
			displayFinalResult(
				userName,
				userName2,
				userScore,
				computerScore,
				gameMode
			);
			document.getElementById("resetGame").classList.remove("d-none");
		}
	}
}
