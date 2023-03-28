// 여기에서 코드를 작성하세요!
let todoList = [];

const initTodoListElement = document.querySelector(".todo-list");
const initTodoFormElement = document.querySelector(".todo-item");
const initTodoInputElement = document.querySelector("input");


console.log(initTodoListElement);
console.log(initTodoInputElement);

function handleToDoSubmit(event){
    event.preventDefault();
    const initTodo = initTodoInputElement.value;
    const initTodoObj = {
        text: initTodo,
        id: Date.now(),
    };
    todoList.push(initTodoObj);
    initTodoFormElement.remove();
    console.log("Hi");
    paintTodo()

}

function paintTodo(){
    const div = document.createElement("div");
    div.className ="todo-item";

    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = "기존에 입력되어져 있었던 일";

    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const button3 = document.createElement("button");

    button1.innerText = "✏️";
    button2.innerText = "✓";
    button3.innerText = "❌";

    div.appendChild(span);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    initTodoListElement.appendChild(div);
}


// function initSave() {
//     const initTodo = inputElement.value;
//     todoList.push(initTodo);
//     todoItemElement.remove();
//     todoItemElement.prevent

//     const div = document.createElement("div");
//     div.style = "border:1px solid; width:100px, height:100px";
//     div.className = "todo-item";
//     console.log(initTodo);
//     const span = document.createElement("span");
//     span.className ="todo-readonly";
//     span.innerText = initTodo;

//     div.appendChild(span);
//     todoItemElement.appendChild(div);
// }

initTodoFormElement.addEventListener("submit",handleToDoSubmit)


