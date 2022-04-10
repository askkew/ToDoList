//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//Event Listeners
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
//Functions

function addToDo(event){
    event.preventDefault(); ///prevent form from refreshing
    //ToDoDIV
    const todoDiv = document.createElement('li');
    todoDiv.classList.add("todo");
    //createLI
    const newTodo = document.createElement('div');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //completedbutton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //deletedbutton
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>'
    deletedButton.classList.add("delete-btn");
    todoDiv.appendChild(deletedButton);
    //append to list
    todoList.appendChild(todoDiv);
    //Clear text box
    todoInput.value = "";
    //
}


function deleteCheck(e){
    const item = e.target;
    //delete
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.remove();
    } 
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}