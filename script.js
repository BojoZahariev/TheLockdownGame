/*
const frames = document.querySelectorAll('.frame');
const box = document.querySelector('.box');
const dice = document.querySelector('#dice');
const cardDiv = document.querySelector('#cardDiv');
let direction = '';
moved = true;

const changeFrame = (step, move) => {
  let framesArray = Array.from(frames);
  let rect = box.getBoundingClientRect();
  console.log(move);
  //move the player
  if (move === 'forward') {
    framesArray[framesArray.indexOf(box.parentElement) + step].appendChild(box);
    console.log(`forward ${framesArray[framesArray.indexOf(box.parentElement)].textContent}`);
  } else if (move === 'back') {
    framesArray[framesArray.indexOf(box.parentElement) - step].appendChild(box);
    console.log(`back ${framesArray[framesArray.indexOf(box.parentElement)].textContent}`);
  }

  TweenMax.set(box, { x: 0, y: 0 });

  let newRect = box.getBoundingClientRect();

  //animation speed and ease
  TweenMax.from(box, 4, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });

  setTimeout(function() {
    framesArray[framesArray.indexOf(box.parentElement)].scrollIntoView({
      behavior: 'smooth'
    });

    //get the value of the frame
    let trapValue = framesArray[framesArray.indexOf(box.parentElement)].getAttribute('value');

    framesControl(Number(trapValue), box.parentElement);
  }, 4000);
};

//Dice button
dice.addEventListener('click', () => {
  if (moved) {
    moved = false;
    changeFrame(rollDice(), 'forward');
  }
});

//DICE
const rollDice = () => {
  return 1 + Math.floor(Math.random() * 6);
};

framesControl = (boxValue, frame) => {
  if (boxValue === 0) {
    moved = true;
  } else if (frame.classList.contains('trap')) {
    direction = 'back';
    trapFrame(boxValue);
  } else if (frame.classList.contains('boost')) {
    direction = 'forward';

    trapFrame(boxValue);
  }
};

const trapFrame = stepValue => {
  cardDiv.style.display = 'block';

  document.querySelector('#confirm').addEventListener('click', () => {
    changeFrame(stepValue, direction);
    cardDiv.style.display = 'none';
  });
};

*/

const frames = document.querySelectorAll('.frame');
const box = document.querySelector('.box');
const dice = document.querySelector('#dice');
let moved = true;

let valueStep;
let dir;

const changeFrame = (step, move) => {
  //console.log(step);
  let rect = box.getBoundingClientRect();

  //move the player
  if (move === 'forward') {
    Array.from(frames)[Array.from(frames).indexOf(box.parentElement) + step].appendChild(box);
  } else {
    Array.from(frames)[Array.from(frames).indexOf(box.parentElement) - step].appendChild(box);
  }

  //get the value of the frame
  let trapValue = Array.from(frames)[Array.from(frames).indexOf(box.parentElement)].getAttribute('value');

  TweenMax.set(box, { x: 0, y: 0 });

  let newRect = box.getBoundingClientRect();

  //animation speed and ease
  TweenMax.from(box, 4, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });

  setTimeout(function() {
    framesControl(Number(trapValue), box.parentElement);

    Array.from(frames)[Array.from(frames).indexOf(box.parentElement)].scrollIntoView({
      behavior: 'smooth'
    });
  }, 4000);
};

//Dice button
dice.addEventListener('click', () => {
  if (moved) {
    moved = false;
    changeFrame(rollDice(), 'forward');
  }
});

//DICE
const rollDice = () => {
  return 1 + Math.floor(Math.random() * 6);
};

framesControl = (boxValue, frame) => {
  valueStep = boxValue;

  if (boxValue === 0) {
    moved = true;
  } else if (frame.classList.contains('trap')) {
    cardDiv.style.display = 'block';
    dir = 'back';
    //changeFrame(boxValue, 'back');
  } else if (frame.classList.contains('boost')) {
    cardDiv.style.display = 'block';
    dir = 'forward';
    //changeFrame(boxValue, 'forward');
  }
};

document.querySelector('#confirm').addEventListener('click', () => {
  changeFrame(valueStep, dir);
  cardDiv.style.display = 'none';
});
