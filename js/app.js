let player = [[], []];
let deck = [];
let shuffledDeck = [];
let cardUnder;
let field = [];
let currentPlayer = 1;


// All Cards
class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        const colors = ['Red', 'Blue'];
        for (let color of colors) {
            for (let suit in suits) {
                for (let value in values) {
                    this.deck.push({
                        color: color,
                        values: values[value],
                        suits: suits[suit]
                    });
                }
            }
            this.deck.push({
                color: color,
                value: 'Joker',
                suits: 'Color'
            });
            this.deck.push({
                color: color,
                value: 'Joker',
                suits: 'Non Color'
            });
        }
    }
}

// class Deck {
//     constructor() {
//         this.deck = [];
//         const suits = ['Hearts'];
//         const values = ['Ace', 2];
//         const colors = ['Red', 'Blue'];
//         for (let color of colors) {
//             for (let suit in suits) {
//                 for (let value in values) {
//                     this.deck.push(`${color} ${values[value]} of ${suits[suit]}`);
//                 }
//             }
//             this.deck.push(`${color} Color Joker`);
//             this.deck.push(`${color} Non Color Joker`);
//         }
//     }
// }

deck = new Deck();
// console.log('Deck:');
// console.log(deck.deck);
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

// console.log('Shuffled deck:');
shuffledDeck = shuffle(deck.deck);
// end of Shufle Cards
console.log(shuffledDeck);

// Cut deck and set Card under
let firstPart;
let secondPart;

function cutDeck() {
    let cutDeck = Math.floor(Math.random() * (shuffledDeck.length - 1) + 1);
    // console.log('cut deck: ' + cutDeck);

    firstPart = shuffledDeck.slice(0, cutDeck);
    secondPart = shuffledDeck.slice(cutDeck, shuffledDeck.length);
    // console.log(firstPart);
    // console.log(secondPart);
}

cutDeck();

function setCardUnder() {

    while (firstPart[firstPart.length - 1].value === 'Joker') {
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

    // console.log(cardUnder);
    // console.log(shuffledDeck);
}

setCardUnder();

// Change current player
function nextPlayer(current, max) {
    if (current >= max - 1) {
        currentPlayer = max - max;
    }
    else {
        currentPlayer++;
    }
    return currentPlayer;
}

// console.log(currentPlayer);
// console.log(nextPlayer(currentPlayer, player.length));
// console.log(nextPlayer(currentPlayer, player.length));


// Push cards from deck
function pushCards(num, arr) {
    let c = [];
    for (let i = 0; i < num; i++) {
        c.push(arr[i]);
    }
    arr.splice(0, num);
    return c;
}

// Serve cards to players
function serveCards(deck) {
    let start = true;
    switch (player[currentPlayer].length) {
        case 1:
            player[currentPlayer] = player[currentPlayer].concat(pushCards(1, deck));
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(2, deck));
            nextPlayer(currentPlayer, player.length);
            start = false;
            break;
        case 2:
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(2, deck));
            nextPlayer(currentPlayer, player.length);
            start = false;
            break;
        case 3:
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(4, deck));
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(1, deck));
            nextPlayer(currentPlayer, player.length);
            start = false;
            break;
        case 4:
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(4, deck));
            nextPlayer(currentPlayer, player.length);
            start = false;
            break;
        default:
            start = false;
    }

    if (!start) {
        while (player[currentPlayer].length < 10) {
            player[currentPlayer] = player[currentPlayer].concat(pushCards(2, deck));
            nextPlayer(currentPlayer, player.length);
            player[currentPlayer] = player[currentPlayer].concat(pushCards(2, deck));
            nextPlayer(currentPlayer, player.length);
        }
    }
}

serveCards(shuffledDeck);

// Draw Card from field or deck
function drawCard(from) {
    player[currentPlayer].push(from[0]);
    from.splice(0, 1);
}

// Throw Card
function throwCard(index) {
    field.push(player[currentPlayer][index]);
    player[currentPlayer].splice(index, 1);
}


// console.log(player[0]);

// var a = [1, 2, 3, 4, 5, 5, 5, 9, 10, 11];
var a = [{color: "Blue", values: 1, suits: "Hearts"},
{color: "Red", values: 2, suits: "Hearts"},
{color: "Blue", values: 3, suits: "Hearts"},
{color: "Red", values: 5, suits: "Hearts"},
{color: "Red", values: 6, suits: "Hearts"},
{color: "Blue", values: 7, suits: "Hearts"},
{color: "Red", values: 2, suits: "Hearts"},
{color: "Red", values: 8, suits: "Hearts"},
{color: "Red", values: 9, suits: "Hearts"},
{color: "Red", values: 10, suits: "Hearts"},
{color: "Red", values: 11, suits: "Hearts"}];

console.log(a);


function checkForWin(a) {
    let counter = 0;
    let counter1 = 0;
    for(let i=1; i<a.length; i++) {
        if(a[i].suits === a[i-1].suits) {
            counter++;
        }
        if (a[i].values === a[i-1].values + 1){
            counter1++;
        }
    }

    if (counter === 10 && counter1 === 10) console.log('fitus rresht ngjyr');
    else if (counter === 10) console.log('fitus ngjyr');
    else if (counter1 === 10) console.log('fitus rresht');
    else { console.log(' nuk ke fitu');}
}

function consecutiveCards(a) {
    const ret = [];
    if (!a.length) return ret;
    let ixf = 0;
    for (let ixc = 1; ixc < a.length; ixc += 1) {
        if (a[ixc].values !== a[ixc-1].values + 1) {
            ret.push(a.slice(ixf, ixc));
            ixf = ixc;
        }
    }
    ret.push(a.slice(ixf, a.length));
    return ret;
}
// function consecutiveCards(a) {
//     let tricks = 0;
//     let counter = 0;
//     let cards = 0;
//     for(let i=1; i<a.length; i++) {
//         if(a[i].suits === a[i-1].suits) {
//             if (a[i].values === a[i-1].values + 1){
//                 counter++;
//             }
//             else {
//                 counter++;
//                 if(counter >= 3) {
//                     tricks++;
//                     cards += counter;
//                     counter = 0;
//                     debugger;
//                 }
//             }
//         }
//     }
//     console.log({cards: cards, tricks: tricks});
// }

console.log(consecutiveCards(a));
checkForWin(a);