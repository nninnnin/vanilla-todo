let todoList = [
    {
        todo: "할일1",
        id: 1,
        done: false
    },
    {
        todo: "할일2",
        id: 2,
        done: false
    },
    {
        todo: "할일3",
        id: 3,
        done: false
    },
    {
        todo: "할일4",
        id: 4,
        done: false
    },
    {
        todo: "할일5",
        id: 5,
        done: false
    }
];

const todoListElement = document.querySelector(".todo-list");
const toDoInput = document.querySelector(".todo-input");
const toDoForm = document.querySelector("form");
const doneToDoListElement = document.querySelector(".done-todo-list");
let IdCount = 5;

function deleteToDo(event){
    const div = event.target.parentElement;
    todoList = todoList.filter((todo) => todo.id !== parseInt(div.id));
    div.remove();
}

function doneToDo(event)
{
    const div = event.target.parentElement;
    const listElement = (todoList.filter((todo) => todo.id === parseInt(div.id)))[0];
    listElement.done = true;
    div.remove();
    paintToDo(listElement);
}

function paintToDo(item){
    const div = document.createElement("div");
    div.classList.add("todo-item");
    div.innerText = item.todo;
    if(item.done === true)
    {
        doneToDoListElement.appendChild(div);
        return;
    }
    div.id = item.id;
    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    const doneButton = document.createElement("button");
    doneButton.id = "doneButton";
    doneButton.innerText = "✔️";
    deleteButton.innerText = "X";

    deleteButton.addEventListener("click", deleteToDo);
    doneButton.addEventListener("click", doneToDo);
    

    div.appendChild(doneButton);
    div.appendChild(deleteButton);
    todoListElement.appendChild(div);
}

function handleToDoSubmit(event){
    event.preventDefault();
    IdCount = IdCount + 1;
    const newTodoObj = {
        todo: toDoInput.value,
        id: IdCount,
        done: false
    };
    todoList.push(newTodoObj);
    paintToDo(newTodoObj);
    toDoInput.value = "";
}

todoList.forEach(paintToDo);
toDoForm.addEventListener("submit", handleToDoSubmit);


