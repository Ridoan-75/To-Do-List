const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function added 
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (!inputText) {
        alert("You must write something in your to-do!");
        return;
    }

    if (addBtn.innerText === "Edit") {
        editLocalTodos(editTodo.innerText, inputText);
        editTodo.innerText = inputText;
        addBtn.innerText = "Add";
        inputBox.value = "";
        editTodo = null;
    } else {
        const li = document.createElement("li");
        li.className = "w-full list-none cursor-pointer rounded-lg border p-3 bg-white flex items-center justify-between transition-colors duration-500 hover:bg-gray-300";

        const p = document.createElement("p");
        p.className = "flex-grow p-1";
        p.innerText = inputText;
        li.appendChild(p);

        const btnContainer = document.createElement("div");
        btnContainer.className = "flex space-x-3";

        const editBtn = document.createElement("button");
        editBtn.className = "text-green-600 font-semibold px-2";
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(p, editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "text-red-600 font-semibold px-2";
        deleteBtn.innerText = "Remove";
        deleteBtn.onclick = () => deleteTask(li, p.innerText);

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        todoList.appendChild(li);
        saveLocalTodos(inputText);

        inputBox.value = "";
    }
};

//Edit button editing
const editTask = (p, btn) => {
    inputBox.value = p.innerText;
    inputBox.focus();
    addBtn.innerText = "Edit";
    editTodo = p;
};

// task delete edit
const deleteTask = (li, text) => {
    todoList.removeChild(li);
    deleteLocalTodos(text);
};

// localstorage added
const saveLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Function added for local storage
const getLocalTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "w-full list-none cursor-pointer rounded-lg border p-3 bg-white flex items-center justify-between transition-colors duration-500 hover:bg-gray-300";

        const p = document.createElement("p");
        p.className = "flex-grow p-1";
        p.innerText = todo;
        li.appendChild(p);

        const btnContainer = document.createElement("div");
        btnContainer.className = "flex space-x-3";

        const editBtn = document.createElement("button");
        editBtn.className = "text-green-600 font-semibold px-2";
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(p, editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "text-red-600 font-semibold px-2";
        deleteBtn.innerText = "Remove";
        deleteBtn.onclick = () => deleteTask(li, p.innerText);

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        todoList.appendChild(li);
    });
};

// Function added for delete task from local storage
const deleteLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(item => item !== todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};