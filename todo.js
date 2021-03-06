var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });   
  },
  changeTodo: function(position, todoText) {
    // this.todos[position] = newValue;
    this.todos[position].todoText = todoText
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1)
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      // Case 1: If everything's true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput')
    let changeTodoTextInput = document.getElementById('changeTodoTextInput')
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value)
    changeTodoPositionInput = '';
    changeTodoTextInput = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

let view = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    // for (var i = 0; i < todoList.todos.length; i++) {
    //   let todoLi = document.createElement('li');
    //   let todo = todoList.todos[i];
    //   let todoTextWithCompletion = '';

    //   if(todo.completed === true) {
    //     todoTextWithCompletion = '(x)' + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = '( )' + todo.todoText;
    //   }

    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton());
    //   todosUl.appendChild(todoLi)
    // }
    todoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';

      if(todo.completed === true) {
        todoTextWithCompletion = '(x)' + todo.todoText;
      } else {
        todoTextWithCompletion = '( )' + todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi) 
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
        let todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event){
      
      //Get the element that was clicked on.
      let elementClicked = event.target;

      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id))
      }
    });
  }
};

view.setUpEventListeners();


