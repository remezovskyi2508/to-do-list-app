// Находим элементы на странице

const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];


// Добавляем задачи

form.addEventListener('submit', addTask);

//Удаляем задачи

tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной

tasksList.addEventListener('click', doneTask)



//Functions

function addTask(event) {
    //canceled submit form
    event.preventDefault();
    //take out text of task from input 
    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };
    tasks.push(newTask)
    console.log(tasks);
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';
    //console.log(taskText);
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${newTask.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = ""
    taskInput.focus()

    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
}

function deleteTask(event) {

    if (event.target.dataset.action !== "delete") return;
    const parentNode = event.target.closest(".list-group-item");
    parentNode.remove();

    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}

function doneTask(event) {
    if (event.target.dataset.action !== "done") return;
    const parentNode = event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.add('task-title--done');
}

