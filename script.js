const frames = document.querySelectorAll('.frame');
const box = document.querySelector('.box');
const dice = document.querySelector('#dice');
const cardDiv = document.querySelector('#cardDiv');
moved = true;

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
    console.log(Array.from(frames)[Array.from(frames).indexOf(box.parentElement)].textContent);
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
  if (boxValue === 0) {
    moved = true;
  } else if (frame.classList.contains('trap')) {
    trapFrame(boxValue, 'back');
    //changeFrame(boxValue, 'back');
  } else if (frame.classList.contains('boost')) {
    trapFrame(boxValue, 'forward');
    //changeFrame(boxValue, 'forward');
  }
};

const trapFrame = (boxValue, direction) => {
  cardDiv.style.display = 'block';

  document.querySelector('#confirm').addEventListener('click', () => {
    changeFrame(boxValue, direction);
    cardDiv.style.display = 'none';
  });
};
