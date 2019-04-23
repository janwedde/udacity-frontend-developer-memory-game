# Memory Game Project

## Table of Contents

* [General](#rules)
* [Rules](#rules)
* [Ressources](#ressources)

## General

Memory Game is a browser-based card matching game.
The game is part of the Nanodegree program "Front-End Web Developer" of Udacity.

## Rules

The game consists of 16 cards with 8 different motives. 
The aim of the game is to reveal all 8 pairs of cards.

The game proceeds as follows: 

- The player turns over a first card by clicking on it.
- The player has to flip over a second card with the same motive.
- If the two face-up cards match, they remain open.
- If the two cards do not match, they will automatically turn around after a short time.

The star rating 

- The game has a star rating. At the start three stars are displayed. 
- Each uncovering of 2 cards is counted as 1 move.
- After 8-13 moves, the number of stars is reduced to 2.
- After 14 or more moves, the number of stars is reduced to 1.

The game continues until the player has uncovered all 8 pairs. The player can restart the game at any time by pressing the reset button. The reset also resets the game time that starts when the player clicks on a card for the first time. When the player has uncovered all card pairs, a pop-up informs him about his star ranking and required game time.

## Ressources

Shuffle function from <a href="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976">stackoverflow</a>.
