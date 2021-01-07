const sudoku = new Sudoku(`
    1 0 0   0 0 0   0 0 0
    0 0 0   0 0 0   0 3 0
    0 0 0   8 0 0   0 0 0    
    
    0 6 0   2 0 0   0 0 0
    0 0 0   0 0 0   0 5 0
    0 0 0   0 0 0   0 0 0

    0 0 4   0 0 0   0 0 0
    0 0 0   0 0 0   0 0 0
    0 0 0   0 0 9   7 0 0
`);

document.querySelector("#app").append(sudoku.getHTML(500));
