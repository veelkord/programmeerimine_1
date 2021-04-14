'use strict';

//Selecting elements
// diagrams.net Seal saab "block" tüüpi graafikuid teha tasuta.
// esimene moodus id elemnti selekteeerida on nii
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// see peaks olema kiirem aga sain aru, et kasuta mis endale sobivam.
const score1El = document.getElementById('score--1');
// skoorid htmlist
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// Täring
const diceEl = document.querySelector('.dice');
// Nupud
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// gradiendi muutmiseks
const body = document.querySelector('body');
// deklareerime muutujad
let scores, currentScore, activePlayer, playing, rot;

// see on mängu resetimis funktsioon
const init = function () {
  scores = [100, 100];
  currentScore = 0;
  activePlayer = 0;
  rot = 0;
  playing = true;

  score0El.textContent = 100;
  score1El.textContent = 100;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.remove('dice--transform');
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//kutsume funktsiooni välja
init();

//  kui mängija veeretab ühe siis läheb "current" skoor nulli.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle meetod vaatab kas klass on olemas, kui pole siis lisab ja kui on siis võtab ära. Lihtne nagu haugi püük. :)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  body.classList.toggle('gradient');
};

score0El.textContent = 100;
score1El.textContent = 100;
// teeme täringu nähtamatuks
diceEl.classList.add('hidden');

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  diceEl.classList.add('dice--transform');
  if (playing) {
    // 1. Generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    // et iga klikk keerutaks
    rot += 360;
    diceEl.style = `transform: rotate(${rot}deg)`;
    // võtame htmlist image src
    diceEl.src = `dice-${diceRoll}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] -= currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] <= 0) {
      // Finish the game
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      playing = false;
      diceEl.classList.add('hidden');
      console.log('töötab', activePlayer);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
