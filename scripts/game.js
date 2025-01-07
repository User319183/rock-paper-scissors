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
	document.getElementById("roundResult").textContent = "";
	document.getElementById("score").textContent = "";
	document.getElementById("player1Score").textContent = "Player 1: 0";
	document.getElementById("player2Score").textContent = "Player 2: 0";
	document.getElementById("resetGame").classList.add("d-none");
	document.getElementById("startGame").disabled = false;
	document.getElementById("username").disabled = false;
	document.getElementById("username2").disabled = false;
	document.getElementById("rounds").disabled = false;
	document.getElementById("gameMode").disabled = false;
	document.getElementById("username").value = "";
	document.getElementById("username2").value = "";
	document.getElementById("launcher").classList.remove("d-none");
	document.getElementById("game").classList.add("d-none");
}

// * Handle the user's choice
export function handleChoice(event) {
	if (roundsPlayed < totalRounds) {
		const userChoice = event.target.getAttribute("data-choice");
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
				document.getElementById(
					"roundResult"
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
