
var lastBackgroundOffset = 0.5;

function updateBackground(offsetFromLeft) {

  var totalWidth = window.innerWidth;
  var minWidth = 1280;
  var bgWidth = Math.max(totalWidth, minWidth);

  offsetFromLeft = offsetFromLeft - 0.5;

  // The background will be displaced at most by X% of the width
  var displacementPercent = 1 / 100;
  // This is a minimum, mostly for mobile devices
  var minDisplacement = 40;

  var maxDisplacement = displacementPercent * totalWidth;
  maxDisplacement = (maxDisplacement < minDisplacement) ? minDisplacement : maxDisplacement;

  var pixelOffset = - offsetFromLeft * maxDisplacement;
  var percentOffset = (pixelOffset / bgWidth * 100.0) - 50.0;

  $('#hero-bg').css('transform', 'translateX('+ percentOffset + '%)');

}


$(document).ready(function() {
	$('#hero').mousemove(function(e){

    // Calculate where the mouse is with respect to the center of the screen (0.0 to 1.0)
    var totalWidth = window.innerWidth;
    var offset = e.pageX / totalWidth;

    updateBackground( offset );

  });

  $(window).resize(function(){
    updateBackground(0.5);
  });

  window.addEventListener('deviceorientation', function(event){

    var maxRoll = 30;
    // roll is left-to-right inclination
    roll = event.gamma;
    roll = (roll > maxRoll) ? maxRoll : roll;
    roll = (roll < -maxRoll) ? -maxRoll : roll;

    var offset = (roll + maxRoll) / maxRoll / 2.0;

    updateBackground( offset );
  });
});