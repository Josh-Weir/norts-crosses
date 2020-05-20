import React from 'react'
import { NAUGHTS, CROSSES } from '../App'

function Square(props) {
  function handleSqureClick() {
    props.click(props.index)
  }
  const symbol = props.player === NAUGHTS ? '◯' : props.player === CROSSES ? '×' : ''

  return (
    <div className="square" onClick={handleSqureClick}>
      <span className={props.player}>{symbol}</span>
    </div>
  )
}

export default Square