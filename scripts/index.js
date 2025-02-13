// @todo: DOM узлы
const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(card) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = card.name;

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const buttonDelete = cardElement.querySelector(".card__delete-button");

    buttonDelete.addEventListener("click", () => delButton(cardElement));
    return cardElement;
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    const add = createCard(item);
    placeList.append(add);
});

// @todo: Функция удаления карточки
function delButton(deleteCard) {
    deleteCard.remove();
}
