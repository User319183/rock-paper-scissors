/**
 * @file ui.js
 * @description User interface functions for Rock, Paper, Scissors game.
 */

// * Show or hide the second player's input based on game mode selection
export function showHideSecondPlayerInput() {
	const gameModeSelect = document.getElementById("gameMode");
	const usernameInput2 = document.getElementById("username2");

	if (gameModeSelect.value === "2") {
		usernameInput2.classList.remove("d-none");
	} else {
		usernameInput2.classList.add("d-none");
	}
}
