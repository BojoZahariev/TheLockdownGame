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

  //get the value of the frame
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
    framesControl(Number(trapValue), box.parentElement);

    box.scrollIntoView({
      behavior: 'smooth'
    });

    /*
    window.scrollBy({
      top: 300, // could be negative value
      left: 0,
      behavior: 'smooth'
    });
    */
  }, 4000);
}

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
  console.log(boxValue);
  if (boxValue === 0) {
    moved = true;
  } else if (frame.classList.contains('trap')) {
    changeFrame(boxValue, 'back');
  } else if (frame.classList.contains('boost')) {
    changeFrame(boxValue, 'forward');
  }
};
