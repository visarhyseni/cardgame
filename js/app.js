let player = [[], []];
let deck = [];
let shuffledDeck = [];
let cardUnder;
let field = [];
let currentPlayer = 1;


// All Cards
// class Deck {
//   constructor() {
//     this.deck = [];
//     const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
//     const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
//     const colors = ['Red', 'Blue'];
//     for (let color of colors) {
//       for (let suit in suits) {
//         for (let value in values) {
//           this.deck.push(`${color} ${values[value]} of ${suits[suit]}`);
//         }
//       }
//       this.deck.push(`${color} Color Joker`);
//     this.deck.push(`${color} Non Color Joker`);
//     }
//   }
// }


class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Hearts'];
        const values = ['Ace', 2];
        const colors = ['Red', 'Blue'];
        for (let color of colors) {
            for (let suit in suits) {
                for (let value in values) {
                    this.deck.push(`${color} ${values[value]} of ${suits[suit]}`);
                }
            }
            this.deck.push(`${color} Color Joker`);
            this.deck.push(`${color} Non Color Joker`);
        }
    }
}

deck = new Deck();
console.log('Deck:');
console.log(deck.deck);
// end of All Cards

// Shufle Cards Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Used like so

console.log('Shuffled deck:');
shuffledDeck = shuffle(deck.deck);
// end of Shufle Cards

// Cut deck and set Card under
let firstPart;
let secondPart;

function cutDeck() {
    let cutDeck = Math.floor(Math.random() * (shuffledDeck.length - 1) + 1);
    console.log('cut deck: ' + cutDeck);

    firstPart = shuffledDeck.slice(0, cutDeck);
    secondPart = shuffledDeck.slice(cutDeck, shuffledDeck.length);
    console.log(firstPart);
    console.log(secondPart);
}

cutDeck();

function setCardUnder() {

    while (firstPart[firstPart.length - 1].includes('Joker')) {
        player[currentPlayer].push(firstPart[firstPart.length - 1]);
        firstPart.splice(firstPart.length - 1, 1);
        if (firstPart.length < 1) {
            shuffledDeck = secondPart.concat(firstPart);
            cutDeck();
        }
    }

    cardUnder = firstPart[firstPart.length - 1];
    firstPart.splice(firstPart.length - 1, 1);

    shuffledDeck = secondPart.concat(firstPart);

    console.log(cardUnder);
    console.log(shuffledDeck);
}

function nextPlayer(current, max){
    if( current >= max ){ currentPlayer = max - max; }
    else { currentPlayer++; }
    return currentPlayer;
}


setCardUnder();

console.log('number of players: ' + player.length);



console.log(currentPlayer);
console.log(nextPlayer(currentPlayer, player.length - 1));
console.log(nextPlayer(currentPlayer, player.length - 1));
console.log(nextPlayer(currentPlayer, player.length - 1));
console.log(nextPlayer(currentPlayer, player.length - 1));
console.log(nextPlayer(currentPlayer, player.length - 1));
console.log(nextPlayer(currentPlayer, player.length - 1));

function serveCards(deck) {

    let counter = 0;

    for (let i=0; i<10; i++) {
        if( player[currentPlayer].length - 1 > counter ) continue;
        // let cards = [shuffledDeck[counter], shuffledDeck[counter + 1]];
        // player[currentPlayer].push(...cards);
        player[currentPlayer].push(counter, counter + 1);
        counter+=2;
        nextPlayer(currentPlayer, player.length - 1);
    }
}

serveCards(shuffledDeck);

console.log(player);