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

const gridItem = document.querySelectorAll('.item');
let mouseDown = false;

gridItem.forEach(item => item.addEventListener('mousedown', (e) => {
    changeColor(e)
    mouseDown = true;
    itemHover()
}));

gridItem.forEach(item => item.addEventListener('mouseup', () => {
    mouseDown = false;
    itemHover()
}));

function itemHover() {
    if (mouseDown === true) {
        gridItem.forEach(item => item.addEventListener('mouseover', changeColor));
    } else if (mouseDown === false) {
        gridItem.forEach(item => item.removeEventListener('mouseover',changeColor));
    };
}
function changeColor(event) {
    event.target.style = `background-color: black;`
};
