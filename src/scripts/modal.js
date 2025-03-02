export { openPopup, closePopup };

// @todo: Функция открытия попапов
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
};

// @todo: Функция закрытия попапов
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
};

// @todo: Функция закрытия попапов по кнопке
function closePopupEsc(event) {
    if(event.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    }
}
