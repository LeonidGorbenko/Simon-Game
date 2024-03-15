let buttonColours =["red", "blue", "green", "yellow"]
let gamePattern =[]
let userClickedPattern=[]
let started= false 
let level = 0 

$(document).keypress(function(){
    if (!started){
        $('#level-title').text('Level ' + level)
        nextSequence()
        started=true
        }
    })



$('.btn').click(function(){
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text('Level ' + level);
    let randomNumber=Math.floor(Math.random()* buttonColours.length)
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}


function playSound(name){
    let audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          console.log("success");
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } else {
          playSound('soinds/wrong.mp3');
          $('body').addClass('game-over')
          $('#level-title').text('Game Over, Press Any Key to Restart, Your scor is ' + level )
          setTimeout(function () {
            $('body').removeClass("game-over");
            }, 2000);
        
        startOver()
        }
    }
    function startOver(){
        level=0
        gamePattern=[]
        started=false
    }