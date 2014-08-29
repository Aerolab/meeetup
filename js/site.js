
function updateBackground(offsetFromLeft) {

  var totalWidth = window.innerWidth;
  var minWidth = 1280;

  offsetFromLeft *= 2;

  // The background will be displaced at most by X% of the width
  var displacementPercent = 1 / 100;
  // This is a minimum, mostly for mobile devices
  var minDisplacement = 15;

  var maxDisplacement = displacementPercent * totalWidth;
  maxDisplacement = (maxDisplacement < minDisplacement) ? minDisplacement : maxDisplacement;

  var additionalOffset = (totalWidth < minWidth) ? (minWidth - totalWidth) / 2.0 - maxDisplacement : 0.0;

  $('#hero').css('background-position', (- offsetFromLeft * maxDisplacement - additionalOffset) + 'px ' + '100%');

}


$(document).ready(function() {
	$('#hero').mousemove(function(e){

    // Calculate where the mouse is with respect to the center of the screen (0.0 to 1.0)
    var totalWidth = window.innerWidth;
    var offset = e.pageX / totalWidth;

    updateBackground( offset );

  });

  $(window).resize(function(){
    //$('#hero')
  });

  window.addEventListener('deviceorientation', function(event){

    var maxRoll = 15;
    // roll is left-to-right inclination
    roll = event.gamma;
    roll = (roll > maxRoll) ? maxRoll : roll;
    roll = (roll < -maxRoll) ? -maxRoll : roll;

    var offset = (roll + maxRoll) / maxRoll / 2.0;

    updateBackground( offset );
  });
});