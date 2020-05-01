/* GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as manu times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to "hold", which means that his ROUND scorre gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game
*/

/* 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out.
*/

let scores = [0, 0],
	globalScore = 0,
	activePlayer = 0,
	diceImg = document.querySelector(".dice"),
	newButton = document.querySelector(".btn-new"),
	rollDiceButton = document.querySelector(".btn-roll"),
	holdButton = document.querySelector(".btn-hold"),
	panel0 = document.querySelector(".player-0-panel"),
	panel1 = document.querySelector(".player-1-panel"),
	gamePlaying = true,
	previousDiceRoll


init()

rollDiceButton.addEventListener("click", rollDice)
holdButton.addEventListener("click", onHold)
newButton.addEventListener("click", init)

function init() {
	let activePanel = document.querySelector(`.player-${activePlayer}-panel`)

	scores = [0, 0]
	activePlayer = 0
	globalScore = 0

	diceImg.style.display = "none"

	document.querySelector("#score-0").textContent = 0
	document.querySelector("#score-1").textContent = 0
	document.querySelector("#current-0").textContent = 0
	document.querySelector("#current-1").textContent = 0

	activePanel.classList.remove("winner")
	activePanel.classList.remove("active")
	panel0.classList.add("active")
	document.querySelector("#name-0").textContent = "Player 1"
	document.querySelector("#name-1").textContent = "Player 2"
	gamePlaying = true
}

function rollDice() {
	// get random number
	let dice = Math.floor(Math.random() * 6) + 1
	let currentScore = document.querySelector(`#current-${activePlayer}`)
	let globalScoreUI = document.querySelector(`#score-${activePlayer}`)

	// console.log("dice", dice)

	if (gamePlaying) {
		// display the img corresponding the currentScore
		diceImg.style.display = "block"
		diceImg.src = `/assets/dice-${dice}.png`

		// update the global score if the rolled number was NOT a 1
		// if rolled number is 6 two times in a row, the player looses all score

		if (dice === 6 && previousDiceRoll === 6) {
			scores[activePlayer] = 0
			globalScoreUI.textContent = "0"
			nextPlayer()
		} else if (dice !== 1) {
			globalScore += dice
			currentScore.textContent = globalScore
		} else {
			// update next player and active class for active panel
			nextPlayer()
		}
		previousDiceRoll = dice
	}
}

function onHold() {
	let activePanel = document.querySelector(`.player-${activePlayer}-panel`)
	let player = document.querySelector(`#name-${activePlayer}`)
	let input = document.querySelector(".final-score").value
	let winningScore

	if (input) {
		winningScore = input
	} else {
		winningScore = 100
	}

	if (gamePlaying) {
		// add currentScore to the player's globalScore
		scores[activePlayer] += globalScore
		// update UI score
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
		// check if player won a game
		if (scores[activePlayer] >= winningScore) {
			player.textContent = "Winner!"
			activePanel.classList.add("winner")
			// activePanel.classList.remove("active")
			diceImg.style.display = "none"
			gamePlaying = false
		} else {
			// update activePlayer panel UI to next player
			nextPlayer()
		}
	}
}

function nextPlayer() {
	let currentScore = document.querySelector(`#current-${activePlayer}`)

	if (activePlayer === 0) {
		activePlayer = 1
		panel1.classList.add("active")
		panel0.classList.remove("active")
	} else {
		activePlayer = 0
		panel1.classList.remove("active")
		panel0.classList.add("active")
	}
	globalScore = 0

	// when we roll 1, reset currentPlayer score to 0 and hide img
	currentScore.textContent = 0
	diceImg.style.display = "none"
}
