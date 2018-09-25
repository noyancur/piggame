/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying;

var diceDOM = document.querySelector('.dice');

// Initiliaze the scores
reset();


// Change the active player style (adds active class to active player)
activeChange();

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the number score IF the rolled number was NOT a 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

            activeChange();
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


        if (score[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNERR!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            var tempScore = score[activePlayer];
            var tempActivePlayer = activePlayer;
            activePlayer = tempActivePlayer;
            document.getElementById('score-' + activePlayer).textContent = tempScore;
            document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
            document.querySelector('.player-' + 1 + '-panel').classList.remove('active');
            diceDOM.style.display = 'none';
            gamePlaying = false;
        } else {
            activeChange();
        }
        // 2. Change the active player
    }
});

/**
 *  New game button clicked, then everything will be reseted.
 */
document.querySelector('.btn-new').addEventListener('click', reset);


/**
 *  Adds active class to active player
 *  Removes active class from deactive player
 */
function activeChange() {

    diceDOM.style.display = 'none';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + (activePlayer === 0 ? 1 : 0) + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


/**
 *  Reset and initiliaze everything
 */
function reset() {
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
    diceDOM.style.display = 'none';
}