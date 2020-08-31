var frames = document.querySelectorAll('.frame');
var box = document.querySelector('.box');
var dice = document.querySelector('#dice');
moved = true;

function changeFrame(step, move) {
  //console.log(step);
  let rect = box.getBoundingClientRect();

  //move the player
  if (move === 'forward') {
    Array.from(frames)[Array.from(frames).indexOf(box.parentElement) + step].appendChild(box);
  } else {
    Array.from(frames)[Array.from(frames).indexOf(box.parentElement) - step].appendChild(box);
  }

  let trapValue = Array.from(frames)[Array.from(frames).indexOf(box.parentElement)].getAttribute('value');

  TweenMax.set(box, { x: 0, y: 0 });

  var newRect = box.getBoundingClientRect();

  //animation speed and ease
  TweenMax.from(box, 4, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power1.easeInOut
  });

  setTimeout(function() {
    framesControl(Number(trapValue));
  }, 5000);
}

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

framesControl = boxValue => {
  console.log(boxValue);
  if (boxValue === 0) {
    moved = true;
  } else {
    changeFrame(boxValue, 'back');
  }
};
