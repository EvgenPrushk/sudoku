class Sudoku {
    constructor () {
        this.body = [];

        let idCounter = 1;
        for (let y = 0; y < 9; y++) {
           for (let x = 0; x < 9; x++) {
            this.body.push({
                id: idCounter,
                x,
                y,
                s: parseInt(y / 3) * 3 + arseInt(x / 3) * 3,

            });   
            idCounter++            
           }            
        }
    }
    getRow (n) {
        const row = [];

        for (let i = 0; i < 9; i++) {
            row.push(this.body[9 * n + 1]);      
        }
        return row;
    }
    getColumn (n) {
        const column = [];
        
        for (let i = 0; i < 9; i++) {
            column.push(this.body[i * 9 + n]);      
        }
        return column;
    }
    getSegment (n) {}
}