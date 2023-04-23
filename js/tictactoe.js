let DIFICULTY_LEVEL = 1;
let WINNING_LENGTH = 4;

function updateDifficulty(level){
  DIFICULTY_LEVEL = level;
}

function updateWinningLength(length){
  WINNING_LENGTH = length;
}

$(document).ready(function() {

  const cells = $("[data-cell]");
  const winner = $("#winner");
  const playerMarker = $("#player-marker").text();
  const computerMarker = $("#computer-marker").text();
  const restartBtn = $("#restart-btn");

  let currentPlayer = playerMarker;
  let gameIsOver = false;
  let board = new Array(16).fill('');


  // Function to change the current player marker
  const changePlayer = () => {
    currentPlayer = currentPlayer === playerMarker ? computerMarker : playerMarker;
  };

    // Function to check if the game is over
  const checkWin = (board, currentPlayer) => {

    let count = 0;
    // Check rows
    for (let i = 0; i < cells.length; i += 4) {
      count = 0;
      for(let j = 0; j < 4; j++){
        if (board[i+j] === currentPlayer) {
          count++;
          if (count === WINNING_LENGTH) {
            return 1;
          }
        }
        else{
          count=0;
        }
      }
    }

    // Check columns
    for (let i = 0; i < 4; i++) {
      count = 0;
      for(let j = 0; j < cells.length; j += 4){
        if (board[i+j] === currentPlayer) {
          count++;
          if (count === WINNING_LENGTH) {
            return 1;
          }
        }
        else{
          count=0;
        }
      }
    }

    // Check diagonals
    count = 0;
    for(let i = 0; i < cells.length; i += 5){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
          }
        }
      else {
        count=0;
      }
    }

    count = 0;
    for(let i = 3; i < 13; i += 3){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
        }
      }
      else{
        count=0;
      }
    }

    count = 0;
    for(let i = 1; i < 12; i += 5){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
        }
      }
      else{
        count=0;
      }
    }

    count = 0;
    for(let i = 4; i < 15; i += 5){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
        }
      }
      else{
        count=0;
      }
    }

    count = 0;
    for(let i = 2; i < 9; i += 3){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
        }
      }
      else{
        count=0;
      }
    }

    count = 0;
    for(let i = 7; i < 14; i += 3){
      if (board[i] === currentPlayer) {
        count++;
        if (count === WINNING_LENGTH) {
          return 1;
        }
      }
      else{
        count=0;
      }
    }


    // Check if board is full
    let isBoardFull = true;
    for (let i = 0; i < cells.length; i++) {
      if (cells.eq(i).text() === "") {
        isBoardFull = false;
        break;
      }
    }
    if (isBoardFull) {
      return 0;
    }

    // If game is not over, return -1
    return -1;
  };

  // Function to end the game
  const endGame = (message) => {
    winner.text(message);
    gameIsOver = true;
  };

  // Function for the computer's turn
  const computerTurn = () => {
    let turn = getComputerMove(board);

    // Set the cell's text to the computer's marker
    cells.eq(turn).text(computerMarker);
    board[turn] = computerMarker;

    // Check if the game is over
    var result = checkWin(board, computerMarker);
    if (result == -1) {
      changePlayer();
    } 
    else {
      endGame(result === 0 ? "It's a draw!" : "You lose!");
    }
  };

  // Function for a player's turn
  const playerTurn = (event) => {
    // If the game is over or the cell is already occupied, return
    if (gameIsOver || $(event.target).text() !== "") {
      return;
    }

    // Set the cell's text to the player's marker
    $(event.target).text(playerMarker);
    board[parseInt(event.target.getAttribute("index"))] = playerMarker;

    // Check if the game is over
    var result = checkWin(board, playerMarker);
    if (result == -1) {
      changePlayer();
      setTimeout(computerTurn, 500);
    }  
    else {
      endGame(result === 0 ? "It's a draw!" : "You win!");
    }
  };

  // Add event listener for player's turns
  cells.on("click", playerTurn);

  // Add event listener for restart button
  restartBtn.on("click", () => {
    // Reset the game board
    cells.text("");
    winner.text("");
    gameIsOver = false;
    currentPlayer = playerMarker;

    for(let i=0; i<16; i++)
      board[i] = "";

    // If it is the computer's turn, make the first move
    if (currentPlayer === computerMarker) {
      setTimeout(computerTurn, 500);
    }
  });

  const getComputerMove = (board) => {

    //For Easy Level Just returning random move
    if(DIFICULTY_LEVEL == 1)
      return getRandomMove(board); 

    // Check for winning move
    for (let i = 0; i < 16; i++) {
      if (board[i] === '') {
        board[i] = computerMarker;
        if (checkWin(board, computerMarker) == 1) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // Check for player's winning move
    for (let i = 0; i < 16; i++) {
      if (board[i] === '') {
        board[i] = playerMarker;
        if (checkWin(board, playerMarker) == 1) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }



    //For Medium Level Just returning random move if there is no winning or win preventing move is not present
    if(DIFICULTY_LEVEL == 2)
      return getRandomMove(board);

    // Check for center cell
    if (board[5] === '') {
      return 5;
    }

    // Check for opposite corner strategy
    if (board[0] === playerMarker && board[8] === '') {
      return 8;
    } else if (board[2] === playerMarker && board[6] === '') {
      return 6;
    } else if (board[6] === playerMarker && board[2] === '') {
      return 2;
    } else if (board[8] === playerMarker && board[0] === '') {
      return 0;
    }

    // Choose a random side cell
    const sides = [1, 3, 5, 7];
    const emptySides = sides.filter(index => board[index] === '');
    if (emptySides.length > 0) {
      return emptySides[Math.floor(Math.random() * emptySides.length)];
    }

    return getRandomMove(board);
  };

  const getRandomMove = (board) => {

    // Choose a random cell
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];

  }
});