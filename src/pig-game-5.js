// CLASSES
let diceImg = document.querySelector(".dice"),
	newButton = document.querySelector(".btn-new"),
	rollDiceButton = document.querySelector(".btn-roll"),
	holdButton = document.querySelector(".btn-hold"),
	finalWinScoreInput = document.querySelector(".final-score"),
	isGamePlaying = false,
	activePlayer = undefined,
	finalWinScore = 100


class Player {
	constructor(index, name) {
		const panel = document.querySelector(`.player-${index}-panel`)
		if (!panel) {
			throw new Error("could not find player panel", `.player-${index}-panel`)
		}

		const turnScoreElement = panel.querySelector('.player-current-score')
		if (!turnScoreElement) {
			throw new Error("could not find player turn score element", '.player-current-score')
		}

		const scoreElement = panel.querySelector('.player-score')
		if (!scoreElement) {
			throw new Error("could not find player score element", '.player-score')
		}

		const nameElement = panel.querySelector('.player-name')
		if (!nameElement) {
			throw new Error("could not find player name element", '.player-name')
		}

		this.index = index
		this.name = name
		this.turnScore = 0
		this.score = 0
		this.panel = panel
		this.scoreElement = scoreElement
		this.turnScoreElement = turnScoreElement
		this.nameElement = nameElement
	}

	startMyTurn() {
		this.panel.classList.add("active")
	}

	endMyTurn() {
		this.panel.classList.remove("active")
	}

	rollDice() {
		let dice = Math.floor(Math.random() * 6) + 1

		// display the img corresponding the currentScore
		diceImg.style.display = "block"
		diceImg.src = `/assets/dice-${dice}.png`

		// console.log("dice", dice)

		if (dice === 1) {
			// turn is forced to end
			// and lose all turnScore points
			this.turnScore = 0
			this.turnScoreElement.textContent = this.turnScore
			this.endMyTurn()
			return true
		} else {
			// add dice value to turnscore
			// and update scoreText
			this.turnScore += dice
			this.turnScoreElement.textContent = this.turnScore
			return false
		}
	}

	reset() {
		this.score = this.turnScore = 0
		this.scoreElement.textContent = this.turnScoreElement.textContent = this.score

		this.nameElement.textContent = this.name
		this.panel.classList.remove("winner", "active")
	}

	// onHold should add turnScore to score
	// and if we have won return true
	// otherwise return false
	onHold(finalWinScore) {
		this.score += this.turnScore
		this.scoreElement.textContent = this.score

		if (this.score >= finalWinScore) {
			this.nameElement.textContent = "Winner!"
			this.panel.classList.add("winner")
			return true
		}

		this.endMyTurn()
		return false
	}
}


const playerOne = new Player('0', 'Player 1')
const playerTwo = new Player('1', 'Player 2')
const players = [playerOne, playerTwo]

rollDiceButton.addEventListener("click", onClickRollDice)
holdButton.addEventListener("click", onClickHold)
newButton.addEventListener("click", newGame)

newGame()

function onClickRollDice() {
	if (!isGamePlaying) {
		console.log("game is not active")
		return
	}

	if (!activePlayer) {
		console.log("no active player")
		return
	}

	const turnFinished = activePlayer.rollDice(diceImg)
	if (turnFinished) {
		swapActivePlayer()
	}
}

function onClickHold() {
	if (!isGamePlaying) {
		console.log("game is not active")
		return
	}

	if (!activePlayer) {
		console.log("no active player")
		return
	}

	const playerWon = activePlayer.onHold(finalWinScore)
	if (playerWon) {
		isGamePlaying = false
	} else {
		swapActivePlayer()
	}
}

function swapActivePlayer() {
	diceImg.style.display = "none"

	if (activePlayer === playerOne) {
		activePlayer = playerTwo
	} else {
		activePlayer = playerOne
	}

	activePlayer.startMyTurn()
}

function newGame() {
	for (const player of players) {
		player.reset()
	}

	finalWinScore = parseInt(finalWinScoreInput.value) || 100
	finalWinScoreInput.value = finalWinScore

	diceImg.style.display = "none"

	activePlayer = players[0]
	activePlayer.startMyTurn()
	isGamePlaying = true
}
