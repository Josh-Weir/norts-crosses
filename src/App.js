import React, { Component } from 'react';
import './App.css';
import Square from './components/Sqaures';

export const NAUGHTS = 'naughts'
export const CROSSES = 'crosses'
const WINNING_STATES = ['[1,2,3]', '[4,5,6]', '[7,8,9]', '[1,4,7]', '[2,5,8]', '[3,6,9]', '[1,5,9]', '[3,5,7]']

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			squares: [null, null, null, null, null, null, null, null, null],
			naughts: [],
			crosses: [],
			currentPlayer: NAUGHTS,
			winner: null
		}

		this.handlePlayerClick = this.handlePlayerClick.bind(this)
		this.resetGame = this.resetGame.bind(this)
	}

	handlePlayerClick(squareNumber) {
		if (this.state.winner || this.state.naughts.length === 5) {
			return
		}
		const newPositions = [...this.state.squares]
		console.log('winner \n', this.state.winner)
		switch (this.state.currentPlayer) {
			case NAUGHTS:
				newPositions[squareNumber] = NAUGHTS
				const naughtsSquares = [...this.state.naughts]
				naughtsSquares.push(squareNumber + 1)
				naughtsSquares.sort()
				this.setState({
					squares: newPositions,
					naughts: naughtsSquares,
					currentPlayer: CROSSES,
					winner: WINNING_STATES.includes(JSON.stringify(naughtsSquares)) ? NAUGHTS : null
				})
				break
			case CROSSES:
				newPositions[squareNumber] = CROSSES
				const crossSquares = [...this.state.crosses]
				crossSquares.push(squareNumber)
				crossSquares.sort()
				this.setState({
					squares: newPositions,
					crosses: crossSquares,
					currentPlayer: NAUGHTS,
					winner: WINNING_STATES.includes(JSON.stringify(crossSquares)) ? CROSSES : null
				})
				break
			default:
				break
		}
	}

	resetGame() {
		this.setState({
			squares: [null, null, null, null, null, null, null, null, null],
			naughts: [],
			crosses: [],
			currentPlayer: NAUGHTS,
			winner: null
		})
	}

	render() {
		return (
			<div className="App">
				<div className="game-over-cont">
					{this.state.winner &&
						<div>
							<div>Game Over</div>
							<button onClick={this.resetGame}>playAgain</button>
						</div>
					}
				</div>
				<div className="square-container">
					{this.state.squares.map((element, index) => {
						return (
							<Square index={index} player={element} key={index} click={this.handlePlayerClick} />
						);
					})}
				</div>
			</div>
		);
	}
}

export default App;
