export { createCard, onLike, onDelete };
import { likeCard, dislikeCard, deleteCard } from "./api.js";

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(cardData, deleteCardParametr, likeCard, openImg, userId) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardLikes = cardElement.querySelector(".card__likes");
    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardLikes.textContent = cardData.likes.length;
    
    if (userId === cardData.owner._id) {
        buttonDelete.addEventListener("click", () => deleteCardParametr(cardElement, cardData._id));
    } else {
        buttonDelete.remove();
    }

    likeButton.addEventListener("click", () => likeCard(likeButton, cardData._id, cardLikes));

    const isLiked = cardData.likes.some((like) => like._id === userId);
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    }
    cardImage.addEventListener("click", () => openImg(cardData.name, cardData.link));

    return cardElement;
}

// @todo: Функция лайка карточки
function onLike(likeButton, cardId, cardLikes) {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const likeMethod = isLiked ? dislikeCard : likeCard;

    likeMethod(cardId)
        .then((updatedCard) => {
            likeButton.classList.toggle("card__like-button_is-active");
            cardLikes.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.log(err));
}

// @todo: Функция удаления карточки
function onDelete(cardElement, cardId) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.error("Ошибка при удалении карточки:", err);
        });
}