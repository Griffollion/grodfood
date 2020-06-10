window.addEventListener("load", function () {
var screens = this.document.querySelectorAll('.screen');
var screen1 = this.document.querySelector('.screen-1');
var screen2 = this.document.querySelector('.screen-2');
var screen3 = this.document.querySelector('.screen-3');
var screen3Text1 = this.document.querySelector('.screen-3__text-1');
var screen3Text2 = this.document.querySelector('.screen-3__text-2');

  var hand = document.querySelector(".screen-2__hand img");
  var startPoint1 = null;
  var counterUp = 0;
  var counterDown = 0;
  var isPressed = false;
  var upped = false;
  var downed = false;
  var counterLinit = 15;
  var transform = 0;
  var transfornOffset = 3;
  var progressBar = document.querySelector('.screen-2 .screen-1__progres');
  var progressBarComputed = getComputedStyle(document.querySelector('.screen-2 .screen-1__progres'));
  var progressBarWidth = parseInt(progressBarComputed.width);
  var progressBarWidthOffset = 30;
  var totalCounter = 0;
  var animationTime = 500;
  var fallingClasses = ['falling','falling-1','falling-2','falling-3'];

  var fireBar = document.querySelector('.screen-2 .screen-1__progress-fire');
  var fireBarMove = 0;
  var fireBarTransformOffset = 30;

  function changeScreen() {
    for (i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
      }
}
screen1.classList.add('active');


screen1.addEventListener('mousedown', function(e) {
    changeScreen();
    screen2.classList.add('active');
    isPressed = true;
    startPoint1 = e.pageY;
});

screen2.addEventListener("mousedown", function (e) {
    isPressed = true;
  });

  screen2.addEventListener("mouseup", function (e) {
    isPressed = false;
  });

  screen1.addEventListener("touchstart", function (e) {
    isPressed = true;
    changeScreen();
    screen2.classList.add('active');
    var touchobj = e.changedTouches[0];
    var dist = parseInt(touchobj.clientY);
    startPoint1 = dist;
    console.log(startPoint1);
  });

  screen2.addEventListener("touchstart", function (e) {
    isPressed = true;
  });

  screen2.addEventListener("touchend", function (e) {
    isPressed = false;
  });

//вспомогательная функция
function putToCache(elem, cache){
	if(cache.indexOf(elem) != -1){
		return;
	}
	var i = Math.floor(Math.random()*(cache.length + 1));
	cache.splice(i, 0, elem);
}
//функция, возвращающая свеженький, девственный компаратор
function madness(){
	var cache = [];
	return function(a, b){
		putToCache(a, cache);
		putToCache(b, cache);
		return cache.indexOf(b) - cache.indexOf(a);
	}
}
//собственно функция перемешивания
function shuffle(arr){
	var compare = madness();
	return arr.sort(compare);
}


  function createPapper() {
    var papper = document.createElement("img");
    shuffle(fallingClasses);
    var addedClass =  fallingClasses[0];
    papper.src = "../images/papper.png";
    papper.classList.add(addedClass);
    article.append(papper);
  }

  function resetCounters() {
    upped = false;
    downed = false;
    counterDown = 0;
    counterUp = 0;
  }
  
  function addProgress() {
    progressBarWidth += progressBarWidthOffset;
    if(fireBarMove < 160) {
        fireBarMove += fireBarTransformOffset;
        fireBar.style.transform = 'translateX('+fireBarMove+'px)'; 
    } else {
        fireBar.style.transform = 'translateX(180px)'; 
    }
    progressBar.style.width = progressBarWidth+'px'; 

    
  }


  this.window.addEventListener("touchmove", function (e) {
    console.log('mobile');
    var touchobj = e.changedTouches[0];
    var dist = parseInt(touchobj.clientY);
    if (isPressed) {

        if (dist < startPoint1 && counterUp < counterLinit + 1) {
          startPoint1 = dist;
          counterUp++;
          transform -= transfornOffset;
          hand.style.transform = 'translateY('+transform+'px)';
        }
  
        if (dist > startPoint1 && counterDown < counterLinit + 1) {
          startPoint1 = dist;
          counterDown++;
          transform += transfornOffset;
          hand.style.transform = 'translateY('+transform+'px)';
  
        } 
  
        if (counterUp > counterLinit) {
          upped = true;
        }
  
        if (counterDown > counterLinit) {
          downed = true;
        }
  
        if(totalCounter <= 5) {
          if(downed && upped) {
              resetCounters()
              createPapper();
              setTimeout(function(){
                  addProgress();
                  ++totalCounter
              }, animationTime);
            
          }
       } else {
           setTimeout(function() {
              changeScreen();
              screen3.classList.add('active');
              setTimeout(function() {
                  screen3Text1.classList.add('invisible');
                  screen3Text2.classList.add('visible');
              },2000)
           },500)
     
       }
      }
  
 

  });

  screen2.addEventListener("mousemove", function (e) {
    if (isPressed) {
      if (e.pageY < startPoint1 && counterUp < counterLinit + 1) {
        startPoint1 = e.pageY;
        counterUp++;
        transform -= transfornOffset;
        hand.style.transform = 'translateY('+transform+'px)';
      }

      if (e.pageY > startPoint1 && counterDown < counterLinit + 1) {
        startPoint1 = e.pageY;
        counterDown++;
        transform += transfornOffset;
        hand.style.transform = 'translateY('+transform+'px)';

      } 

      if (counterUp > counterLinit) {
        upped = true;
      }

      if (counterDown > counterLinit) {
        downed = true;
      }

      if(totalCounter <= 5) {
        if(downed && upped) {
            resetCounters()
            createPapper();
            setTimeout(function(){
                addProgress();
                ++totalCounter
            }, animationTime);
          
        }
     } else {
         setTimeout(function() {
            changeScreen();
            screen3.classList.add('active');
            isPressed = false;
            setTimeout(function() {
                screen3Text1.classList.add('invisible');
                screen3Text2.classList.add('visible');
            },2000)
         },500)
   
     }
    }
  });
});
