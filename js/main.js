//Making the cards
let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//Going to assign players with properties
let currentPlayer = 0;

//Starting the game
function startGame() {
    document.getElementById("status").style.display="none";
    currentPlayer = 0;
    generateDeck();
    generatePlayers();
    playersUI();
    dealHands();
}

//Generates the deck and shuffles the cards
function generateDeck() {
    //Making a deck to hold the suits and values combined
    deck = [];
    for (let i = 0 ; i < values.length; i++) {
        for(let x = 0; x < suits.length; x++) {
            let count = parseInt(values[i]);
            if (values[i] === "J" || values[i] === "Q" || values[i] === "K")
                count = 10;
            if (values[i] === "A")
                count = 11;
            let card = { Value: values[i], Suit: suits[x], Count: count };
            deck.push(card);
        }
    }
    //Shuffling; taking the orginal position to swap it with a random position
    let shuffle = deck.length;
    while (shuffle) {
            let j = Math.floor(Math.random() * shuffle--);
            [deck[shuffle], deck[j]] = [deck[j], deck[shuffle]];
    }
}

//Making my players 
function generatePlayers() {
    players = [];
    for(let i = 1; i <= 2; i++) {
        let hand = [];
        let player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

function playersUI() {
    document.getElementById('players').innerHTML = '';
    for(let i = 0; i < players.length; i++) {
        let divPlayer = document.createElement('div');
        let divPlayerid = document.createElement('div');
        let divHand = document.createElement('div');
        let divPoints = document.createElement('div');

        divPlayer.className = 'player';
        divPoints.className = 'points';
        divPoints.id = 'points ' + i;
        divPlayer.id = 'player ' + i;
        divHand.id = 'hand ' + i;
        divPlayerid.innerHTML = 'Player ' + players[i].ID;

        divPlayer.appendChild(divPlayerid);
        divPlayer.appendChild(divHand);
        divPlayer.appendChild(divPoints);
        document.getElementById('players').appendChild(divPlayer);
    }
}

function dealHands() {
    for(let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
}

function renderCard(card, player) {
    let hand = document.getElementById('hand ' + player);
        hand.appendChild(cardUI(card));
}

function cardUI(card) {
    let cardSuit = document.createElement('div');
    let icon = '';
    if (card.Suit === 'Hearts')
        icon='&hearts;';
    else if (card.Suit === 'Spades')
        icon = '&spades;';
    else if (card.Suit === 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';
            
        cardSuit.className = 'card';
        cardSuit.innerHTML = card.Value + '<br/>' + icon;
    return cardSuit;
}

function getPoints(player) {
    let points = 0;
    for(let i = 0; i < players[player].Hand.length; i++) {
        if (players[currentPlayer].Hand[i].Value === "A"){
            players[currentPlayer].Points = players[currentPlayer].Points -10
        } 
            points += players[player].Hand[i].Count;
        }
    players[player].Points = points;
    return points;
}

function updatePoints() {
    for (let i = 0 ; i < players.length; i++) {
        getPoints(i);
            document.getElementById('points ' + i).innerHTML = players[i].Points;
    }
}

function Hit(){
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
}

function Stay() {
    if (currentPlayer != players.length-1) {
        document.getElementById('player ' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player ' + currentPlayer).classList.add('active');
    } else {
        end();
    }
}

function end() {
    let winner = -1;
    let score = 0;
    for(let i = 0; i < 2; i++) {
        if (players[i].Points > score && players[i].Points > 22) {
            for (let i = 0; i < players[currentPlayer].Hand.length; i++) {
                if (players[currentPlayer].Hand[i].Value === "A"){
                    players[currentPlayer].Points = players[currentPlayer].Points -10
                    return points;
                }
            }
            winner = i;
        }
            score = players[i].Points;
        }
            document.getElementById("status").style.display = "inline-block";
 }

//Checking if value is over 21
function check() {
    if (players[currentPlayer].Points > 21) {
        console.log(players[currentPlayer].Hand);
        console.log(players[currentPlayer].Hand[0].Value);
        console.log("Points:" + players[currentPlayer].Points)
        for (let i = 0; i < players[currentPlayer].Hand.length; i++) {
            if (players[currentPlayer].Hand[i].Value === "A"){
                players[currentPlayer].Points = players[currentPlayer].Points -10
            }
        }
        document.getElementById('status').innerHTML = players[currentPlayer].Name + ': LOSE';
        document.getElementById('status').style.display = "inline-block";
    }
}

window.addEventListener('load', function(){
    generateDeck();
    generatePlayers();
});