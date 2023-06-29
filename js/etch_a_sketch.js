
let currentBrush = 'black';
let gridSize = 16;
let blocksRow = null; 
let brushActive = false; 
let brushes = document.querySelectorAll('.brush'); 

// Grid container
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');

const gridStuff = document.querySelector('#gridStuff');
gridStuff.appendChild(gridContainer);

const clearButton = document.createElement('button');
clearButton.classList.add('clearButton');
clearButton.textContent = 'CLEAR BOARD';
gridStuff.appendChild(clearButton);
clearButton.addEventListener('click', drawGrid);

// Size update and slider code 
const gridSizeSlider = document.getElementById('gridSizeSlider');
const gridSizeLabel = document.getElementById('gridSizeLabel');
const sizeApplyButton = document.getElementById('sizeApplyButton');

sizeApplyButton.addEventListener('click', function(){
	gridSize = parseInt(gridSizeSlider.value);
	drawGrid();
});

gridSizeSlider.addEventListener('input', function(){
	gridSizeLabel.textContent = `Grid Size: ${gridSizeSlider.value}`;
});
//___________________________

// Grids 
function drawGrid() {
	clearGrid();
	currentBrush = 'black';

	for (let i = 0; i < gridSize; i++) { 
	    blocksRow = document.createElement('div');
	    blocksRow.classList.add('blocksRow');
	    for (let j = 0; j < gridSize; j++) { 
	        let block = document.createElement('div'); 
	        block.classList.add('block');
	        blocksRow.appendChild(block); 
	    }
	    gridContainer.appendChild(blocksRow);
	}
	attachBlockEventListeners(); 
	attachBrushEventListeners(); 
	defaultBrushSelection();
}

function clearGrid() {
	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}
}

function attachBlockEventListeners() {
	const blocks = document.querySelectorAll('.block');
	blocks.forEach((block) => {
	  block.addEventListener('mouseover', updateBackground);
	  block.addEventListener('click', updateBackground);
	});
}

// Active brush mode/type setup 
function updateBackground(event) {
	let ctrlIsPressed = event.ctrlKey;
	if (currentBrush === 'black' && ctrlIsPressed) {
		event.target.style.backgroundColor = 'black';
	} else if (currentBrush === 'eraser' && ctrlIsPressed) {
		event.target.style.backgroundColor = 'rgb(170, 170, 170)';
	} else if (currentBrush === 'rainbow' && ctrlIsPressed) {
		event.target.style.backgroundColor = 'brown';
	}
}

function attachBrushEventListeners() {
	brushes.forEach(brush => {
		brush.addEventListener('mouseover', function() {
			brush.classList.add('hovered'); 
		})
		brush.addEventListener('mouseout', function() {
			brush.classList.remove('hovered'); 
		})
		brush.addEventListener('click', function(event) {
			brushes.forEach(brush => {
				brush.classList.remove('clicked');
			});

			brush.classList.add('clicked');

			let clicked = event.target.id; 
			if (clicked == 'black') {
				currentBrush = 'black';  
			}
			else if (clicked == 'eraser') {
				currentBrush = 'eraser';
			}
			else if (clicked == 'rainbow') {
				currentBrush = 'rainbow';
			}			
		})
	});
} 
//______________________________
function defaultBrushSelection() {
	let element = document.querySelector("#black");
	element.click();
}

drawGrid();
