import React, { useState } from "react";
import "./Board.css";
import ReactJsAlert from "reactjs-alert";

const sudokuIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const initialState = [
  [-1, -1, -1, 2, 6, -1, 7, -1, 1],
  [6, 8, -1, -1, 7, -1, -1, 9, -1],
  [1, 9, -1, -1, -1, 4, 5, -1, -1],
  [8, 2, -1, 1, -1, -1, -1, 4, -1],
  [-1, -1, 4, 6, -1, 2, 9, -1, -1],
  [-1, 5, -1, -1, -1, 3, -1, 2, 8],
  [-1, -1, 9, 3, -1, -1, -1, 7, 4],
  [-1, 4, -1, -1, 5, -1, -1, 3, 6],
  [7, -1, 3, -1, 1, 8, -1, -1, -1],
];

const Board = () => {
  const [sudokuGame, setSudokuGame] = useState(initialState);
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");

  function inputConverter(argument) {
    return JSON.parse(JSON.stringify(argument));
  }

  function onInputChange(event, row, col) {
    var val = parseInt(event.target.value) || -1,
      grid = inputConverter(sudokuGame);

    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuGame(grid);
  }

  function validateComplete(sudokuGame) {
    var validation = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = sudokuGame[i][j];
        if (value === -1) {
          return false;
        }
      }
    }
    if (validation) {
      validateSudoku(sudokuGame);
    }
  }

  function validateSudoku(sudokuGame) {
    var emptyValues = false;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        var value = sudokuGame[i][j];
        if (value === -1) {
          emptyValues = true;
        }
        if (value !== -1) {
          if (
            !validateRow(sudokuGame, i, j, value) ||
            !validateColumn(sudokuGame, i, j, value) ||
            !validateBox(sudokuGame, i, j, value)
          ) {
            return false;
          }
        }
      }
    }
    if (!emptyValues) {
      setTitle("Completed!");
      setStatus(true);
      setType("success");
    }

    return true;
  }

  function validateRow(sudokuGame, row, column, value) {
    // j represents on column
    for (let j = 0; j < 8; j++) {
      // check if the current column matches the passed in column
      if (j !== column) {
        if (sudokuGame[row][j] === value) {
          setTitle("Error in Row");
          setStatus(true);
          setType("warning");

          return false;
        }
      }
    }
    return true;
  }

  function validateColumn(sudokuGame, row, column, value) {
    // j represents on row
    for (let i = 0; i < 8; i++) {
      // check if the current row matches the passed in row
      if (i !== row) {
        if (sudokuGame[i][column] === value) {
          setTitle("Error in Column");
          setStatus(true);
          setType("warning");

          return false;
        }
      }
    }

    return true;
  }

  function validateBox(sudokuGame, row, column, value) {
    const startRow = row - (row % 3),
      startCol = column - (column % 3);

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row && j !== column) {
          if (sudokuGame[i][j] === value) {
            setTitle("Error in Box");
            setStatus(true);
            setType("warning");

            return false;
          }
        }
      }
    }

    return true;
  }

  return (
    <div className="sudoku-container">
      <table className="board">
        <tbody>
          {sudokuIndex.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={(row + 1) % 3 === 0 ? "bBorder" : ""}
              >
                {sudokuIndex.map((col, colIndex) => {
                  return (
                    <td
                      key={rowIndex + colIndex}
                      className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                    >
                      <input
                        onChange={(e) => onInputChange(e, row, col)}
                        className="subgridInput"
                        value={
                          sudokuGame[row][col] === -1
                            ? " "
                            : sudokuGame[row][col]
                        }
                        disabled={initialState[row][col] !== -1}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*  Made a complete validation of -1 positions inside the array.
      <button
        className="checkButton"
        onClick={() => validateComplete(sudokuGame)}
      >
      
        Check answers
      </button>
      */}

      <button
        className="checkButton"
        onClick={() => validateSudoku(sudokuGame)}
      >
        Check answers
      </button>

      <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        Close={() => setStatus(false)}
      />
    </div>
  );
};

export default Board;
