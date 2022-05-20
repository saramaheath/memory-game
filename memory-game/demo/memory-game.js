const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "grey",
  "teal",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "grey",
  "teal",
  "brown",
];

const colors = shuffle(COLORS);
let clickedCards = [];
let clickedCardsID = [];
let clickCount = 0;
let matchedCards = [];
createCards();

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function createCards() {
  const gameBoard = document.getElementById("game");
  for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
    let newCard = document.createElement("div");
    newCard.setAttribute("class", colors[i]);
    newCard.setAttribute("id", i);
    gameBoard.appendChild(newCard);
    newCard.addEventListener("click", flipCard);
    newCard.addEventListener("click", function () {
      clickCount++;
    });
  }
}

function flipCard() {
  let cardID = this.getAttribute("id");
  let cardClass = this.getAttribute("class");
  this.setAttribute("class", `${cardClass}-onclick`);
  console.log(colors[cardID]);
  if (clickedCards.length < 2) {
    clickedCards.push(colors[cardID]);
    console.log(clickedCards);
    clickedCardsID.push(cardID);
  }
  if (clickedCards.length === 2) {
    checkClicks();
    setTimeout(checkClickedCards, 1000);
  }
}

function unFlipCard() {
  let cards = document.querySelectorAll("div");
  if(clickedCards.length === 2){
    cards[clickedCardsID[0]].setAttribute("class", clickedCards[0]);
    cards[clickedCardsID[1]].setAttribute("class", clickedCards[1]);

  }
  console.log("this is the unflip function being called");
}

function checkClicks(){
  let cards = document.querySelectorAll("div");
  if (clickCount > 1) {
    alert("too many clicks! You may only click two cards");
    for (let i = 0; i < colors.length; i++) {
      if (!matchedCards.includes(cards[i].getAttribute("id"))) {
        cards[i].setAttribute("class", colors[i]);
        clickedCards = [];
        clickedCardsID = [];
      }
      console.log(clickCount, 'clicks in check clicks');
      clickCount = 0;
    }
  }
}

function checkClickedCards() {
  let cards = document.querySelectorAll("div");
  if (
    clickedCards[0] !== clickedCards[1] ||
    clickedCardsID[0] === clickedCardsID[1]
  ) {
    console.log(clickedCards, "clicked cards");
    console.log("not a match");
    unFlipCard();
  } else {
    console.log("matched");
    cards[clickedCardsID[0]].removeEventListener("click", flipCard);
    cards[clickedCardsID[1]].removeEventListener("click", flipCard);
    matchedCards.push(clickedCardsID[0], clickedCardsID[1]);
    console.log(matchedCards);
  }
  console.log(clickCount, 'clicks in checkclickedcards');
  clickCount = 0;
  clickedCards = [];
  clickedCardsID = [];
}
