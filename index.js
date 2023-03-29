// 여기에서 코드를 작성하세요!
let todoList = [];
let num =1;
let controlNum;
let controlTodo;

const todoListElement = document.querySelector(".todo-list");

const initTodoFormElement = document.querySelector(".todo-item");
const initTodoInputElement = document.querySelector("input");
const proposeNewTodoElement = document.querySelector(".todo-item-add");

// console.log(proposeNewTodoElement);

const TODOS_KEY = "todos";
function saveToDos() {   //로컬스토리지에 저장하는 함수
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
  }


console.log(todoListElement);
console.log(initTodoInputElement);

function handleToDoInitSubmit(event){ //처음에 할 일을 입력하고 저장했을 때
    event.preventDefault();
    const initTodo = initTodoInputElement.value;
    const initTodoArr = [num,initTodo];
    todoList.push(initTodoArr);
    initTodoFormElement.remove();
    paintTodo(initTodo);
    paintProposeNewTodo();
    saveToDos();
}

function handleButtonSave(){ //수정 중인 상태에서 저장버튼을 눌렀을 때
    todoFormElement.preventDefault();
    console.log(controlTodo);
    console.log("안녕하세요");
    const todoFormElement = document.getElementById(toString(controlNum));
    
    for (value in todoList) {
        if (value[0]===controlNum){
            value[1] = controlTodo;
        }
    };
    console.log("안녕하세요");
    
    const div = document.createElement("div");
    div.className ="todo-item";
    div.id = toString(controlNum);

    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = controlTodo;

    const buttonModify = document.createElement("button");
    buttonModify.innerText = "✏️";
    buttonModify.addEventListener("click",handleButtonModify);

    const buttonCompleted = document.createElement("button");
    buttonCompleted.innerText = "✓";

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonCompleted);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);

}


function handleButtonModify() //수정 버튼을 클릭했을 때
{
    const mustDeleteTodoElement = document.getElementById(controlNum);
    mustDeleteTodoElement.remove();
    paintModifyTodo(controlTodo);
}


function handleNewTodoElement() { //"할 일 추가"를 눌렀을 때
    const proposeNewTodoElement = document.querySelector(".todo-item-add");
    proposeNewTodoElement.remove()
    PaintWriteTodo();
}


function paintModifyTodo(beforeModifyTodo) { //todo를 수정하는 중인 상태
    const proposeNewTodoElement = document.querySelector(".todo-item-add");
    if (proposeNewTodoElement !== null){
        proposeNewTodoElement.remove()
    }

    const div =  document.createElement("div");
    
    const form = document.createElement("form");
    form.className = "todo-item";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-input";
    input.value = beforeModifyTodo;

    const AfterModifyTodo = input.value;
    controlTodo= AfterModifyTodo;
    //여기서 controlNum은 입력 후 저장된 상태와 동일.

    const buttonSave = document.createElement("button");
    buttonSave.innerText = "저장";
    buttonSave.addEventListener("click",handleButtonSave);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    

    form.appendChild(input);
    form.appendChild(buttonSave);
    form.appendChild(buttonDelete);
    div.appendChild(form);
    todoListElement.appendChild(div);

    paintProposeNewTodo();
}

function PaintWriteTodo() { //todo를 새롭게 입력하는 상태
    const div =  document.createElement("div");

    const form = document.createElement("form");
    form.className = "todo-item";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-input";
    input.placeholder= "할 일을 입력하세요";

    const button = document.createElement("button");
    button.type = "submit";
    button.className = "save";
    button.innerText = "저장";

    form.appendChild(input);
    form.appendChild(button);
    div.appendChild(form);
    todoListElement.appendChild(div);

}

function paintTodo(todo){ //todo를 입력하고 저장한 상태
    const div = document.createElement("div");
    div.className ="todo-item";
    div.id = toString(num);
    num +=1;

    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = todo;

    controlNum = div.id;
    controlTodo =todo;

    const buttonModify = document.createElement("button");
    buttonModify.innerText = "✏️";
    buttonModify.addEventListener("click",handleButtonModify);

    const buttonCompleted = document.createElement("button");
    buttonCompleted.innerText = "✓";

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonCompleted);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);
}


function paintProposeNewTodo() {
    const div1 = document.createElement("div");
    div1.className = "todo-item-add";

    const div2 = document.createElement("div");
    div2.className = "content";

    const span = document.createElement("span");
    span.innerText = "할 일 추가";

    div2.appendChild(span);
    div1.appendChild(div2);
    todoListElement.appendChild(div1);

    div1.addEventListener("click",handleNewTodoElement);

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

initTodoFormElement.addEventListener("submit",handleToDoInitSubmit);


