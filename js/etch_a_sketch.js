const testVar = document.createElement('div');
testVar.classList.add('test-div');
testVar.textContent = 'Shall we begin?';

const header = document.querySelector('header');
header.appendChild(testVar);