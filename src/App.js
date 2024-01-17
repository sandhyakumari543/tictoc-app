import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATION } from './components/Winning_combination';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X'
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}


// function deriveWinner(gameBoard, players) {
//   let winner;
//   for (const combination of WINNING_COMBINATION) {
//     const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
//     const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
//     const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

//     if (firstSquareSymbol &&
//       firstSquareSymbol === secondSquareSymbol &&
//       firstSquareSymbol === thirdSquareSymbol
//     ) {
//       winner = players[firstSquareSymbol]
//     }
//   }
//   return winner
// }
function deriveWinner(gameBoard, players) {
  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      const winnerSymbol = firstSquareSymbol;
      const winnerName = players[winnerSymbol];
      const gifUrl = winnerSymbol === 'X'
        ? 'image/excited.gif'
        : 'image/bear-dance-no-background.gif';

      return {
        name: winnerName,
        gifUrl: gifUrl
      };
    }
  }

  if (gameBoard.flat().every(square => square !== null)) {
    return {
      name: 'Draw',
      gifUrl: 'image/handshake1.gif' 
    };
  }

  return null;
}


function App() {
  const [players, setPlayers] = useState({ PLAYERS })
  const [gameTurn, setGameTurns] = useState([]);


  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurn.length === 9 && !winner;
  

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  return (
    
    <main>
    <div className='left'>
    </div>
      <div id="game-container" >   
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
