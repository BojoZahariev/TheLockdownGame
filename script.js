const frames = document.querySelectorAll('.frame');
const box = document.querySelector('.box');
const dice = document.querySelector('#dice');
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

//Dice button
dice.addEventListener('click', () => {
  if (moved) {
    moved = false;
    direction = 'forward';
    changeFrame(rollDice(), direction);
  }
});

//DICE
const rollDice = () => {
  return 1 + Math.floor(Math.random() * 6);
};

framesControl = (boxValue, frame) => {
  valueStep = boxValue;

  if (boxValue === 0) {
    dice.style.display = 'block';
    moved = true;
  } else if (frame.classList.contains('trap')) {
    cardDiv.style.display = 'block';
    dice.style.display = 'none';
    direction = 'back';
  } else if (frame.classList.contains('boost')) {
    cardDiv.style.display = 'block';
    dice.style.display = 'none';
    direction = 'forward';
  }
};

//Confirm Button for the trap or boost card
document.querySelector('#confirm').addEventListener('click', () => {
  changeFrame(valueStep, direction);
  cardDiv.style.display = 'none';
});
