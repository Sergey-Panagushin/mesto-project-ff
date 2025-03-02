export {createCard, onDelete, onLike};

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(name, link, deleteCard, likeCard, openImg) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardElement.querySelector(".card__title").textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    buttonDelete.addEventListener("click", () => deleteCard(cardElement));

    likeButton.addEventListener("click", () => likeCard(likeButton));

    cardImage.addEventListener("click", () => openImg(name, link));

    return cardElement;
}

// @todo: Функция лайка карточки
function onLike (likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function onDelete(deleteCard) {
    deleteCard.remove();
}