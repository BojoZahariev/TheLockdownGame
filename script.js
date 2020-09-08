const frames = document.querySelectorAll('.frame');
const box = document.querySelector('.box');
const diceDiv = document.querySelector('#diceDiv');
const dice = document.querySelector('#diceButton');
let moved = true;

let valueStep;
let direction;

const changeFrame = (step, move) => {
  let rect = box.getBoundingClientRect();
  let framesArray = Array.from(frames);

  //move the player
  if (move === 'forward') {
    framesArray[framesArray.indexOf(box.parentElement) + step].appendChild(box);
  } else {
    framesArray[framesArray.indexOf(box.parentElement) - step].appendChild(box);
  }

  //get the value of the frame
  let trapValue = framesArray[framesArray.indexOf(box.parentElement)].getAttribute('value');

  TweenMax.set(box, { x: 0, y: 0 });

  let newRect = box.getBoundingClientRect();

  //animation speed and ease
  TweenMax.from(box, 4, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });

  //longer waiting time for forward, shorter for backwards
  let forwardTime = 4000;
  let backTime = 500;

  //scroll the parent frame in focus after certain time
  setTimeout(
    function() {
      framesControl(Number(trapValue), box.parentElement);

      framesArray[framesArray.indexOf(box.parentElement)].scrollIntoView({
        behavior: 'smooth'
      });
    },
    direction === 'forward' ? forwardTime : backTime
  );
};

//DICE
/*
const rollDice = () => {
  return 1 + Math.floor(Math.random() * 6);
};
*/

framesControl = (boxValue, frame) => {
  valueStep = boxValue;

  if (boxValue === 0) {
    diceDiv.style.display = 'block';
    moved = true;
  } else if (frame.classList.contains('trap')) {
    cardDiv.style.display = 'block';
    diceDiv.style.display = 'none';
    direction = 'back';
  } else if (frame.classList.contains('boost')) {
    cardDiv.style.display = 'block';
    diceDiv.style.display = 'none';
    direction = 'forward';
  }
};

//Confirm Button for the trap or boost card
document.querySelector('#confirm').addEventListener('click', () => {
  changeFrame(valueStep, direction);
  cardDiv.style.display = 'none';
});

//Dice button
dice.addEventListener('click', () => {
  if (moved) {
    moved = false;
    direction = 'forward';
    changeFrame(rollDice(), direction);
  }
});

/*
const addDots = (element, number) => {
  for (let i = 0; i < number; i++) {
    const dot = document.createElement('div');
    dot.setAttribute('class', 'dot');
    element.appendChild(dot);
  }
};

const addColumns = (array, element) => {
  array.forEach(item => {
    const column = document.createElement('div');
    column.setAttribute('class', 'dot-column');
    addDots(column, item);
    element.appendChild(column);
  });
};

const generateDice = number => {
  const face = document.getElementById('dice-face');
  const dotWrapper = document.createElement('div');
  dotWrapper.setAttribute('class', 'dot-wrapper');

  switch (number) {
    case 1:
      addDots(face, 1);
      break;
    case 2:
      addDots(dotWrapper, 2);
      dotWrapper.childNodes[1].setAttribute('style', 'align-self:flex-end;');
      break;
    case 3:
      addDots(dotWrapper, 3);
      dotWrapper.childNodes[0].setAttribute('style', 'align-self:flex-end;');
      dotWrapper.childNodes[1].setAttribute('style', 'align-self:center;');
      break;
    case 4:
      addColumns([2, 2], dotWrapper);
      break;
    case 6:
      addColumns([3, 3], dotWrapper);
      break;
    case 5:
      addColumns([2, 1, 2], dotWrapper);
      dotWrapper.childNodes[1].setAttribute('style', 'justify-content:center;');
      break;
  }
  if (number !== 1) face.appendChild(dotWrapper);
};

const rollDice = () => {
  const dice = document.getElementById('dice-face');
  dice.className = 'dice-face rolling';
  let value = Math.floor(Math.random() * 6) + 1;

  setTimeout(() => {
    dice.className = 'dice-face';
    if (dice.childNodes && dice.childNodes[0]) dice.childNodes[0].remove();
    generateDice(value);
  }, 300);

  return value;
};

rollDice();

*/
function rollDice() {
  const dice = [...document.querySelectorAll('.die-list')];

  let n;
  dice.forEach(die => {
    toggleClasses(die);
    n = getRandomNumber(1, 6);
    die.dataset.roll = n;
  });

  return n;
}

function toggleClasses(die) {
  die.classList.toggle('odd-roll');
  die.classList.toggle('even-roll');
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//document.getElementById("roll-button").addEventListener("click", rollDice);
