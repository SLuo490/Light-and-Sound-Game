//Global Variables
//keep track of the secret pattern of button pressed
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
//how far the player is guessing the pattern
var progress = 0;
//keep track of wheter the game is active
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0

/*
    Start Game
*/
function startGame() {
    //initialize game variables
    progress = 0;
    gamePlaying = true;

    // swap the Start and Stop buttons when game start
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
}

/*
    End Game
*/
function stopGame() {
    gamePlaying = false;

    // swap the Start and Stop buttons when game stop
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
// Higher Number -> higher pitch
// Lower Number -> lower pitch
const freqMap = {
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2
}

/**
 * 
 * @param {number} btn - corresponding to the button pressed
 * @param {number} len - duration of the sound 
 */
function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    tonePlaying = true
    setTimeout(function () {
        stopTone()
    }, len)
}

/**
 * 
 * @param {number} btn - corresponding to the button pressed
 */
function startTone(btn) {
    if (!tonePlaying) {
        o.frequency.value = freqMap[btn]
        g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
        tonePlaying = true
    }
}
function stopTone() {
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)

/**
 * 
 * @param {number} btn - add "lit" the button corresponding to button number
 */
function lightButton(btn) {
    document.getElementById("button" + btn).classList.add("lit")
}

/**
 * 
 * @param {number} btn - remove "lit" the button corresponding to button number
 */
function clearButton(btn) {
    document.getElementById("button" + btn).classList.remove("lit")
}