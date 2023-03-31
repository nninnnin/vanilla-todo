// 여기에서 코드를 작성하세요!
let todoList = [];
let completedList = [];

let num =1;
//returnId는 string 


const todoListElement = document.querySelector(".todo-list");
const completedListElement = document.querySelector(".completed-list");

const initTodoDivElement = document.querySelector(".initDiv");
const initTodoFormElement = document.querySelector(".todo-item");
const initTodoInputElement = document.querySelector("input");
const proposeNewTodoElement = document.querySelector(".todo-item-add");


const TODOS_KEY = "todos";
function saveToDos() {   //로컬스토리지에 투두를 저장하는 함수
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
  }

const COMPLETEDS_KEY = "completeds";
function saveCompleted() { //로컬스토리지에 완료한 일을 저장하는 함수
    localStorage.setItem(COMPLETEDS_KEY, JSON.stringify(completedList));
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

function handleButtonModify(event) //수정 버튼을 클릭했을 때
{   const mustDeleteTodoElement = event.target.parentElement;
    const returnId = mustDeleteTodoElement.id;
    const beforeModifyTodo = mustDeleteTodoElement.querySelector("span").innerText;
    mustDeleteTodoElement.remove();
    paintModifyTodo(beforeModifyTodo,returnId);
    SendBackProposeNewTodo();
}

function handleButtonSave(event){ //수정 하고 submit했을 때. //한번 수정한 전적이 있는 투두는 이후 수정을 또 하고 저장해도 이 상태
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

    const buttonComplete = document.createElement("button");
    buttonComplete.innerText = "✓";
    buttonComplete.addEventListener("click",handleButtonComplete);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    buttonDelete.addEventListener("click",handleButtonDeleteReadonly);

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonComplete);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);

    
    SendBackProposeNewTodo();
}

function handleNewTodoElement() { //"할 일 추가"를 눌렀을 때
    const proposeNewTodoElement = document.querySelector(".todo-item-add");
    proposeNewTodoElement.remove()
    PaintWriteTodo();
}

function handleToDoSubmit(event){ //새로운(not init) 할 일을 추가하고 submit했을 때
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

function handleButtonComplete(event) { //완료(✓) 버튼을 눌렀을 때
    const mustDeleteTodoElement = event.target.parentElement;
    // console.log(mustDeleteTodoElement);
    const returnId = mustDeleteTodoElement.id;
    const completed = mustDeleteTodoElement.querySelector("span").innerText;

    todoList = todoList.filter((element) =>element[0] !==parseInt(returnId));
    
    mustDeleteTodoElement.remove();
    paintCompleted(completed,returnId);

    const completedArr = [parseInt(returnId),completed];
    completedList.push(completedArr);
    
    saveToDos();
    saveCompleted();
}

function handleButtonUp(event) { //completed를 다시 todo로 올리는 버튼을 눌렀을 때
    const mustDeleteTodoElement = event.target.parentElement;
    
    const completed = mustDeleteTodoElement.querySelector("span").innerText;
    const returnId = mustDeleteTodoElement.id;

    const todoArr = [parseInt(returnId),completed];
    todoList.push(todoArr);

    completedList = completedList.filter((element) =>element[0] !==parseInt(returnId));

    saveToDos();
    saveCompleted();
    
    mustDeleteTodoElement.remove();
    paintTodo(completed,returnId);
    SendBackProposeNewTodo();
}

function handleButtonDeleteReadonly(event)  { //form 형식이 아닌 투두들을 지우는데 사용
    const mustDeleteTodoElement = event.target.parentElement;
    const returnId = mustDeleteTodoElement.id;
    todoList = todoList.filter((element) =>element[0] !==parseInt(returnId));
    saveToDos();
    mustDeleteTodoElement.remove();
}

function handleButtonDeleteWhileModify(event) { //form 형식인 투두들을 지우는데 사용
    event.preventDefault();
    const mustDeleteTodoElement = event.target.parentElement.parentElement;
    const returnId = mustDeleteTodoElement.id;
    todoList = todoList.filter((element) =>element[0] !==parseInt(returnId));
    saveToDos();
    mustDeleteTodoElement.remove();
}


/* Paint functions*/
function PaintWriteTodo() { //todo를 새롭게 입력하는 상태 paint
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

function paintTodo(todo,returnId){ //todo를 입력하고 저장하면 나타나는 상태 paint //수정 전에만 나타남.
    const div = document.createElement("div");
    div.className ="todo-item";

    if (returnId === undefined)
    {
        div.id = num.toString();
    }
    else{
        div.id = returnId;
    }
    
    const span = document.createElement("span");
    span.className = "todo-readonly";
    span.innerText = todo;

    const buttonModify = document.createElement("button");
    buttonModify.innerText = "✏️";
    buttonModify.addEventListener("click",handleButtonModify);

    const buttonComplete = document.createElement("button");
    buttonComplete.innerText = "✓";
    buttonComplete.addEventListener("click",handleButtonComplete);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "❌";
    buttonDelete.addEventListener("click",handleButtonDeleteReadonly);

    div.appendChild(span);
    div.appendChild(buttonModify);
    div.appendChild(buttonComplete);
    div.appendChild(buttonDelete);
    todoListElement.appendChild(div);
}

function paintModifyTodo(beforeModifyTodo,returnId) { //todo를 수정하는 중인 상태 paint

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

function paintProposeNewTodo() { //할일 추가 상자 paint
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

function paintCompleted(completed,returnId) { //완료된 todo 상태 paint
    const div = document.createElement("div");
    div.className = "completed-item";
    div.id = returnId

    const span = document.createElement("span");
    span.className = "completed-readonly";
    span.innerText = completed;

    const buttonUp = document.createElement("button");
    buttonUp.className = "completed-button";
    buttonUp.innerText = "⬆";
    buttonUp.addEventListener("click",handleButtonUp);

    div.appendChild(span);
    div.appendChild(buttonUp);
    completedListElement.appendChild(div);
}


/* etc functions*/
function SendBackProposeNewTodo() { //할일 추가 상자가 항상 맨 아래에 있게 하는 역할
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

initTodoFormElement.addEventListener("submit",handleToDoInitSubmit); //초기 todo에 대한 eventListener


