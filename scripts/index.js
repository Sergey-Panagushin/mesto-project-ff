// @todo: DOM узлы
const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(addCard, deleteCard) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = addCard.name;
    cardElement.querySelector(".card__image").src = addCard.link;

    placeList.append(cardElement);

    const buttonDelete = cardElement.querySelector(".card__delete-button");

    deleteCard = buttonDelete.closest(".card");
    buttonDelete.addEventListener("click", () => delButton(deleteCard));
}

// @todo: Вывести карточки на страницу

initialCards.forEach(createCard);

// @todo: Функция удаления карточки
function delButton(deleteCard) {
    deleteCard.remove();
}
