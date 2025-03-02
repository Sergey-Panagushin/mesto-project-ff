import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard, onDelete, onLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

// @todo: DOM узлы
const formEdit = document.forms.edit_profile;
const formNew = document.forms.new_place;

const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");

const profileTitle = mainContent.querySelector(".profile__title");
const profileJob = mainContent.querySelector(".profile__description");
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

const popups = document.querySelectorAll(".popup");
const popupEdit = pageContent.querySelector(".popup_type_edit");
const popupNew = pageContent.querySelector(".popup_type_new-card");

const editButton = mainContent.querySelector(".profile__edit-button");
const addButton = mainContent.querySelector(".profile__add-button");

// @todo: Закрытие попапов по крестику
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
        closePopup(popup);
    });
});

// @todo: Закрытие попапов по оверлею
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);
        }
    });
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    const cardElement = createCard(item["name"], item["link"], onDelete, onLike, openImage);
    placeList.append(cardElement);
});

// @todo: Функция открытия изображения
function openImage(name, link) {
    const popupImage = document.querySelector(".popup_type_image");

    popupImage.querySelector(".popup__image").src = link;
    popupImage.querySelector(".popup__caption").textContent = name;

    openPopup(popupImage);
}

// @todo: Получить данные формы редактирования
function dataProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// @todo: Функция редактирования профиля формы
function editFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

// @todo: Функция добавления карточки формы
function newFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = formNew.elements.place_name.value;
    const jobInput = formNew.elements.link.value;

    const cardElement = createCard(nameInput, jobInput, onDelete, onLike, openImage);

    placeList.prepend(cardElement);

    closePopup(popupNew);
    formNew.reset();
}

// @todo: Кнопка редактирования профиля
formEdit.addEventListener("submit", editFormSubmit);

// @todo: Кнопка сохранения новой карточки
formNew.addEventListener("submit", newFormSubmit);

// @todo: Кнопка редактирования профиля
editButton.addEventListener("click", () => openPopup(popupEdit), dataProfile());

// @todo: Кнопка добавления новой карточки
addButton.addEventListener("click", () => openPopup(popupNew));
