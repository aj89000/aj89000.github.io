(function () {
  'use strict';
  var heading = document.querySelector('.hero h2');
  if (!heading || heading.querySelector('.aj-frame-beam')) return;
  var sides = ['top', 'right', 'bottom', 'left'];
  for (var i = 0; i < sides.length; i++) {
    var beam = document.createElement('span');
    beam.className = 'aj-frame-beam aj-frame-' + sides[i];
    beam.setAttribute('aria-hidden', 'true');
    heading.appendChild(beam);
  }
})();
