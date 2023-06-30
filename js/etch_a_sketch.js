
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

// SaveButton Stuff

// Your existing code for drawing the grid and updating background

// Save Sketch button
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function() {
  saveSketch();
});

async function saveSketch() {
  const canvas = document.createElement('canvas');
  const blocks = document.querySelectorAll('.block');

  let blockWidth = 5;
  let blockHeight = blockWidth;
  // Determine the dimensions of the canvas based on the grid size
  const gridSize = Math.sqrt(blocks.length);
  const canvasSize = gridSize * blockWidth; // Adjust blockWidth according to your grid layout

  // Set the canvas size
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext('2d');

  // Draw the sketch onto the canvas
  let blockIndex = 0;
  blocks.forEach(block => {
    const backgroundColor = block.style.backgroundColor;
    const x = (blockIndex % gridSize) * blockWidth;
    const y = Math.floor(blockIndex / gridSize) * blockHeight; // Adjust blockHeight according to your grid layout

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, blockWidth, blockHeight); // Adjust blockWidth and blockHeight according to your grid layout

    blockIndex++;
  });

  // Convert the canvas content to a Blob
  const blob = await new Promise(resolve => {
    canvas.toBlob(resolve, 'image/png');
  });

  // Create a File object from the Blob
  const file = new File([blob], 'sketch.png', { type: 'image/png' });

  // Save the file using the File System Access API
// Save the file using the File System Access API
try {
	const handle = await window.showSaveFilePicker();
	const writableStream = await handle.createWritable();
	await writableStream.write(file);
	await writableStream.close();
	console.log('Sketch saved successfully!');
  } catch (err) {
	console.error('Error saving the sketch:', err);
  }
  
}


drawGrid();
