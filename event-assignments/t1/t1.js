// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here

const ul = document.querySelector('ul');

const addTodoItem = item => {
  const li = document.createElement('li');
  li.innerHTML = `
  ${item.task}

  <input type="checkbox" ${item.completed && 'checked'} id="${item.id}" />

  <button type="button">Delete</button>

  `;
  // li.innerText = `${item.task} <input type="checkbox" />`;

  ul.appendChild(li);

  li.querySelector('input').addEventListener('click', event => {
    item.completed = !item.completed;

    console.log('todo list', todoList);
  });

  li.querySelector('button').addEventListener('click', event => {
    ul.removeChild(li);

    const index = todoList.findIndex(({id}) => id === item.id);

    todoList.splice(index, 1);

    console.log('todo list', todoList);
  });
};

for (const item of todoList) {
  addTodoItem(item);
}

const addButton = document.querySelector('button.add-btn');

addButton.addEventListener('click', () => {
  document.querySelector('dialog').showModal();
});

const addForm = document.querySelector('dialog form');

addForm.addEventListener('submit', event => {
  event.preventDefault();

  const task = event.currentTarget.querySelector('input').value;

  const item = {
    id: +new Date(),
    task,
    completed: false,
  };

  todoList.push(item);
  addTodoItem(item);

  document.querySelector('dialog').close();
  event.currentTarget.querySelector('input').value = '';
});

/*
// argh huono tapa :(
const inputs = document.querySelectorAll('li input');

inputs.forEach(input => {
  input.addEventListener('click', event => {
    console.log('event in more painful way', event);

    for (item in todoList) {
      if (item.id === Number(event.target.id)) {
        item.completed = !item.completed;
      }
    }
  });
});
*/

/*
todoList.forEach(item => {
  const li = document.createElement('li');
  li.innerHTML = item.task;

  ul.appendChild(li);
});

*/
