export { openModal, closeModal, popupNew, popupEdit };

import { profileTitle, profileJob, nameInput, jobInput } from "./index.js";

const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

function openModal(evt) {
    const targetElem = evt.target;

    // @todo: Открытие попапа редактирования
    if (targetElem.classList.contains("profile__edit-button")) {
        popupEdit.classList.add("popup_is-opened");
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileJob.textContent;
    }

    // @todo: Открытие попапа добавления карточки
    if (targetElem.classList.contains("profile__add-button")) {
        popupNew.classList.add("popup_is-opened");
    }

    // @todo: Открытие попапа изображения

    if (targetElem.classList.contains("card__image")) {
        const imageElement = targetElem;

        const item = imageElement.src;
        const text = imageElement.alt;

        popupImage.querySelector(".popup__image").src = item;
        popupImage.querySelector(".popup__caption").textContent = text;

        popupImage.classList.add("popup_is-opened");
    }
}

// @todo: Закрытие попапов
function closeModal(evt) {
    const targetElem = evt.target;
    if (targetElem.classList.contains("popup__close")) {
        const closeElement = targetElem.closest(".popup");

        closeElement.classList.remove("popup_is-opened");
    }

    if (targetElem.classList.contains("popup")) {
        targetElem.classList.remove("popup_is-opened");
    }

    function closeEsc(evt) {
        if (evt.key === "Escape") {
            popupEdit.classList.remove("popup_is-opened");
            popupNew.classList.remove("popup_is-opened");
            popupImage.classList.remove("popup_is-opened");
        }
        document.removeEventListener("keydown", closeEsc);
    }
    document.addEventListener("keydown", closeEsc);

    
}