import "../styles/index.css";
import { createCard, onLike, onDelete} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getUserMe, getCards, sendUserMe, sendCard, newAvatar } from "./api.js";

// @todo: DOM узлы
const formEdit = document.forms.edit_profile;
const formNew = document.forms.new_place;
const formEditAvatar = document.forms.edit_avatar;

const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");

const profileImage = mainContent.querySelector(".profile__image_avatar  ");
const profileTitle = mainContent.querySelector(".profile__title");
const profileJob = mainContent.querySelector(".profile__description");
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

const popups = document.querySelectorAll(".popup");
const popupEdit = pageContent.querySelector(".popup_type_edit");
const popupNew = pageContent.querySelector(".popup_type_new-card");
const popupEditAvatar = pageContent.querySelector(".popup_type_edit_avatar");

const avatarOpenButton = mainContent.querySelector(".profile__image");
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

// @todo: Функция открытия изображения
function openImage(name, link) {
    const popupImage = document.querySelector(".popup_type_image");

    popupImage.querySelector(".popup__image").src = link;
    popupImage.querySelector(".popup__caption").textContent = name;

    openPopup(popupImage);
}

// @todo: Функция редактирования профиля формы
function editFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobValue = jobInput.value;

    const buttonPopup = formEdit.elements.edit_button;
    buttonPopup.textContent = "Сохранение...";

    sendUserMe(nameInputValue, jobValue)
        .then((user) => {
            profileJob.textContent = user.about;
            profileTitle.textContent = user.name;

            closePopup(popupEdit);
        })

        .catch((err) => {
            console.error("Ошибка при обновлении профиля:", err);
        })

        .finally(() => {
            buttonPopup.textContent = "Сохранить";
        });
}

// @todo: Функция добавления карточки формы
function newFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = formNew.elements.place_name.value;
    const jobInput = formNew.elements.link.value;

    const buttonPopup = formNew.elements.new_button;
    buttonPopup.textContent = "Сохранение...";

    sendCard(nameInput, jobInput)
        .then((item) => {
            const idUser = item.owner._id;
            const cardElement = createCard(item, onDelete, onLike, openImage, idUser);
            placeList.prepend(cardElement);

            closePopup(popupNew);

            formNew.reset();
        })

        .catch((err) => {
            console.error("Ошибка при добавлении карточки:", err);
        })
        .finally(() => {
            buttonPopup.textContent = "Сохранить";
        });
}

// @todo: Функция обновления аватарки
function updateAvatar(evt) {
    evt.preventDefault();

    const avatarUrlInput = formEditAvatar.elements.link;

    const avatarUrl = avatarUrlInput.value;

    if (avatarUrl) {
        const submitButton = formEditAvatar.elements.edit_avatar_button;
        submitButton.textContent = "Сохранение...";

        newAvatar(avatarUrl)
            .then((userData) => {
                profileImage.src = userData.avatar;
                closePopup(popupEditAvatar);
                formEditAvatar.reset();
            })
            .catch((err) => {
                console.error("Ошибка при обновлении аватара:", err);
            })
            .finally(() => {
                submitButton.textContent = "Сохранить";
            });
    }
}

// @todo: Кнопка сабмита обновления аватарки
formEditAvatar.addEventListener("submit", updateAvatar);

// @todo: Кнопка сабмита редактирования профиля
formEdit.addEventListener("submit", editFormSubmit);

// @todo: Кнопка сабмита сохранения новой карточки
formNew.addEventListener("submit", newFormSubmit);

// @todo: Кнопка открытия попапа редактирования профиля
editButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(formEdit, settingValidtion);
    openPopup(popupEdit);
});

// @todo: Кнопка открытия попапа добавления новой карточки
addButton.addEventListener("click", () => {
    clearValidation(formNew, settingValidtion);
    openPopup(popupNew)
});

// @todo: Кнопка открытия попапа редактирования аватарки
avatarOpenButton.addEventListener("click", () => {
    clearValidation(formEditAvatar, settingValidtion);
    openPopup(popupEditAvatar)
});

// @todo: Валидация форм
const settingValidtion = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(settingValidtion);

// @todo: Получение данных карточек и профиля с сервера
Promise.all([getUserMe(), getCards()])

    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileJob.textContent = user.about;
        profileImage.src = user.avatar;

        const idUser = user._id;            

        // @todo: Вывести карточки на страницу
        cards.forEach(function (item) {
            const cardElement = createCard(item, onDelete, onLike, openImage, idUser);
            placeList.append(cardElement);
        });
    })
    .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
    });


