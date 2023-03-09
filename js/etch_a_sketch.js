const greeting = document.createElement('div');
greeting.classList.add('greeting');
greeting.textContent = 'Shall we begin?';

const header = document.querySelector('header');
header.appendChild(greeting); 

const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');




const main = document.querySelector('main');
main.appendChild(gridContainer);