export { createCard, onLike };
import { likeCard, dislikeCard } from "./api.js";

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция добавления карточки
function createCard(name, link, likesList, idCard, deleteCardParametr, likeCard, openImg, userId) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardLikes = cardElement.querySelector(".card__likes");

    cardElement.querySelector(".card__title").textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    cardLikes.textContent = likesList.length;

    if (idCard._id === userId) {
        buttonDelete.addEventListener("click", () => deleteCardParametr(cardElement, idCard._id));
    } else {
        buttonDelete.remove();
    }

    likeButton.addEventListener("click", () => likeCard(likeButton, idCard._id, cardLikes));

    const isLiked = likesList.some((like) => like._id === userId);
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    }
    cardImage.addEventListener("click", () => openImg(name, link));

    return cardElement;
}

// @todo: Функция лайка карточки
function onLike(likeButton, cardId, cardLikes) {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const likeMethod = isLiked ? dislikeCard : likeCard;

    likeMethod(cardId)
        .then((updatedCard) => {
            likeButton.classList.toggle("card__like-button_is-active");
            cardLikes.textContent = updatedCard.likesList.length;
        })
        .catch((err) => console.log(err));
}
