<<<<<<< HEAD
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
=======
// @todo: DOM узлы
const page = document.querySelector(".page");
const pageContent = page.querySelector(".page__content");
const mainContent = pageContent.querySelector(".content");
const placeList = mainContent.querySelector(".places__list");
const allPopup = pageContent.querySelectorAll(".popup");
const newCard = pageContent.querySelector(".popup_type_new-card");
const editCard = pageContent.querySelector(".popup_type_edit");
const buttonClose = pageContent.querySelectorAll(".popup__close");
const buttonSave = pageContent.querySelectorAll(".popup__button");
const buttonDelete = placeList.querySelector(".card__delete-button");
const popupImage = pageContent.querySelector(".popup_type_image");

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Массивы
const save = Array.from(buttonSave);
const close = Array.from(buttonClose);
const popups = Array.from(allPopup);

// @todo: Функция добавления карточки

save[1].addEventListener("click", function () {
    const cardName = newCard.querySelector(".popup__input_type_card-name");
    const cardUrl = newCard.querySelector(".popup__input_type_url");

    addCard(cardName.value, cardUrl.value);

    cardName.value = "";
    cardUrl.value = "";
});

function addCard(title, image) {
    const cardElement = template.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = title;
    cardElement.querySelector(".card__image").src = image;

    placeList.append(cardElement);

    popups[1].style.display = "none";
}

// @todo: Функция создания карточки

const buttonAdd = mainContent.querySelector(".profile__add-button");
buttonAdd.addEventListener("click", function () {
    popups[1].style.display = "flex";
});

// @todo: Функция редактирования профиля
const buttonEdit = document.querySelector(".profile__edit-button");
buttonEdit.addEventListener("click", function () {
    popups[0].style.display = "flex";
});

save[0].addEventListener("click", function () {
    const editName = editCard.querySelector(".popup__input_type_name");
    const editDescription = editCard.querySelector(".popup__input_type_description");

    editProfile(editName.value, editDescription.value);

    popups[0].style.display = "none";
});

function editProfile(name, desctiption) {
    mainContent.querySelector(".profile__title").textContent = name;
    mainContent.querySelector(".profile__description").textContent = desctiption;
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
    const cardElement = template.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = element.name;
    cardElement.querySelector(".card__image").src = element.link;

    placeList.append(cardElement);
});

// @todo: Функция закрытия попапа

close[1].addEventListener("click", function () {
    popups[1].style.display = "none";
});

close[0].addEventListener("click", function () {
    popups[0].style.display = "none";
});

close[2].addEventListener("click", function () {
    popups[2].style.display = "none";
});

// @todo: Функция лайка карточки

placeList.addEventListener("click", function (evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains("card__like-button")) evtTarget.classList.toggle("card__like-button_is-active");
});

// @todo: Функция удаления карточки

placeList.addEventListener("click", function (evt) {
    const targetElem = evt.target;
    const buttonElem = targetElem.closest(".card__delete-button");

    if (buttonElem === null) {
        evt.stopPropagation();
        return;
    }

    const containerElem = targetElem.closest(".card");
    containerElem.remove();
});

// @todo: Функция открытия фотографии

placeList.addEventListener("click", function (evt) {
    const targetElem = evt.target;
    const imageElement = targetElem.closest(".card__image");
    const nextSibling = imageElement.nextElementSibling;
    const nextSibling1 = nextSibling.nextElementSibling;
    text = nextSibling1.querySelector(".card__title").textContent;
    item = imageElement.src;

    popupImage.querySelector(".popup__image").src = item;
    popupImage.querySelector(".popup__caption").textContent = text;
    popups[2].style.display = "flex";
});

>>>>>>> 828dd45383645e2f130833033b2eb6310ee7475e
