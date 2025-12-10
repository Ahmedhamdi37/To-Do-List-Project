let form = document.querySelector('form');

let btn = document.getElementById('btn');
let fld = document.getElementById('fld');

// function to convert data to object
const dataTo_Object = function (text) {
  return {
    id: crypto.randomUUID(),
    title: text,
  };
};

//function to create new task to html

function createTaskInHtml(text) {
  const task = document.createElement('div');
  const inner = document.createElement('div');
  const p = document.createElement('p');
  const btn = document.createElement('button');

  p.textContent = text;
  btn.textContent = 'Delete';

  inner.append(p, btn);
  task.append(inner);

  task.classList.add('card-task');

  return task;
}

// function to convert object to data
function loadTasksFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedValue = localStorage.getItem(key);
    try {
      const Obj = JSON.parse(storedValue);

      if (Obj && Obj.title) {
        const task = createTaskInHtml(Obj.title);
        document.body.appendChild(task);
        console.log('Task loaded:', Obj);
      }
    } catch (e) {
      console.error('Error parsing JSON from localStorage for key:', key, e);
    }
  }
}

//main
form.onsubmit = (e) => {
  if (fld.value.trim() === '') {
    e.preventDefault();
    return;
  }

  const Obj = dataTo_Object(fld.value);

  localStorage.setItem(Obj.id, JSON.stringify(Obj));

  console.log('Task saved:', Obj);

  const task = createTaskInHtml(fld.value);
  document.body.appendChild(task);
  fld.value = '';
};

window.onload = loadTasksFromLocalStorage();
