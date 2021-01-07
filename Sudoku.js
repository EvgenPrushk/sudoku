class Sudoku {
    constructor() {
        this.body = [];
        let idCounter = 1;
       for (let y = 0; y < 9; y++) {
           for (let x = 0; x < 9; x++) {
               this.body.push({
                   id: idCounter,                  
                   x, 
                   y,
                   number: 0,
                   selected: false,
                   supported: false,
                   ///высчитываем сегмент, где находиться число
                   s: parseInt(y / 3) * 3 + parseInt(x / 3) * 3,
               })

               idCounter++;
           }
           
       }
    }

    getRow (n) {
        const row = [];
        for (let i = 0; i < 9; i++) {
            row.push(this.body[9 * n + i]);
            
        }

        return row;

    };

    getColumn (n) {
        const column = [];
        for (let i = 0; i < 9; i++) {
            column.push(this.body[i * 9 + n]);
            
        }
        return column;
    };

    getSegment (n) {
        const segment = [];
        const x = n % 3;
        const y = parseInt(n / 3);
        for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
               segment.push(this.body[y * 27 + dy * 9 + x * 3 + dx]);
                
            }            
        }

        return segment;
    };

    keydownHandler (event, cell){
        if ("123456789".includes(event.key)) {
            cell.number = parseInt(event.key);
            // отменяет стандартную обработку событий
           
        }
        event.preventDefault();   
        this.viewUpdate();        
    }

    focusHandler (event, cell){        
        cell.selected = true;
        for (const item of this.getRow(cell.y)) {
            item.supported = true;
        }
        for (const item of this.getColumn(cell.x)) {
            item.supported = true;
        }
        this.viewUpdate();
    }

    blurHandler (event, cell){    
        cell.selected = false;
        for (const item of this.getRow(cell.y)) {
            item.supported = false;
        }
        for (const item of this.getColumn(cell.x)) {
            item.supported = false;
        }
        this.viewUpdate();
    }

    getHTML (size) {
        // создание cell элементов
        for (const item of this.body) {
            const inputElement = document.createElement('input');
            inputElement.classList.add('sudoku-cell');
            inputElement.setAttribute('type', 'text'); 
            inputElement.addEventListener('keydown', event => this.keydownHandler(event, item));
            inputElement.addEventListener('focus', event =>this.focusHandler(event, item));
            inputElement.addEventListener('blur', event => this.blurHandler(event, item));

            item.element = inputElement;

        }
        const rootElement = document.createElement('div');
        rootElement.classList.add('sudoku-game');
        rootElement.style.width = `${size}px`;
        rootElement.style.height = `${size}px`;
        rootElement.style['font-size'] = `${size / 20}px`;
        
        for (let s = 0; s < 9; s++) {
            const segmentElement = document.createElement('div');
            segmentElement.classList.add('sudoku-segment');
            rootElement.append(segmentElement);
            //  в начале 
            for (const item of this.getSegment(s)) {
                segmentElement.append(item.element);
            }
        }

        return rootElement;
    }

    viewUpdate () {
        for (const cell of this.body) {
            cell.element.classList.remove("supported-cell", "selected-cell");
            cell.element.value = cell.number ? cell.number : '';
            if (cell.supported) {
               cell.element.classList.add("supported-cell");
           }
          
           if (cell.selected) {
            cell.element.classList.add("selected-cell");
        }   
        }
    }
}