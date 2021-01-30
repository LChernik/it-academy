
function setError(errElId, error){
    const errEl = document.getElementById(errElId);
    errEl.innerHTML = error;
}

function validateFullName(setFocusIfInvalid, field, errElId){
    const errMessage = /^[a-zA-Zа-яА-Я]+\s+[a-zA-Zа-яА-Я]+$/.test(field.value.trim())
        ? ''
        : 'Введите имя в формате ИМЯ ФАМИЛИЯ, например, ИВАН ИВАНОВ';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateTitle(setFocusIfInvalid, field, errElId){
    const errMessage = /^[a-zA-Zа-яА-Я]+$/.test(field.value.trim())
        ? ''
        : 'Введите название в формате ИмяМагазина, например, AMAZON';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}


function validateURL(setFocusIfInvalid, field, errElId){
    const errMessage = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(field.value.trim())
        ? ''
        : 'Введите ссылку на сайт в формате https://example.com';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateDate(setFocusIfInvalid, field, errElId){
    const errMessage = isValidDate(field.value)
        ? ''
        : 'Введите дату в формате dd/mm/yyyy между 1980 и 2021';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function isValidDate(dateString)
{
    
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

   
    if(year < 1980 || year > 2021 || month == 0 || month > 12)
        return false;

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;


    return day > 0 && day <= monthLength[month - 1];
};

function validateNumber(setFocusIfInvalid, field, errElId, min, max){
    const parsedVal = parseInt(field.value, 10); 
    const errMessage = isNaN(parsedVal) || parsedVal < (min || -Infinity) || parsedVal > (max || Infinity) 
        ? 'Введите число' + (typeof min === 'number' ? ` ${min} <= X` : '') + (typeof max === 'number' ? ` <= ${max}` : '')
        : '';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateEmail(setFocusIfInvalid, field, errElId){
    const errMessage = /^\S+@\S+\.\S+$/.test(field.value)
        ? ''
        : 'Введите email в формате example@mail.com';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateCatalog(setFocusIfInvalid, field, errElId){
    const errMessage = field.value !== '3'
        ? ''
        : 'Эта опция недоступна, пожалуйста, выберете другую';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validatePublic(setFocusIfInvalid, field, errElId){
    if (field.value === ''){
        setError(errElId, 'Выберете, пожалуйста, опцию размещения');
        return true;
    } else if(field.value === '1'){
        setError(errElId, 'Эта опция недоступна, пожалуйста, выберете другую');
    } else {
        setError(errElId, '');
    }
    if(setFocusIfInvalid) field.focus();
    return false;
}


function validateComments(setFocusIfInvalid, field, errElId){
    const errMessage = field.checked
        ? ''
        : 'Отзывы временно нельзя запретить';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateTextArea(setFocusIfInvalid, field, errElId){
    const errMessage = field.value !== ''
        ? ''
        : 'Поле не может быть пустым';
    setError(errElId, errMessage);
    if(errMessage !== '' && setFocusIfInvalid) field.focus();
    return errMessage === '';
}

function validateForm(event, validators){
    let isValid = true;
    for (let validator of validators){
        isValid &= validator(isValid);
    }
    if(!isValid){
        event.preventDefault();
        return false;
    }
}

