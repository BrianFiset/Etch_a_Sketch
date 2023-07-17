const gridSize = document.querySelector('.grid-size');
const container = document.querySelector('.etch-container');
const gridSizeText = document.querySelector('.grid-size-text');
let mouseDown = false;
let color = 'black';
const selectColor = document.querySelector('#colors');
const clearBtn = document.querySelector('.clear');

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
        startColoring(e);
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
        gridItem.forEach(item => item.addEventListener('mouseover', startColoring));
    } else if (mouseDown === false) {
        gridItem.forEach(item => item.removeEventListener('mouseover',startColoring));
    };
}

function randomColor() {
    let color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    return color
}

function changeColor(event) {
    if(color === 'random') {
        event.target.style.backgroundColor = randomColor()
    } else if(color === 'black') {
        event.target.style.backgroundColor = `black`
    } else if(color === 'white') {
        event.target.style.backgroundColor = `white`
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

// if element is checked
// make colors slowly add 10% opacity 
// if not checked work as normal
function progressiveColoring(event) {
    const progressiveColoring = document.querySelector('.progressive-coloring');
        if(progressiveColoring.checked === true) {
            for(let i = 1; i < 10; i++){
                if(!event.target.style.opacity){
                    event.target.style.opacity = `0.1`;
                    break
                } else if(`${i / 10}` === event.target.style.opacity) {
                    let value = i / 10 + 0.1;
                    event.target.style.opacity = `${value}`;
                    break
                };
            };
        } else {
            event.target.style.removeProperty('opacity');

        };
};

function startColoring(event){
    progressiveColoring(event);
    changeColor(event); 
};

clearBtn.addEventListener('click', () =>{
    createGrid(gridSize.value);
})
