/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div');
    // получаю размеры документа
    let x = window.innerWidth, 
        y = window.innerHeight;

    div.style.width = getRandom(50, 100)+'px';
    div.style.height = getRandom(50, 100)+'px';
    // x-200 и y-200 указывают на то чтобы divы не выходили за область документа
    div.style.left = getRandom(1, x-200)+'px';
    div.style.top = getRandom(1, y-200)+'px';
    div.classList.add('draggable-div');
    div.style.position = 'relative';
    // изменение цвета через HSL
    div.style.backgroundColor = 'hsl('+getRandom(0, 360)+',50%,70%)';

    function getRandom(min, max) {
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    return div;   
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    target.onmousedown = function(e) {

        target.style.position = 'absolute';
        moveAt(e);

        target.style.zIndex = 1000; 

        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        }

        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const newDiv = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(newDiv);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(newDiv);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
