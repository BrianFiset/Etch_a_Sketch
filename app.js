const gridSize = document.querySelector('.grid-size');
const container = document.querySelector('.etch-container');
const gridSizeText = document.querySelector('.grid-size-text');
let mouseDown = false;
let color = 'black';
const selectColor = document.querySelector('#colors');

function createGridItems(element){
    const container = document.querySelector(element);
    const item = document.createElement('div');
    item.classList.add('item');
    container.appendChild(item);
};

function createGridLines(element){
    const itemLine = document.createElement('div');
    itemLine.classList.add('item-line');
    itemLine.classList.add(element);
    container.appendChild(itemLine);
};

function createGrid(number){
    deleteGrid()
    for(let i = 1; i <= number; i++) {
        createGridLines(`line-${i}`);
        for(let j = 1; j <= number; j++) {
            createGridItems(`.line-${i}`);
        }
    }
    coloringGrid()
};

function deleteGrid(){
    container.innerText = ''
}

createGrid(16);


function coloringGrid(){
    const gridItem = document.querySelectorAll('.item');
    gridItem.forEach(item => item.addEventListener('mousedown', (e) => {
        changeColor(e);
        mouseDown = true;
        itemHover(gridItem);
    }));

    gridItem.forEach(item => item.addEventListener('mouseup', () => {
        mouseDown = false;
        itemHover(gridItem);
    }));
}

function itemHover(gridItem) {
    if (mouseDown === true) {
        gridItem.forEach(item => item.addEventListener('mouseover', changeColor));
    } else if (mouseDown === false) {
        gridItem.forEach(item => item.removeEventListener('mouseover',changeColor));
    };
}

function randomColor() {
    let color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    return color
}

function changeColor(event) {
    if(color === 'random') {
        event.target.style = `background-color: ${randomColor()};`
    } else if(color === 'black') {
        event.target.style = `background-color: black;`
    } else if(color === 'white') {
        event.target.style = `background-color: white;`
    }
};

gridSize.addEventListener('change', () => {
     changeText(gridSizeText, `${gridSize.value}X${gridSize.value}`);
     createGrid(gridSize.value);
});

function changeText(content, text){
    content.innerText = text;
};


selectColor.addEventListener('change', () => {
    color = selectColor.value;
});