import React, { useEffect } from 'react';

const GameOver = ({ winner, onRestart }) => {
  useEffect(() => {
    const imgBox = document.querySelector(".imgbox img");
    if (winner) {
      imgBox.src = winner.gifUrl;
    }
  }, [winner]);

  return (
    <div>
      {winner && (
        <div className="imgbox">
          <img src={winner.gifUrl} alt={winner.name === 'Player 1' ? 'Excited GIF' : 'Bear Dance GIF'} className='winImg' />
          <div id="game-over">
            <h2>Game Over!</h2>
            {winner.name !== 'Draw' && <p>{winner.name} Won!</p>}
            {winner.name === 'Draw' && <p>It&apos;s a draw!</p>}
            <button onClick={onRestart}>Rematch!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameOver;

