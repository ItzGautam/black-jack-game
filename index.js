let player1Turn = true;

let player1Cards = [];
let player2Cards = [];

let player1Sum = 0;
let player2Sum = 0;

let count1 = 0;
let count2 = 0;

const cards = [
    "A", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K"
];

const player1Div = document.getElementById("player1-cards");
const player2Div = document.getElementById("player2-cards");

const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");
const nextGameButton = document.getElementById("next-game");

function randomCard() {

    let index = Math.floor(Math.random() * cards.length);

    return cards[index];
}

function hit() {

    let card = randomCard();

    if (player1Turn) {

        player1Cards.push(card);

        let newCard = document.createElement("span");

        newCard.innerText = card;

        player1Div.appendChild(newCard);

        if (card == "K" || card == "Q" || card == "J") {

            player1Sum += 10;

        }
        else if (card == "A") {

            player1Sum += 11;
            count1++;

        }
        else {

            player1Sum += Number(card);

        }

        [player1Sum, count1] = checkWinner(player1Sum, count1);

        document.getElementById("player1-sum").innerText =
            "Sum: " + player1Sum;

        if (player1Sum == 21) {

            document.getElementById("winner").innerText =
                " WooHoo!! Player 1 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }

        else if (player1Sum > 21) {

            document.getElementById("winner").innerText =
                " WooHoo!! Player 2 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }

    }

    else {

        player2Cards.push(card);

        let newCard = document.createElement("span");

        newCard.innerText = card;

        player2Div.appendChild(newCard);

        if (card == "K" || card == "Q" || card == "J") {

            player2Sum += 10;

        }
        else if (card == "A") {

            player2Sum += 11;
            count2++;

        }
        else {

            player2Sum += Number(card);

        }

        [player2Sum, count2] = checkWinner(player2Sum, count2);

        document.getElementById("player2-sum").innerText =
            "Sum: " + player2Sum;

        if (player2Sum == 21) {

            document.getElementById("winner").innerText =
                "Player 2 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }

        else if (player2Sum > 21) {

            document.getElementById("winner").innerText =
                "Player 1 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        } else if (player2Sum > player1Sum) {

            document.getElementById("winner").innerText =
                "Player 2 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;
        }
    }
}

function stand() {

    player1Turn = !player1Turn;

    if (!player1Turn && player2Sum == 0) {
        return;
    }

    if (player1Turn == true) {

        if (player1Sum > 21) {

            document.getElementById("winner").innerText =
                "Player 2 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }
        else if (player2Sum > 21) {

            document.getElementById("winner").innerText =
                "Player 1 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }
        else if (player1Sum > player2Sum) {

            document.getElementById("winner").innerText =
                "Player 1 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }
        else if (player2Sum > player1Sum) {

            document.getElementById("winner").innerText =
                "Player 2 Wins!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }
        else if (player1Sum == player2Sum) {

            document.getElementById("winner").innerText =
                "Draw!";

            hitButton.disabled = true;
            standButton.disabled = true;

        }
    }
}


function nextGame() {

    player1Turn = true;

    player1Cards = [];
    player2Cards = [];

    player1Sum = 0;
    player2Sum = 0;

    count1 = 0;
    count2 = 0;

    player1Div.innerHTML = "";
    player2Div.innerHTML = "";

    document.getElementById("player1-sum").innerText = "Sum: 0";
    document.getElementById("player2-sum").innerText = "Sum: 0";

    document.getElementById("winner").innerText = "";

    hitButton.disabled = false;
    standButton.disabled = false;
}


function checkWinner(sum, count) {

    while (sum > 21 && count > 0) {

        sum -= 10;
        count--;

    }

    return [sum, count];
}


hitButton.addEventListener("click", hit);

standButton.addEventListener("click", stand);

nextGameButton.addEventListener("click", nextGame);