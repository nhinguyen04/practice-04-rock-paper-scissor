const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/

/**
 * Prints valid command lines to console.
 */
function printHelp() {
  //console.log("\nHelp:\n");
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

/**
 * Compares two rps moves.
 *
 * @param {VALID_MOVES} move1 'r', 'p', or 's'
 * @param {VALID_MOVES} move2 'r', 'p', or 's'
 * @returns 0 if tie, 1 if move1 wins, -1 if move1 loses.
 */
function getWinner(move1, move2) {
  if (move1 === move2) { // tie
    return 0;
  }
  else if (VALID_MOVES[move1].winsAgainst === move2) { // win
    return 1;
  } else { // loss
    console.log("You lose...\n");
    return -1;
  }
}

/**
 *
 * @returns A randomly generated RPS move.
 */
function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);

  return validMoveKeys[randomIndex];
}

/**
 * Console log result of player vs cpu moves.
 *
 * @param {VALID_MOVES} cmd 'r', 'p', or 's'
 * @param {VALID_MOVES} cpu 'r', 'p', or 's'
 */
function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);

  const result = getWinner(cmd, cpu);

  if (result === 0) { // tie
    console.log("You tie.\n");
    ties++;
  }
  else if (result === 1) { // win
    console.log("You win!\n");
    wins++;
  } else { // loss
    console.log("You lose...\n");
    losses++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  // keep track of results
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      // user input asks for help, print to console
      console.log("\nHelp:\n");
      printHelp();

    } else if (cmd === 'q') {
      // user input quit, exit readline and end game
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      // generate cpu move
      const cpu = getCPUMove();

      // console log results
      processMove(cmd, cpu);

    } else {
      // user input invalid, print help to console
      console.log("\nInvalid command.\n");
      printHelp();
    }

    // keeps game going until command 'q'
    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // welcome message, print valid commands
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  // call main game
  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
