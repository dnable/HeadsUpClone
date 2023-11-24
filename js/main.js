const startBtn = document.querySelector(".start-btn");
const isIOS = !(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );



function init() {
    startBtn.addEventListener("click", startOrientation);
}

function startOrientation() {
    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
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
    // event.absolute = true;
    
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    
    document.getElementById("alpha").value = alpha;
    document.getElementById("beta").value = beta;
    document.getElementById("gamma").value = gamma;

    //device face down is -180 on y axis (beta)
    //device face up is 0 on all axis
}

// window.addEventListener(
//     "deviceorientation",
//     handleOrientation,
//     true
// );


init();