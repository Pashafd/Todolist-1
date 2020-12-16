'use strict'
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-List');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions
function addTodo(event) {
        //prevent from form
    event.preventDefault();
    if (!todoInput.value == "") {
            //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
            //create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
            //add todo in local storage 
        saveLocalTodods(todoInput.value);
            //CHECK MARK BUTTON
        const complitedButton = document.createElement('button');
        complitedButton.innerHTML = `<i class="fas fa-check"></i>`;
        complitedButton.classList.add('complited-btn');
        todoDiv.appendChild(complitedButton);
            //CHECK trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
            //APPEND TODO LIST
        todoList.appendChild(todoDiv);
            //clear todo input.value
        todoInput.value = "";
    }
}

function deleteCheck (event) {
    const item = event.target;
    //delete item
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall'); 
        removeLocalTodos(todo);
         // todo.remove after animation;
        todo.addEventListener('transitionend', function () {
           todo.remove();
        });
    }

    //check mark
    if(item.classList.contains('complited-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('complited');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complited":
                if (todo.classList.contains("complited")) {
                     todo.style.display = "flex";
                } else {
                     todo.style.display = "none";
                }
                break;   
            case "uncomplited":
                if (!todo.classList.contains("complited")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
     });   
}

function saveLocalTodods(todo) {
    //check local storage
    let todos;
    if (localStorage.getItem('todos') === null) {   
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); 
    }

    todos.push(todo);               
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
    let todos;
      //check local storege
      if (localStorage.getItem('todos') === null) {   
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem('todos')); 
      }
      todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
            //create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
            //CHECK MARK BUTTON
        const complitedButton = document.createElement('button');
        complitedButton.innerHTML = `<i class="fas fa-check"></i>`;
        complitedButton.classList.add('complited-btn');
        todoDiv.appendChild(complitedButton);
             //CHECK trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
            //APPEND TODO LIST
        todoList.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo) {
     //check local storege
     let todos;
     if (localStorage.getItem('todos') === null) {   
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); 
    }

    const todoIndex = todo.children[0].innertext;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}