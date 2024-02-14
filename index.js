let buttonColors = ["red","yellow","green","blue"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

// generating user clicked pattern
$(".btn").click(function() {
    //checking which button is clicked and getting its id
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

//generating random sequence
function nextSequence() {
    userClickedPattern = []
    level = level + 1;
    $("#title-heading").text("Level  " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    //flashing effect 
    $("#"+randomColor).fadeOut(100).fadeIn(100);  
        
    playSound(randomColor); 
}

//playing sound of selected button
function playSound(colorName) {
    let audio = new Audio("./sounds/" + colorName + ".mp3");
    audio.play();
}

//adding and removing pressed effect on clicked button
function animatePress(colorName) {
    $("#"+colorName).addClass("pressed");

    setTimeout(function() {
        $("#"+colorName).removeClass("pressed");;
    },100)
}

$(document).keydown(function() {
    if(!gameStarted) {
        $("#title-heading").text("Level  " + level);
        nextSequence();
        gameStarted = true;
    }
})

function checkAnswer(currentLevel) {
    //checking correct key pressed or not
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // player has completed the pattern
        if(userClickedPattern.length === gamePattern.length) {
            //  now we can generate next element of the sequence
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("gameOver");
        setTimeout(function() {
            $("body").removeClass("gameOver");
        },200)
        $("#title-heading").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
