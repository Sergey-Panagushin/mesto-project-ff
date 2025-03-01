import "../styles/index.css";
import { initialCards, createCard, onDelete, onLike} from "./cards.js";
import { openModal, closeModal, popupEdit, popupNew } from "./modal.js";

export { profileTitle, profileJob, nameInput, jobInput };

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

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    const cardElement = createCard(item["name"], item["link"], onDelete, onLike);
    placeList.append(cardElement);
});

// @todo: Кнопка открытия попапов
pageContent.addEventListener("click", openModal);

// @todo: Кнопка закрытия попапов
pageContent.addEventListener("click", closeModal);

// @todo: Функция редактирования профиля формы

function editFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupEdit.classList.remove("popup_is-opened");
}

// @todo: Функция добавления карточки формы
function newFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formNew.elements.place_name.value;
  const jobInput = formNew.elements.link.value;

  const cardElement = createCard(nameInput, jobInput, onDelete, onLike);

  placeList.prepend(cardElement);
  
  popupNew.classList.remove("popup_is-opened");
  formNew.reset();
}

// @todo: Кнопка редактирования профиля
formEdit.addEventListener("submit", editFormSubmit);

// @todo: Кнопка сохранения новой карточки
formNew.addEventListener("submit", newFormSubmit);
