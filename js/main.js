const categories = ["Harry Potter", "Hermione Granger", "Ron Weasley"];
const popCultureBtn = document.getElementById("popCulture");
const moviesBtn = document.getElementById("movies");
const harryPotterBtn = document.getElementById("harryPotter");
const isIOS = !(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );



function init() {
    popCultureBtn.addEventListener("click", startOrientation);    
    moviesBtn.addEventListener("click", startOrientation);
    harryPotterBtn.addEventListener("click", startOrientation);
}

function startOrientation() {
    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
            alert("allowed!");
          } else {
            alert("has to be allowed!");
          }
        })
        .catch(() => alert("not supported"));
    } else {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
  }


function handleOrientation(event)
{   
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    if (beta >= 100) {
        nextCategory();
    }

    //device face down rotated on the x axis by beta degrees - towards 180
    //deivce face up rotated on x axis by beta degrees - towards 0
    
}

function newGame(category) {

    if (category == "harryPotter") {       

        document.getElementById('currentWord').textContent = categories[0];
    }
}

function nextCategory() {
    document.getElementById('currentWord').textContent = categories[1];
}


init();

document.getElementById("popCulture").onclick = function () {
    document.querySelector('.categories').classList.toggle('active');
    document.querySelector('.game').classList.toggle('active');
}

document.getElementById("movies").onclick = function () {  
    document.querySelector('.categories').classList.toggle('active');
    document.querySelector('.game').classList.toggle('active');
}

document.getElementById("harryPotter").onclick = function () {
    document.querySelector('.categories').classList.toggle('active');    
    document.querySelector('.game').classList.toggle('active');

    newGame('harryPotter')
}