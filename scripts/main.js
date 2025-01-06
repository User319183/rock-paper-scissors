/**
 * @file main.js
 * @description Main script file for Rock, Paper, Scissors game.
 */

import { startGame, resetGame, handleChoice } from "./game.js";
import { showHideSecondPlayerInput } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
	const startGameButton = document.getElementById("startGame");
	const resetGameButton = document.getElementById("resetGame");
	const gameModeSelect = document.getElementById("gameMode");
	const choiceButtons = document.querySelectorAll(".choice");

	// * Event listener for game mode selection
	gameModeSelect.addEventListener("change", showHideSecondPlayerInput);

	// * Event listener for start game button
	startGameButton.addEventListener("click", startGame);

	// * Event listener for reset game button
	resetGameButton.addEventListener("click", resetGame);

	// * Event listeners for choice buttons
	choiceButtons.forEach((button) => {
		button.addEventListener("click", handleChoice);
	});
});
