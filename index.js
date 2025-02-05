const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const myModule = require('./tasks');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Exercise 2
app.get('/tasks', (req, res) => {
  let result = myModule.tasks;
  res.json(result);
});

//Exercise 1
function addTask(tasks, task) {
  tasks.push(task);
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  let task = { taskId: taskId, text: text, priority: priority };
  //console.log(task);
  let result = addTask(myModule.tasks, task);
  res.json(result);
});

//Exercise 3
// url: /tasks/sort-by-priority
function sortByPriority(a, b) {
  return a.priority - b.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let tasks = myModule.tasks.slice();
  let result = myModule.tasks.sort((a, b) => sortByPriority(a, b));
  res.json(result);
});

//Exercise 4
//<http://localhost:3000/tasks/edit-priority?taskId=1&priority=1>
function editPriority(tasks, taskid, priority) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskid) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskid = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let tasks = myModule.tasks.slice();
  let result = editPriority(tasks, taskid, priority);
  res.json(result);
});

//Exercise 5
// <http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation>
function editText(tasks, taskid, text) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskid) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskid = parseInt(req.query.taskId);
  let text = req.query.text;
  let tasks = myModule.tasks.slice();
  let result = editText(tasks, taskid, text);
  res.json(result);
});

//Exercise 6
// <http://localhost:3000/tasks/delete?taskId=2>
function deleteById(task, taskid) {
  return task.taskId != taskid;
}
app.get('/tasks/delete', (req, res) => {
  let taskid = parseInt(req.query.taskId);
  let tasks = myModule.tasks.slice();
  let result = tasks.filter((task) => deleteById(task, taskid));
  res.json(result);
});

// Exercise 7
// <http://localhost:3000/tasks/filter-by-priority?priority=1>
function filterByPriority(task, priority) {
  return task.priority == priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let tasks = myModule.tasks.slice();
  let result = tasks.filter((task) => filterByPriority(task, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
