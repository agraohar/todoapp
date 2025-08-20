const dateElement = document.getElementById("date");

// set the date
const date = new Date();
dateElement.innerHTML = date.toLocaleDateString();

const backendURL = "http://localhost:3000";

// ================================================
async function getTodos() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    // sending the http request
    const response = await fetch(backendURL + "/todos", options);

    // handle http response
    const todos = await response.json();

    // render HTML
    const todoItemsContainer = document.getElementById("todo-items");
    todos.forEach((todo) => {
        // create the list item element
        const todoListItem = document.createElement("li");
        todoListItem.innerHTML = todo.text;

        // create buttons
        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        updateBtn.style.margin = "4px";
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.style.margin = "4px";

        // create div
        const buttonDiv = document.createElement("div");
        buttonDiv.appendChild(updateBtn);
        buttonDiv.appendChild(deleteBtn);

        todoListItem.appendChild(buttonDiv);
        todoItemsContainer.appendChild(todoListItem);
    });
}

async function postTodo() {
    // get todo input value
    const todoInput = document.getElementById("todo-input");
    let todoValue = todoInput.value;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: todoValue
        })
    };
    const response = await fetch(backendURL + "/todos", options);

    if (response.ok) {
        console.log("Todo item added successfully");
        location.reload();
    } else {
        console.log("Todo item could not be added");
    }
}


getTodos();