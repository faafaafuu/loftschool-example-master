/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: Н а странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

//  переобразование в обект
function getCookie() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;
        
        return prev;
    }, {})
}

function cookieFilter(chunk) {
    const obj = getCookie();
    const filteredCookies = {};

    chunk = chunk.toLowerCase();

    for (let key in obj) {
        if (key) {
            let name = key.toLowerCase();
            let val = obj[key].toLowerCase();

            if (name.includes(chunk) || val.includes(chunk)) {
                filteredCookies[key] = obj[key];
            }
        }
    }

    return filteredCookies;
}

function createTable(cookies) {
    while (listTable.rows[0]) {
        listTable.deleteRow(0);
    }

    let btn = '<button type="button">Удалить</button>';

    for (let name in cookies) {
        if (cookies.hasOwnProperty(name)) {
            let row = listTable.insertRow(-1);

            row.insertCell(-1).innerText = name;
            row.insertCell(-1).innerText = cookies[name];
            row.insertCell(-1).innerHTML = btn;
        }
    }
}

filterNameInput.addEventListener('keyup', function (e) {
    let value = this.value;

    if (!value) {
        createTable(getCookie());
    }

    createTable(cookieFilter(value));
});

listTable.addEventListener('click', function (e) {
    let btn = e.target;
    let row = btn.parentNode.parentNode;
    let rowIndex = btn.parentNode.parentNode.sectionRowIndex;
    let name = row.firstChild.innerText;

    this.deleteRow(rowIndex);
    removeCookie(name);
});

function removeCookie(name) {
    if (getCookie().hasOwnProperty(name)) {
        document.cookie = name + '=; expires=' + new Date(-1);
    }
}

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;    
    //  почему то тест на отчистку ругается..
    // addNameInput.value = '';
    // addValueInput.value = '';
    let filter = filterNameInput.value;

    if (filter) {
        createTable(cookieFilter(filter));
    } else {
        createTable(getCookie());
    }
});

createTable(getCookie());
