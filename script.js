var teamBlue = document.querySelector('.blue');
var teamRed = document.querySelector('.red');
var box = document.querySelector('.box');

teamBlue.addEventListener('click', changeTeam);
teamRed.addEventListener('click', changeTeam);

function changeTeam() {
  var rect = box.getBoundingClientRect();
  var classes = this.classList;
  this.appendChild(box);

  TweenMax.set(box, { x: 0, y: 0 });

  if (classes.contains('red')) {
    TweenMax.to(box, 1, { backgroundColor: 'red' });
  } else if (classes.contains('blue')) {
    TweenMax.to(box, 1, { backgroundColor: 'blue' });
  }

  var newRect = box.getBoundingClientRect();

  TweenMax.from(box, 1, {
    x: rect.left - newRect.left,
    y: rect.top - newRect.top,
    ease: Power3.easeOut
  });
}
