export { getUserMe, getCards, sendUserMe, sendCard, deleteCard, likeCard, dislikeCard, newAvatar };

// @todo: Ключи сервера
const dataKeys = {
    Url: "https://nomoreparties.co/v1/wff-cohort-33",
    headers: {
        authorization: "6b856634-e357-421d-8193-f74ecd64828b",
        "Content-type": "application/json",
    },
};

// @todo: Функция обработки
function getData(data) {
    if (!data.ok) {
        return Promise.reject(`Ошибка: ${data.status}`);
    }
    return data.json();
}

// @todo: API получить личные данные с сервера
function getUserMe() {
    return fetch(`${dataKeys.Url}/users/me`, {
        method: "GET",
        headers: dataKeys.headers,
    }).then(getData);
}

// @todo: API получить карточки с сервера
function getCards() {
    return fetch(`${dataKeys.Url}/cards`, {
        method: "GET",
        headers: dataKeys.headers,
    }).then(getData);
}

// @todo: API отправить личные данные на сервер
function sendUserMe(name, about) {
    return fetch(`${dataKeys.Url}/users/me`, {
        method: "PATCH",
        headers: dataKeys.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    }).then(getData);
}

// @todo: API отправить карточку на сервер
function sendCard(name, link) {
    return fetch(`${dataKeys.Url}/cards`, {
        method: "POST",
        headers: dataKeys.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then(getData);
}

// @todo: API удалить карточку
function deleteCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/${idCard}`, {
        method: "DELETE",
        headers: dataKeys.headers,
    }).then(getData);
}

// @todo: API добавить лайк карточки
function likeCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/likes/${idCard}`, {
        method: "PUT",
        headers: dataKeys.headers,
    }).then(getData);
}

// @todo: API убрать лайк карточки
function dislikeCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/likes/${idCard}`, {
        method: "DELETE",
        headers: dataKeys.headers,
    }).then(getData);
}

// @todo: API редактирования аватарки
function newAvatar(avatarUrl) {
    return fetch(`${dataKeys.Url}/users/me/avatar`, {
        method: "PATCH",
        headers: dataKeys.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        }),
    }).then(getData);
}
