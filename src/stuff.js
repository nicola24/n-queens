 if (nValue === 1) {
    solution.push([1]);
    
  } else {
    board.togglePiece(rowStart, col);
    
    for (var i = 0; i < n; i++) {
      debugger;
      //row is the row at that index
      row = board.rows()[i];
      //col index loop
      console.log(row + "row" );
      for (j = 0; j < row.length; j++) {
        
        if (row[j] === 1) {
          
        } else {
          board.togglePiece(row, j);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(row, j);
          }
          
        }
      }
    
    }
    solution.push(board.rows());
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;