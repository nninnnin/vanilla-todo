// 여기에서 코드를 작성하세요!
let todoList = [];
let num =1;
//returnId는 string 


const todoListElement = document.querySelector(".todo-list");

const initTodoDivElement = document.querySelector(".initDiv")
const initTodoFormElement = document.querySelector(".todo-item");
const initTodoInputElement = document.querySelector("input");
const proposeNewTodoElement = document.querySelector(".todo-item-add");


const TODOS_KEY = "todos";
function saveToDos() {   //로컬스토리지에 저장하는 함수
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
  }



/*Handle 함수들(eventListener의 함수)*/
function handleToDoInitSubmit(event){ //처음에 할 일을 입력하고 저장했을 때
    event.preventDefault();
    const initTodo = initTodoInputElement.value;
    const initTodoArr = [num,initTodo];
    todoList.push(initTodoArr);
    initTodoDivElement.remove();
    paintTodo(initTodo);
    paintProposeNewTodo();
    saveToDos();
}

function handleToDoSubmit(event){ //새로운(not first) 할 일을 추가하고 submit했을 때
    event.preventDefault();
    const mustDeleteTodoElement = event.target.parentElement.parentElement;

    const todo = mustDeleteTodoElement.querySelector("input").value;

    const todoArr = [num,todo];
    todoList.push(todoArr);
    console.log(todoList);

    mustDeleteTodoElement.remove();

    paintTodo(todo);
    paintProposeNewTodo();
    saveToDos();
}

function handleButtonSave(event){ //수정 중인 상태에서 submit했을 때. //한번 수정한 전적이 있는 투두는 이후 수정을 또 하고 저장해도 이 상태
    event.preventDefault();
    const mustDeleteTodoElement = event.target.parentElement.parentElement;

    const returnId = mustDeleteTodoElement.id;
    const afterModifyTodo = mustDeleteTodoElement.querySelector("input").value;

    mustDeleteTodoElement.remove();

    for (let todo of todoList){
        if (todo[0] === parseInt(returnId)) {
            console.log("꺄");
            todo[1] = afterModifyTodo;
        };
    }
    
    saveToDos();
    
    const div = document.createElement("div");
    div.className ="todo-item";
    div.id = returnId;

    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = afterModifyTodo;

    const buttonModify = document.createElement("button");
    buttonModify.innerText = "✏️";
    buttonModify.addEventListener("click",handleButtonModify);

    const buttonCompleted = document.createElement("button");
    buttonCompleted.innerText = "✓";

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    buttonDelete.addEventListener("click",handleButtonDeleteReadonly);

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonCompleted);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);

    
    SendBackProposeNewTodo();
}


function handleButtonModify(event) //수정 버튼을 클릭했을 때
{   const mustDeleteTodoElement = event.target.parentElement;
    const returnId = mustDeleteTodoElement.id;
    const beforeModifyTodo = mustDeleteTodoElement.querySelector("span").innerText;
    mustDeleteTodoElement.remove();
    paintModifyTodo(beforeModifyTodo,returnId);
    SendBackProposeNewTodo();
}

function handleButtonDeleteReadonly(event)  {
    const mustDeleteTodoElement = event.target.parentElement;
    const returnId = mustDeleteTodoElement.id;
    todoList = todoList.filter((element) =>element[0] !==parseInt(returnId));
    saveToDos();
    mustDeleteTodoElement.remove();
}

function handleButtonDeleteWhileModify(event) {
    event.preventDefault();
    const mustDeleteTodoElement = event.target.parentElement.parentElement;
    const returnId = mustDeleteTodoElement.id;
    todoList = todoList.filter((element) =>element[0] !==parseInt(returnId));
    saveToDos();
    mustDeleteTodoElement.remove();
}

function handleNewTodoElement() { //"할 일 추가"를 눌렀을 때
    const proposeNewTodoElement = document.querySelector(".todo-item-add");
    proposeNewTodoElement.remove()
    PaintWriteTodo();
}




/* Paint functions*/
function paintModifyTodo(beforeModifyTodo,returnId) { //todo를 수정하는 중인 상태

    const div =  document.createElement("div");
    div.id = returnId;
    
    const form = document.createElement("form");
    form.className = "todo-item";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-input";
    input.value = beforeModifyTodo;

    const buttonSave = document.createElement("button");
    buttonSave.innerText = "저장";
    buttonSave.addEventListener("click",handleButtonSave);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    buttonDelete.addEventListener("click",handleButtonDeleteWhileModify);

    form.appendChild(input);
    form.appendChild(buttonSave);
    form.appendChild(buttonDelete);
    div.appendChild(form);
    todoListElement.appendChild(div);

    SendBackProposeNewTodo();

}

function PaintWriteTodo() { //todo를 새롭게 입력하는 상태
    const div =  document.createElement("div");
    num +=1;
    div.id = num.toString();

    const form = document.createElement("form");
    form.className = "todo-item";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-input";
    input.placeholder= "할 일을 입력하세요";

    const buttonSave = document.createElement("button");
    buttonSave.type = "submit";
    buttonSave.className = "save";
    buttonSave.innerText = "저장";
    buttonSave.addEventListener("click",handleToDoSubmit);

    form.appendChild(input);
    form.appendChild(buttonSave);
    div.appendChild(form);
    todoListElement.appendChild(div);

}

function paintTodo(todo){ //todo를 입력하고 저장하면 나타나는 상태 //수정 전에만 나타남.
    const div = document.createElement("div");
    div.className ="todo-item";
    div.id = num.toString();
    
    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = todo;

    const buttonModify = document.createElement("button");
    buttonModify.innerText = "✏️";
    buttonModify.addEventListener("click",handleButtonModify);

    const buttonCompleted = document.createElement("button");
    buttonCompleted.innerText = "✓";

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    buttonDelete.addEventListener("click",handleButtonDeleteReadonly);

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonCompleted);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);
}


function paintProposeNewTodo() { //할일 추가 상자 
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


function SendBackProposeNewTodo() { //할일 추가 상자가 항상 맨 아래 있게 하는 역할
    const proposeNewTodoElements = document.querySelectorAll(".todo-item-add");
    console.log(proposeNewTodoElements)
    if (proposeNewTodoElements.length >1){
        if (proposeNewTodoElements !== null){
            proposeNewTodoElements.remove();
        }
    }
    else {
        for (let proposeNewTodoElement of proposeNewTodoElements) {
            if (proposeNewTodoElement !== null){
                proposeNewTodoElement.remove();
            }
        }
    }

    paintProposeNewTodo();
}

initTodoFormElement.addEventListener("submit",handleToDoInitSubmit);


