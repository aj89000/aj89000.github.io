(function(){
  'use strict';
  var stage = document.querySelector('.logo-stage');
  if (!stage) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas = document.createElement('canvas');
  canvas.className = 'aj-lightning-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.insertBefore(canvas, stage.firstChild);
  var ctx = canvas.getContext('2d');
  if (!ctx) { canvas.parentNode.removeChild(canvas); return; }
  var width = 1, height = 1, scale = 1;
  function resize() {
    var r = stage.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    scale = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, false);
  function makeBolt(x1, y1, x2, y2, count, roughness) {
    var pts = [];
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / len, py = dx / len;
    for (var i = 0; i <= count; i++) {
      var t = i / count;
      var bend = (i === 0 || i === count) ? 0 : (Math.random() - 0.5) * roughness * 2 * Math.sin(Math.PI * t);
      pts.push([x1 + dx * t + px * bend, y1 + dy * t + py * bend]);
    }
    return pts;
  }
  function stroke(points, color, lineWidth, blur, alpha) {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#168fff';
    ctx.shadowBlur = blur;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  function drawBolt() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    var left = Math.random() < 0.5;
    var x1 = left ? 30 + Math.random() * 13 : width - 43 + Math.random() * 13;
    var x2 = left ? 53 + Math.random() * 8 : width - 61 + Math.random() * 8;
    var main = makeBolt(x1, 12, x2, height - 15, 11, 11);
    stroke(main, 'rgba(0,115,255,.55)', 5.2, 17, .9);
    stroke(main, 'rgba(52,178,255,.95)', 2.3, 9, .95);
    stroke(main, 'rgba(244,252,255,1)', .85, 3, 1);
    var branchStarts = [3, 6, 8];
    for (var b = 0; b < branchStarts.length; b++) {
      var p = main[branchStarts[b]];
      var side = (Math.random() < .5 ? -1 : 1) * (left ? 1 : -1);
      var endX = p[0] + side * (10 + Math.random() * 17);
      var endY = p[1] + 5 + Math.random() * 15;
      var branch = makeBolt(p[0], p[1], endX, endY, 4, 5);
      stroke(branch, 'rgba(25,145,255,.7)', 2.1, 8, .85);
      stroke(branch, 'rgba(225,247,255,.95)', .65, 2, .9);
    }
    for (var s = 0; s < 5; s++) {
      var q = main[3 + Math.floor(Math.random() * 7)];
      var ex = q[0] + (Math.random() - .5) * 22;
      var ey = q[1] + (Math.random() - .5) * 18;
      stroke([q, [ex, ey]], 'rgba(160,225,255,.95)', .7, 5, .8);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  function flash() {
    if (document.hidden) { schedule(); return; }
    drawBolt();
    window.setTimeout(drawBolt, 48);
    window.setTimeout(function(){ ctx.clearRect(0, 0, width, height); }, 122);
    schedule();
  }
  function schedule() {
    window.setTimeout(flash, 2100 + Math.random() * 3800);
  }
  schedule();
})();
