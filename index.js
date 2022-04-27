const todoList = document.querySelector("#todo-list");
const form = document.querySelector("#form");

//  renders the todos in todos json
fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((todo) => {
      _insertTodo(todo);
    });
  });

// posts new todo when user submits new todo
form.addEventListener("submit", (event) => {
  event.preventDefault();

  _postNewTodo(event.target[0].value);
});

// function clearInputField() {
//   form.innerHTML = "";
// }

function _insertTodo(todo) {
  // creates new li and inserts to todo-list ul
  const html = `<li>${todo.title}</li>`;
  todoList.insertAdjacentHTML("beforeend", html);
}

function _postNewTodo(todoTitle) {
  const httpRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: todoTitle, completed: false }),
  };

  // posts todo to server - on sucess - adds todo data to html
  fetch(`http://localhost:3000/todos`, httpRequestOptions)
    .then((res) => {
      console.log(res);
      const result = res.json();
      console.log(result);
      return result;
    })
    .then((todo) => {
      _insertTodo(todo);
    });
}
