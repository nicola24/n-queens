// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var conflict = 0;
      this.rows()[rowIndex].forEach(function(i) {
        if (i === 1) {
          conflict ++;
        }
      });
      if (conflict > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var test = false;
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          test = true;
        } 
      }
      return test;
      
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var conflict = 0;
      for (var i = 0; i < this.get('n'); i++) {
        var rowIndex = i;
        if (this.get(rowIndex)[colIndex] === 1) {
          conflict++;
        }

      }
      if (conflict > 1) {
        return true;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var test = false;
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          test = true;
        }
      }
      return test; // fixme
    },
  



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // conflict variable to measure amount of "1" present in the matrix.

      var conflicts = 0;

      // set columnIndex to the parameter for easier use.

      var columnIndex = majorDiagonalColumnIndexAtFirstRow;

      //loop for the length of 'n'

      for (var i = 0; i < this.get('n'); i++) {

      //if the column number is within the scope of 'n' execute the function.
    
        if (columnIndex < this.get('n')) {

          //columnAtRow will represent the value at row of i at the column index.

          var columnAtRow = this.rows()[i][columnIndex];

         

          //if that value = 1, the conflicts variable is increased.
       
          if ( columnAtRow === 1) {

            conflicts++;
          }
        
          //then increment the column index so we can loop again and search the next row at the diagonal index.

          columnIndex++;

        }

      }

      // after the function if the conflicts are greater than 1, we know theres two diagonal "1" instances

      if (conflicts > 1) {

        return true;

      } else {

        return false;

      }

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      
        
      //set the test = false because we have not achieved a conflicts number bigger than one 
      var test = false;
      //loop
      var iValue = this.get('n');
      for (var i = -iValue; i < iValue; i++) {
        
        //the hasMajorDiagonalConflictAt function will loop through the matrix starting at the inputted index i.
        if (this.hasMajorDiagonalConflictAt(i)) {
          // if it evaluates to a conflict set test to true.
          test = true;
        }
                
      }
      
      
      
      // return the result.
      return test; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var conflictsReturn = 0;
      var extraLength = (this.get('n') * 2) - 2;
      // set columnIndex to the parameter for easier use.

      var columnIndex1 = minorDiagonalColumnIndexAtFirstRow;

      //loop for the length of 'n'
      
      for (var i = 0; i < this.get('n'); i++) {

      //if the column number is within the scope of 'n' execute the function.
    
        if (columnIndex1 < extraLength) {

          //columnAtRow will represent the value at row of i at the column index.

          var columnAtRow1 = this.rows()[i][columnIndex1];

        

          //if that value = 1, the conflictsReturn variable is increased.
       
          if ( columnAtRow1 === 1) {

            conflictsReturn++;
          }
        
          //then increment the column index so we can loop again and search the next row at the diagonal index.

          columnIndex1--;

        }

      }

      // after the function if the conflictsReturn are greater than 1, we know theres two diagonal "1" instances

      if (conflictsReturn > 1) {

        return true;

      } else {

        return false;

      }

    
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //set the test = false because we have not achieved a conflicts number bigger than one 
      var tester = false;
      //loop
      var iNumber = (this.get('n') * 2) - 2;
      console.log(iNumber);
      for (var i = iNumber; i > 0; i--) {
        
        //the hasMajorDiagonalConflictAt function will loop through the matrix starting at the inputted index i.
        if (this.hasMinorDiagonalConflictAt(i)) {
          // if it evaluates to a conflict set test to true.
          tester = true;
        }
                
      }
      
      
      
      // return the result.
      return tester; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
