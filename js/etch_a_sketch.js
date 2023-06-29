
let currentBrush = 'black';
let gridSize = 16;
let blocksRow = null; 
let brushActive = false; 
let brushes = document.querySelectorAll('.brush'); 

// Grid container
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');

const main = document.querySelector('main');
main.appendChild(gridContainer);

const clearButton = document.createElement('button');
clearButton.classList.add('clearButton');
clearButton.textContent = 'CLEAR BOARD';
main.appendChild(clearButton);
clearButton.addEventListener('click', drawGrid);

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


// Grid size button 
let getGridSize = document.getElementById("get-grid-size");
getGridSize.addEventListener("click", function() {
	
	let userInput = prompt("Please enter your desired grid size:");
	let parsedInput = parseInt(userInput);
	if (!isNaN(parsedInput)) {
    	gridSize = parsedInput;
    	clearGrid()
		drawGrid();
  	} else {
    	console.log("Invalid input: " + userInput);
  	}
});

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
