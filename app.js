//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
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
    //add todo to local storage
    saveLocalTodos(todoInput.value);
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
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    } 
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
            break;
        }
    })
}

function saveLocalTodos(todo){
    //are there things in storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));     //if there is something there, it is parsing it back into an array
    }
    //59.38
    todos.push(todo);   //pushing the passed in parameter into line 84
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //ToDoDIV
        const todoDiv = document.createElement('li');
        todoDiv.classList.add("todo");
        //createLI
        const newTodo = document.createElement('div');
        newTodo.innerText = todo;
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
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}