export { initialCards, createCard, onDelete, onLike };

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(name, link, deleteCard, likeCard) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardElement.querySelector(".card__title").textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    buttonDelete.addEventListener("click", () => deleteCard(cardElement));

    likeButton.addEventListener("click", () => likeCard(likeButton));

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



const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];
