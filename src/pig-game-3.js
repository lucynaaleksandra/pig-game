/* GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as manu times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to "hold", which means that his ROUND scorre gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game
*/

/* CHALLENGE
Change the game to follow these rules:
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores = [0, 0],
	globalScore = 0,
	activePlayer = 0,
	gamePlaying = true,
	previousDiceRoll,
	diceImg1 = document.querySelector("#dice-1"),
	diceImg2 = document.querySelector("#dice-2"),
	newButton = document.querySelector(".btn-new"),
	rollDiceButton = document.querySelector(".btn-roll"),
	holdButton = document.querySelector(".btn-hold"),
	panel0 = document.querySelector(".player-0-panel"),
	panel1 = document.querySelector(".player-1-panel")

init()

rollDiceButton.addEventListener("click", rollDice)
holdButton.addEventListener("click", onHold)
newButton.addEventListener("click", init)

function init() {
	let activePanel = document.querySelector(`.player-${activePlayer}-panel`)

	scores = [0, 0]
	activePlayer = 0
	globalScore = 0
	gamePlaying = true

	diceImg1.style.display = "none"
	diceImg2.style.display = "none"

	document.querySelector("#score-0").textContent = 0
	document.querySelector("#score-1").textContent = 0
	document.querySelector("#current-0").textContent = 0
	document.querySelector("#current-1").textContent = 0

	activePanel.classList.remove("winner")
	activePanel.classList.remove("active")
	panel0.classList.add("active")
	document.querySelector("#name-0").textContent = "Player 1"
	document.querySelector("#name-1").textContent = "Player 2"
}

function rollDice() {
	let dice1 = Math.floor(Math.random() * 6) + 1
	let dice2 = Math.floor(Math.random() * 6) + 1
	let currentScore = document.querySelector(`#current-${activePlayer}`)

	// console.log("dice", dice)

	if (gamePlaying) {
		// display the img corresponding the currentScore
		diceImg1.style.display = "block"
		diceImg2.style.display = "block"
		diceImg1.src = `/assets/dice-${dice1}.png`
		diceImg2.src = `/assets/dice-${dice2}.png`

		// update the global score IF the rolled number was NOT a 1
		if (dice1 !== 1 && dice2 !== 1) {
			globalScore += dice1 + dice2
			currentScore.textContent = globalScore
		} else {
			nextPlayer()
		}
		previousDiceRoll = dice1
	}
}

function onHold() {
	let activePanel = document.querySelector(`.player-${activePlayer}-panel`)
	let player = document.querySelector(`#name-${activePlayer}`)
	let input = document.querySelector(".final-score").value
	let winningScore

	input ? winningScore = input : winningScore = 100

	if (gamePlaying) {
		// add currentScore to the player's globalScore
		scores[activePlayer] += globalScore
		// update UI score
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
		// check if player won a game
		if (scores[activePlayer] >= winningScore) {
			player.textContent = "Winner!"
			activePanel.classList.add("winner")
			diceImg1.style.display = "none"
			diceImg2.style.display = "none"
			gamePlaying = false
		} else {
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
	diceImg1.style.display = "none"
	diceImg2.style.display = "none"
}

