/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, winningScore, preDice, diceWait;

/* preDice is the previous value of the dice. If current dice and previous dice are 6, then current value will be zero and it's the
 * next player's turn
 */


/**
 *  diceWait is for alert when player's any of dice is 1, then dice will shown in a short time then it will dissappear. When player try
 *  to click roll button in dice showing time, player will be warned.
 */


var diceDOM = document.querySelector('.dice');
var diceDOM2 = document.querySelector('.dice2');

// Initiliaze the scores
reset();


// Change the active player style (adds active class to active player)
activeChange();

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.querySelector('.winning-score').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;



        /**
         * Check the current and previous dice. If both are 6 it is amazing.
         */
        if (doubleSixControl(dice, preDice)) {
            alert("You unlucky!");
            score[activePlayer] = 0;
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            dice = undefined;
            preDice = undefined;
            activeChange();


        } else {
            preDice = dice;

            // 2. Display the result for the first dice
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';


            // Display the result for the second dice
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-' + dice2 + '.png';

            // 3. Update the number score IF the rolled number was NOT a 1
            if (dice !== 1 && dice2 !== 1) {
                roundScore += dice;
                roundScore += dice2;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            } else {
                roundScore = 0;
                document.getElementById('current-' + activePlayer).textContent = roundScore;

                activeChange();

                // When any of the dice is 1, then player can see it for a second (in parameter), then dices will be disappeared.
                showAndHideDice(700, dice, dice2);
            }
        }

    } else {
        if (diceWait) {
            alert('Wait!');
        } else {
            alert('Start the new game!');
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    // 1. Add current score to active player global score

    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        roundScore = 0;

        document.getElementById('current-' + activePlayer).textContent = roundScore;


        if (score[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNERR!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            var tempScore = score[activePlayer];
            var tempActivePlayer = activePlayer;
            activePlayer = tempActivePlayer;
            document.getElementById('score-' + activePlayer).textContent = tempScore;
            document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
            document.querySelector('.player-' + 1 + '-panel').classList.remove('active');
            diceDOM.style.display = 'none';
            diceDOM2.style.display = 'none';
            gamePlaying = false;
        } else {
            activeChange();
        }
        // 2. Change the active player
    } else {
        if (diceWait) {
            alert('Wait!');
        } else {
            alert('Start the new game!');
        }
    }
});

/**
 *  New game button clicked, then everything will be reseted.
 */
document.querySelector('.btn-new').addEventListener('click', function() {
    reset();

    /**
     *  Take the winning score from user and show it
     */

    document.querySelector('.winning-score').textContent = winningScore;
    document.querySelector('.winning-score').style.display = 'block';


});


/**
 *  Adds active class to active player
 *  Removes active class from deactive player
 */
function activeChange() {

    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + (activePlayer === 0 ? 1 : 0) + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


/**
 *  Reset and initiliaze everything
 */
function reset() {

    winningScore = prompt("What is the winning score?");
    if (winningScore > 0) {
        gamePlaying = true;
        score = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('.player-' + (activePlayer === 1 ? 0 : 1) + '-panel').classList.remove('active');
        diceDOM.style.display = 'none';
        diceDOM2.style.display = 'none';
    } else {
        gamePlaying = false;
    }
}


/**
 *  If two parameter is same, it is the next player's turn and current score will be zero
 */


function doubleSixControl(dice, preDice) {
    if (dice === 6 && preDice === 6) {
        return true;
    } else {
        return false;
    }
}

/**
 *  To see dice when it is 1. If diceWait is true, player can not click the roll or any of the button, he/she should wait other player turn.
 */
function showAndHideDice(secs, dice, dice2) {
    gamePlaying = false;
    diceWait = true;
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    setTimeout(function() {
            diceDOM.style.display = 'none';
            diceDOM2.style.display = 'none';
            gamePlaying = true;
            diceWait = false;
        },
        secs);

}