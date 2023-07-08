function createGridItems(element){
    const container = document.querySelector(element);
    const item = document.createElement('div');
    item.classList.add('item');
    container.appendChild(item);
};

function createGridLines(element){
    const container = document.querySelector('.etch-container');
    const itemLine = document.createElement('div');
    itemLine.classList.add('item-line');
    itemLine.classList.add(element);
    container.appendChild(itemLine);
};

function createGrid(number){
    for(let i = 1; i <= number; i++) {
        createGridLines(`line-${i}`);
        for(let j = 1; j <= number; j++) {
            createGridItems(`.line-${i}`);
        }
    }
}

createGrid(16)

// create function that can make grid squares
// to line them up 