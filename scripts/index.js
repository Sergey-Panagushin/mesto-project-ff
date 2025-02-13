// @todo: DOM узлы
const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(card, deleteCard) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = card.name;

    const buttonDelete = cardElement.querySelector(".card__delete-button");

    deleteCard = cardElement;
    buttonDelete.addEventListener("click", () => delButton(deleteCard));
    return cardElement;
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item){
    const add = createCard(item);
    placeList.append(add);
});

// @todo: Функция удаления карточки
function delButton(deleteCard) {
    deleteCard.remove();
}
 