const frames = document.querySelectorAll('.frame');
const cardTexts = document.querySelectorAll('.cardText');
const box = document.querySelector('.box');
const diceDiv = document.querySelector('#diceDiv');
const diceButton = document.querySelector('#diceButton');
const leftText = document.querySelector('#leftText');
const confirm = document.querySelector('#confirm');
const playAgain = document.querySelector('#playAgain');

//Global variables so it's not messing the event listener for the confirm button
let valueStep;
let direction;

//move the player to a new div and scroll the div into view
const changeFrame = (step, move) => {
  let rect = box.getBoundingClientRect();
  let framesArray = Array.from(frames);

  //move the player
  if (move === 'forward') {
    //move to the final frame if the roll is more than the length
    if (!framesArray[framesArray.indexOf(box.parentElement) + step]) {
      framesArray[framesArray.length - 1].appendChild(box);
    } else {
      framesArray[framesArray.indexOf(box.parentElement) + step].appendChild(box);
    }
    //move back to the first frame
  } else if (move === 'start') {
    framesArray[0].appendChild(box);
  } else {
    framesArray[framesArray.indexOf(box.parentElement) - step].appendChild(box);
    //change the emoji to the one with the mask
    box.src = 'images/emojiMask2.png';
  }

  //hide the button until the next roll
  diceButton.style.display = 'none';

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
      framesArray[framesArray.indexOf(box.parentElement)].scrollIntoView({
        behavior: 'smooth'
      });
    },
    direction === 'forward' ? forwardTime : backTime
  );

  //check the new frame parent
  setTimeout(function() {
    framesControl(Number(trapValue), box.parentElement);
  }, 4000);
};

const framesControl = (boxValue, frame) => {
  valueStep = boxValue;

  //check if it's the final frame
  if (frame.classList.contains('final')) {
    //play again
    playAgain.style.display = 'block';
    leftTextContent(99);
    //checks if it's neutral frame
  } else if (boxValue === 0 && !frame.classList.contains('final')) {
    diceButton.style.display = 'block';
    leftTextContent(0);

    //checks if it's a trap card
  } else if (frame.classList.contains('trap')) {
    confirm.style.display = 'block';
    diceButton.style.display = 'none';
    direction = 'back';
    leftTextContent(Number(frame.id));

    //checks if it's a boost card
  } else if (frame.classList.contains('boost')) {
    confirm.style.display = 'block';
    diceButton.style.display = 'none';
    direction = 'forward';
    leftTextContent(Number(frame.id));
  }
};

//Card text
const leftTextContent = index => {
  let cardsTextArray = Array.from(cardTexts);
  //clear the old text
  cardsTextArray.forEach(el => (el.style.display = 'none'));

  //change the card text to the text for neutral frame
  if (index === 0) {
    cardsTextArray[index].style.display = 'flex';
    cardsTextArray[index].textContent = 'So far so good.';
    //load the final text
  } else if (index === 99) {
    //display the last p
    cardsTextArray[cardsTextArray.indexOf(cardsTextArray[cardsTextArray.length - 1])].style.display = 'flex';
  } else {
    //display the new content
    cardsTextArray[index].style.display = 'flex';
  }
};

//Confirm Button for the trap or boost card
confirm.addEventListener('click', () => {
  changeFrame(valueStep, direction);
  confirm.style.display = 'none';
});

//play again btn
playAgain.addEventListener('click', () => {
  leftTextContent(0);
  changeFrame(0, 'start');

  playAgain.style.display = 'none';
  diceButton.style.display = 'block';
});

//Dice button
diceButton.addEventListener('click', () => {
  direction = 'forward';
  changeFrame(rollDice(), direction);

  //change the emoji back to normal
  box.src = 'images/emojiSmile.png';
});

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
