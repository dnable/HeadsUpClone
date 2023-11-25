let categoryArray = [];
let currentWordIndex = 0;
var lastNext = 0;
var pointsCorrect = 0;
var targetMinutes = 0;
var targetTime = 0;
var now = 0;    
var timerInterval;
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
        //only allow next word every 5 seconds
        if (Date.now() - lastNext > 5000) {
            nextWord();
            lastNext = Date.now();
            pointsCorrect += 1;
            document.getElementById('scoreCount').textContent = pointsCorrect;
        }
    }
    //skip word
    else if (beta <= 10) {
        //only allow skips every 5 seconds
        if (Date.now() - lastNext > 5000) {
            nextWord();
            lastNext = Date.now();
        }
    }


    //device face down rotated on the x axis by beta degrees - towards 180
    //deivce face up rotated on x axis by beta degrees - towards 0
    
}

function newGame(category) {
    //set targetTime and start timer
    now = new Date().getTime();
    targetMinutes = document.getElementById('timer-input').value;    
    targetTime = new Date(now + (targetMinutes * 60 * 1000));        
    timer();
    timerInterval = setInterval(timer, 1000);

    //set category
    setCategoryArray(category);
    shuffleArray(categoryArray);
    document.getElementById('currentWord').textContent = categoryArray[currentWordIndex];    
}

function setCategoryArray(category) {
    if (category == "harryPotter") {
        categoryArray = ["Harry Potter",
        "Hermione Granger",
        "Ron Weasley",
        "Albus Dumbledore",
        "Severus Snape",
        "Voldemort",
        "Gryffindor",
        "Slytherin",
        "Hufflepuff",
        "Ravenclaw",
        "Quidditch",
        "The Triwizard Tournament",
        "The Forbidden Forest",
        "Hogwarts School of Witchcraft and Wizardry",
        "Platform 9¾",
        "Muggles",
        "Dobby",
        "The Elder Wand",
        "The Invisibility Cloak",
        "The Sorting Hat",
        "Professor McGonagall",
        "Sirius Black",
        "Remus Lupin",
        "Hagrid",
        "The Marauder's Map",
        "The Yule Ball",
        "The Chamber of Secrets",
        "The Prisoner of Azkaban",
        "The Goblet of Fire",
        "The Order of the Phoenix",
        "The Half-Blood Prince",
        "The Deathly Hallows",
        "Buckbeak",
        "Fawkes",
        "The Whomping Willow",
        "Polyjuice Potion",
        "Bertie Bott's Every Flavor Beans",
        "Thestrals",
        "The Triwizard Cup",
        "The Golden Snitch",
        "Wandlore",
        "The Room of Requirement",
        "Thestral Hair",
        "Gillyweed",
        "Pensieve",
        "Dementors",
        "Basilisk",
        "Marauders",
        "Gellert Grindelwald",
        "The Quibbler",
        "Felix Felicis",
        "Horcrux",
        "Dumbledore's Army",
        "Ollivanders",
        "Knockturn Alley",
        "The Leaky Cauldron",
        "The Three Broomsticks",
        "Moaning Myrtle",
        "Thestral Patronus",
        "The Mirror of Erised",
        "Fluffy",
        "Norbert",
        "Hedwig",
        "Blast-Ended Skrewt",
        "Thestrals",
        "Mandrake",
        "Boggart",
        "Floo Powder",
        "S.P.E.W. (Society for the Promotion of Elfish Welfare)",
        "Gilderoy Lockhart",
        "Nearly Headless Nick",
        "Thestral Patronus",
        "Peeves",
        "Hogwarts Express",
        "Mad-Eye Moody",
        "The Veela",
        "Thestral Patronus",
        "Broomstick",
        "Extendable Ears",
        "The Triwizard Cup",
        "Floo Network",
        "Durmstrang Institute",
        "Beauxbatons Academy of Magic",
        "Azkaban",
        "Howler",
        "Thestral Patronus",
        "Potions Class",
        "Transfiguration",
        "Charms",
        "Defense Against the Dark Arts",
        "Divination",
        "Herbology",
        "Care of Magical Creatures",
        "History of Magic",
        "Muggle Studies",
        "Arithmancy",
        "Astronomy",
        "Alchemy",
        "Thestral Patronus",
      ];
    }
}

function nextWord() {
    currentWordIndex += 1;
    document.getElementById('currentWord').textContent = categoryArray[currentWordIndex];
}

// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


// Timer
function timer() {     
    //find distance between target and now    
    now = new Date().getTime();
    var distance = targetTime - now;

    //time calculations
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    //output results
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

    //end timer
    if (distance < 0) {        
        document.getElementById('timer').innerHTML = "Time's up!";
        document.querySelector('.categories').classList.toggle('active');
        document.querySelector('.game').classList.toggle('active');
        clearInterval(timerInterval);        
    }
}

init();


document.getElementById("popCulture").onclick = function () {
    document.querySelector('.categories').classList.toggle('active');
    document.querySelector('.game').classList.toggle('active');
    newGame('popCulture');
}

document.getElementById("movies").onclick = function () {  
    document.querySelector('.categories').classList.toggle('active');
    document.querySelector('.game').classList.toggle('active');
    newGame('movies');
}

document.getElementById("harryPotter").onclick = function () {
    document.querySelector('.categories').classList.toggle('active');    
    document.querySelector('.game').classList.toggle('active');
    newGame('harryPotter');
}