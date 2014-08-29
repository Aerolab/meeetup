// Keep the last 10 frames worth of offsets to smooth the animation.
var $herobg;
var numOffsets = 10;
var lastOffsets = [];
var disableAccelerometer = false;

// This is used for tweening for constant inputs (like the accelerometer)
function updateBackgroundTweened(offsetFromLeft) {

  lastOffsets.push(offsetFromLeft);
  if( lastOffsets.length > numOffsets ) {
    lastOffsets = lastOffsets.slice(-10);
  }

  var sum = 0.0;
  for( var i=0; i<lastOffsets.length; i++ ) { sum += lastOffsets[i]; }
  var avg = sum / lastOffsets.length;

  updateBackground( avg, true );
}


function updateBackground(offsetFromLeft, smooth) {

  if( $herobg == null ){ return; }

  var totalWidth = window.innerWidth;
  var minWidth = 1280;
  var bgWidth = Math.max(totalWidth, minWidth);

  // It works on a range of -0.5 to +0.5
  offsetFromLeft = offsetFromLeft - 0.5;

  // The background will be displaced at most by X% of the width
  var displacementPercent = 1 / 100;
  // This is a minimum, mostly for mobile devices
  var minDisplacement = 60;

  // Smooth the last N% of the movement
  if( typeof smooth != undefined && smooth ) {
    var offsetSmoothEnd = 0.5;
    var offsetSmoothStart = 0.2;
    var offsetSmoothSize = offsetSmoothEnd - offsetSmoothStart;

    if( offsetFromLeft > offsetSmoothStart ) {
      var percentAfter = (offsetFromLeft - offsetSmoothStart) / offsetSmoothSize;

      offsetFromLeft = offsetSmoothStart + ( Math.log(percentAfter*90+10) / Math.LN10 - 1.0 ) * offsetSmoothSize;
    }

    minDisplacement *= 3;
  }

  var maxDisplacement = displacementPercent * totalWidth;
  maxDisplacement = (maxDisplacement < minDisplacement) ? minDisplacement : maxDisplacement;

  var pixelOffset = - offsetFromLeft * maxDisplacement;
  var percentOffset = (pixelOffset / bgWidth * 100.0) - 50.0;


  $herobg.css('transform', 'translateX('+ percentOffset + '%)');

}


$(document).ready(function() {
  $herobg = $('#hero-bg');
	$('#hero').mousemove(function(e){

    disableAccelerometer = true;

    // Calculate where the mouse is with respect to the center of the screen (0.0 to 1.0)
    var totalWidth = window.innerWidth;
    var offset = e.pageX / totalWidth;

    updateBackground( offset );

  });

  $(window).resize(function(){
    updateBackground(0.5);
  });


  window.addEventListener('deviceorientation', function(event){

    if( disableAccelerometer ){ return; }

    var maxRoll = 45;
    // roll is left-to-right inclination
    roll = event.gamma;
    roll = (roll > maxRoll) ? maxRoll : roll;
    roll = (roll < -maxRoll) ? -maxRoll : roll;

    var offset = (roll + maxRoll) / maxRoll / 2.0;

    updateBackgroundTweened( offset );
  });
});