export { getUserMe, getCards, sendUserMe, sendCard, deleteCard, likeCard, dislikeCard, newAvatar };

const dataKeys = {
    Url: "https://nomoreparties.co/v1/wff-cohort-33",
    headers: {
        authorization: "6b856634-e357-421d-8193-f74ecd64828b",
        "Content-type": "application/json",
    },
};

function getData(data) {
    if (!data.ok) {
        return Promise.reject(`Ошибка: ${data.status}`);
    }
    return data.json();
}

function getUserMe() {
    return fetch(`${dataKeys.Url}/users/me`, {
        method: "GET",
        headers: dataKeys.headers,
    }).then(getData);
}

function getCards() {
    return fetch(`${dataKeys.Url}/cards`, {
        method: "GET",
        headers: dataKeys.headers,
    }).then(getData);
}

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

function deleteCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/${idCard}`, {
        method: "DELETE",
        headers: dataKeys.headers,
    }).then(getData);
}

function likeCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/likes/${idCard}`, {
        method: "PUT",
        headers: dataKeys.headers,
    }).then(getData);
}

//Убираем лайки
function dislikeCard(idCard) {
    return fetch(`${dataKeys.Url}/cards/likes/${idCard}`, {
        method: "DELETE",
        headers: dataKeys.headers,
    }).then(getData);
}

//Редактирование аватарки
function newAvatar(avatarUrl) {
    return fetch(`${dataKeys.Url}/users/me/avatar`, {
        method: "PATCH",
        headers: dataKeys.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        }),
    }).then(getData);
}
