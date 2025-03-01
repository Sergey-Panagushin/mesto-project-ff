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

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  
  buttonDelete.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
function onDelete(deleteCard) {
  deleteCard.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const cardElement = createCard(item, onDelete);
  placeList.append(cardElement);
});