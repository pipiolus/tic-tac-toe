const players = {
    player1: {
        marker: 'X'
    },
    
    player2: {
        marker: 'O'
    }
};

const getNewGameState = () => {
    return {
        board: ['', '', '', '', '', '', '', '', ''],
        turnPlayer: 'player1',
        gameStatus: 'open'
    }
}

let gameState = getNewGameState();

const changeTurnPlayer = () => {
    if (gameState.turnPlayer === 'player1') {
        gameState.turnPlayer = 'player2'
    } else {
        gameState.turnPlayer = 'player1'
    }
}

const isGameEnd = () => {    
    return gameState.gameStatus !== 'open';
}

const isValidPlay = (index) => {
    if (gameState.board[index] !== '') return false;
    if (isGameEnd()) return false;
 
    return true;
}

const makePlay = (index, field) => {
    gameState.board[index] = players[gameState.turnPlayer].marker
    
    field.textContent = gameState.board[index];

    computeNewState();

    if (isGameEnd()) {
        return;
    };

    changeTurnPlayer();
}

const isWinRows = () => {
    for(let i = 0; i < 3; i++) {
        const rowStart = i*3;
        if (
              gameState.board[rowStart] !== '' 
              && gameState.board[rowStart] === gameState.board[rowStart + 1] 
              && gameState.board[rowStart] === gameState.board[rowStart + 2]
            ) {
            return true;
        }
    }   
}

const isWinColumns = () => {
    for(let i = 0; i < 3; i++) { 
        const columnStart = i;
        if (
              gameState.board[columnStart] !== '' 
              && gameState.board[columnStart] === gameState.board[columnStart + 3] 
              && gameState.board[columnStart] === gameState.board[columnStart + 6]
            ) {
            return true;
        }
    }   
}

const isWinDiagonal = () => {
    for (let i = 0; i < 3; i++){
        if (
            gameState.board[i] !== '' 
            && gameState.board[i] === gameState.board[i + 4] 
            && gameState.board[i] === gameState.board[i + 8]
          ) {
          return true;
      }else if (
            gameState.board[2] !== '' 
            && gameState.board[2] === gameState.board[4] 
            && gameState.board[2] === gameState.board[6]
      ){
        return true;
      }
    }
}

const isTie = () => {
    let isEmptyString = (string) => string !== '';
    
    return gameState.board.every(isEmptyString);
}

const computeNewState = () => {
    if (isWinRows()) {
        gameState.gameStatus = 'winner';
    };

    if (isWinColumns()) {
        gameState.gameStatus = 'winner';
    };

    if (isWinDiagonal()) {
        gameState.gameStatus = 'winner';
    }

    if (isTie()) {
        gameState.gameStatus = 'tie';
    }
}

const tryPlay = (index, field) => {
    if (!isValidPlay(index)) {
        return;
    }

    makePlay(index, field);
    console.log(gameState)
};

const fields = document.querySelectorAll('.field');
fields.forEach((field, index) => {
    field.addEventListener('click', () => tryPlay(index, field))
})

const restart = () => {
    gameState = getNewGameState();

    fields.forEach(field => {
        field.textContent = '';
    })

    console.log(gameState)
};
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', restart);


