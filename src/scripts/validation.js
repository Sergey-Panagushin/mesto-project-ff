// @todo: Добавление ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, settingValidtion ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);

    inputElement.classList.add(settingValidtion.inputErrorClass);

    errorElement.classList.add(settingValidtion.errorClass);
    errorElement.textContent = errorMessage;
    
};

// @todo: Удаление ошибки валидации
const hideInputError = (formElement, inputElement, settingValidtion) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);

    inputElement.classList.remove(settingValidtion.inputErrorClass);

    errorElement.classList.remove(settingValidtion.errorClass);
    errorElement.textContent = "";
};

// @todo: Проверка валидации
const isValid = (formElement, inputElement, settingValidtion) => {
  
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, settingValidtion);
} else {
  hideInputError(formElement, inputElement, settingValidtion);
}
}; 

// @todo: Перебор массивов инпутов
const setEventListeners = (formElement, settingValidtion) => {
    const inputsList = Array.from(formElement.querySelectorAll(settingValidtion.inputSelector));
    const buttonElement = formElement.querySelector(settingValidtion.submitButtonSelector);
    toggleButtonState(inputsList, buttonElement, settingValidtion);
    inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, settingValidtion);
            toggleButtonState(inputsList, buttonElement, settingValidtion);
        });  
    });
};

// @todo: Перебор массивов форм
export const enableValidation = (settingValidtion) => {
    const formList = Array.from(document.querySelectorAll(settingValidtion.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, settingValidtion);
    });
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  }; 

// @todo: Сделать кнопку при ошибках валидаций неактивной
const toggleButtonState = (inputList, buttonElement, settingValidtion) => {

    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add(settingValidtion.inactiveButtonClass);    
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove(settingValidtion.inactiveButtonClass);
    }
  }; 

export  function clearValidation(form, settingValidtion) {
    const inputs = Array.from(form.querySelectorAll(settingValidtion.inputSelector));
    const submitButton = form.querySelector(settingValidtion.submitButtonSelector);
  
    inputs.forEach((input) => {
      hideInputError(form, input, settingValidtion);
    });
  
    toggleButtonState(inputs, submitButton, settingValidtion);
}
