// Grid container
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');

const main = document.querySelector('main');
main.appendChild(gridContainer);

// Grids 
let gridSize = 16;
let blocksRow = null; 

function drawGrid() {
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
}

drawGrid();

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



const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
	block.addEventListener('mouseover', updateBackground);
})

function updateBackground(event){
	console.log("MouseOver");
	console.log(event);
	// Change the background color of the block
	event.target.style.backgroundColor = 'black';
} 


