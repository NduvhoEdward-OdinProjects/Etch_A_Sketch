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
let gridSize = 16;
let blocksRow = null; 

function drawGrid() {
	clearGrid();
	
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
	});
  }

let currentBrush = 'brush';
function updateBackground(event) {
	if (currentBrush === 'brush') {
		event.target.style.backgroundColor = 'black';
	} else if (currentBrush === 'eraser') {
		event.target.style.backgroundColor = 'rgb(170, 170, 170)';
	} else if (currentBrush === 'customBrush') {
	// For example, you can change the background color to a different color or apply patterns/textures
	}
}

let brushModes = document.querySelectorAll("#brushModes > div > div");
brushModes.forEach(brushMode => {
	brushMode.addEventListener('click', updateBrushMode);
});

function updateBrushMode(event) {
	let clicked = event.target.id;
	if (clicked == 'brush') 
		currentBrush = 'brush';
	else if (clicked = 'eraser')
		currentBrush = 'eraser';
	else if (clicked = 'rainbow')
		currentBrush = 'rainbow';
}

drawGrid();
