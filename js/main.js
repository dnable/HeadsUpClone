window.addEventListener(
    "deviceorientation",
    orientationChanged,
    true
);

function orientationChanged(event)
{
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    document.getElementById("alpha").value = alpha;
    document.getElementById("beta").value = beta;
    document.getElementById("gamma").value = gamma;
}
