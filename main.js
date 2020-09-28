const theSudokuProblem = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let sudokuNumbers = theSudokuProblem.map(i => { return i.map(j => j) });
let focusGrid = { row: 0, col: 0 };

window.addEventListener("keydown", (e) => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        if (theSudokuProblem[focusGrid.row][focusGrid.col] === 0) {
            if (checkValid(focusGrid.row, focusGrid.col, Number(e.key))) {
                sudokuNumbers[focusGrid.row][focusGrid.col] = Number(e.key);
                updateBoardGridContent();
                console.log(sudokuNumbers.filter(i => { return i.filter(j => j === 0).length !== 0 }).length)
                if (sudokuNumbers.filter(i => { return i.filter(j => j === 0).length !== 0 }).length === 0) {
                    showSuccessEffect();
                }
            } else {
                showErrorEffect();
            }
        }
    }
});

const showErrorEffect = () => {
    document.getElementById("board-holder").style.border = "10px solid rgb(240, 117, 117)";
    window.setTimeout(() => document.getElementById("board-holder").style.border = "10px solid #333", 500);
}

const showSuccessEffect = () => {
    document.getElementById("board-holder").style.border = "10px solid rgb(101, 211, 138)";
    window.setTimeout(() => document.getElementById("board-holder").style.border = "10px solid #333", 5000);
}

const updateBoardGridContent = () => {
    let boardGridContent = ""
    for (let i = 0; i < 9; ++i) {
        let new_9x9_grid = "";
        for (let j = 0; j < 9; ++j) {
            const idx_row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            const idx_col = (i % 3) * 3 + j % 3;
            const number = sudokuNumbers[idx_row][idx_col];
            new_9x9_grid += `<div class='board-grid-1x1' id=${idx_row}*${idx_col} onclick=handleClickGrid(${idx_row},${idx_col})>${number === 0 ? "" : number}</div>`;
        }
        boardGridContent += `<div class='board-grid-9x9'>${new_9x9_grid}</div>`
    }
    document.getElementById("board-holder").innerHTML = boardGridContent;
    updateBoardGridContentColor();
}

const updateBoardGridContentColor = () => {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (theSudokuProblem[i][j] === 0) {
                document.getElementById(`${i}*${j}`).style.color = "#999";
            } else {
                document.getElementById(`${i}*${j}`).style.color = "#333";
            }
        }
    }
    document.getElementById(`${focusGrid.row}*${focusGrid.col}`).style.backgroundColor = "#333";
    document.getElementById(`${focusGrid.row}*${focusGrid.col}`).style.color = "#999";
}

const checkValid = (row, col, num) => {
    if (num === 0) return true
    for (let i = 0; i < 9; ++i) {
        if (i !== row && sudokuNumbers[i][col] === num) {
            return false
        }
        if (i !== col && sudokuNumbers[row][i] === num) {
            return false
        }
        for (let j = 0; j < 9; ++j) {
            const idx_row = Math.floor(row / 3) * 3 + Math.floor(j / 3);
            const idx_col = Math.floor(col / 3) * 3 + j % 3;
            if (idx_row !== row && idx_col !== col && sudokuNumbers[idx_row][idx_col] === num) {
                return false
            }
        }
    }
    return true;
}

const handleClickGrid = (i, j) => {
    focusGrid.row = i;
    focusGrid.col = j;
    updateBoardGridContent();
}

updateBoardGridContent()