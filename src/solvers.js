/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other

window.findSolution = function(rowStart, col, n, board) {
  //board is assigned to board object passed in
  var board = board;
  var solution = [];
  if (n === 1) {
    solution.push([1]);
    console.log(solution);
    return solution;
  }
  var nValue = n;
  var rows = board.attributes.rows();
  // console.log(rows + " the rows");
  // board.togglePiece(rowStart, col);
  // var counter = 0;
  // debugger;
  // var recurse = function(arr) {
  //   console.log(arr[counter] + " " + counter);
  //   for (var i = 0; i < nValue - 1; i++) {
  //     if (arr[i] !== 1) {
  //       board.togglePiece(counter, i);
  //       if (board.hasAnyRooksConflicts()) {
  //         board.togglePiece(counter, i);
  //       }
  //     }
  //   }
  //   if (counter < nValue) {
  //     console.log("yes");
  //     counter ++; 
  //     recurse(rows[counter]);
  //   } else {
  //     solution.push(board.rows());
  //     return solution;
  //   }
    
  // };
  // recurse(rows[counter]);
};

window.findNRooksSolution = function(n) {
  var board = new Board({ 'n': n });
  console.log(board);
  console.log(board.rows());
  var nValue = n;
  this.findSolution(0, 0, nValue, board);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({ n: n });
  var solutionCount = 0;
  var nValue = n;
  var searchAll = function(col) {
    if (col < n) {
      for (var i = 0; i < n; i++) {
        if (this.findSolution(i, col, nValue, board)) {
          solutionCount++;
        }
      }
      
    }
    var nextCol = col++;
    searchAll(nextCol);
    
    
  };
  
  searchAll(0);
  


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
