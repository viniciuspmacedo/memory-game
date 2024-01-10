const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const gameOverLayer = document.querySelector("#gameover");
const restartButton = document.querySelector("#restart");

restartButton.addEventListener('click', restart)

startGame();

function startGame() {

    initializeCards();

}

function initializeCards() {

    game.createCardsFromTechs();

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add("card");
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);

        gameBoard.appendChild(cardElement)
    }

    )
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
    let cardFaceElement = document.createElement("div");
    cardFaceElement.classList.add(face);

    if (face === FRONT) {

        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardFaceElement.appendChild(iconElement);

    } else {

        cardFaceElement.innerHTML = "&lt;/&gt;";

    }

    element.appendChild(cardFaceElement);
}

function flipCard() {
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    gameOverLayer.style.display = "flex";
                }
            } else {
                setTimeout(()=> {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove("flip");
                secondCardView.classList.remove("flip");

                game.unflipCards();
            }, 1000);
        }
    }
    }

}

function restart(){
    startGame();
    gameOverLayer.style.display = "none";
}
