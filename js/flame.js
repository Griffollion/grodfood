var src = document.getElementById("f0");
var num = 30;
var dur = 1.5;
var startX = function(){ return $('.container').width()/2+(-75+80*Math.random()) }
var endY = function(){ return $('.container').height()/1.3 }

function startFire(){ 
	for (var i=1; i<num; i++){
		var _f = src.cloneNode(true);
    _f.id = String("flame"+i);
		document.getElementById("fire").appendChild(_f);
		if      (i%3) _f.style.backgroundImage = "url()";
		else if (i%2) _f.style.backgroundImage = "url(./images/fire-back-2.png)";
		loop(_f, i/num );
	}
  src.style.display='none';
}


function loop(_f, _p=0){ //console.log(_f._gsTransform.scaleX)
  var _tl = new TimelineLite()
  .fromTo(_f, dur/2+(dur/2)*Math.random(), {
    alpha:1,
    x:startX(),
    y:$('.container').height(),
    scaleX:2.75,
    scaleY:2.33
  }, {
    y:endY(),
    ease:Linear.easeNone,
    scaleX:1+Math.random(),
    scaleY:2.5+4*Math.random(),
    onComplete:loop, onCompleteParams:[_f]
  },0)
  .to(_f, dur/5, {alpha:0},"-="+String(dur/2))
  .progress(_p)
}


startFire();