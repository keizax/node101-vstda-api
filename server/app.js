const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
const mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get("/", (req, res) => {
    res.status(200).send({status: 'ok'});
});

app.get("/api/TodoItems", (req, res) => {
    res.status(200).send(mockData)
});

app.get("/api/TodoItems/:number", (req, res) => {
    var todoId = req.params.number;
    for (var i = 0; i <mockData.length; i++) {
        if (mockData[i].todoItemId == todoId) {
            res.status(200).send(mockData[i])
        }
    }
});

app.post("/api/TodoItems/", (req, res) => {
    var newTodo = {
        todoItemId: 0,
        name: 'another item.',
        priority: 3,
        completed: false
        };
    for (var i = 0; i < mockData.length; i++) {    
        if (mockData[i].todoItemId == newTodo.todoItemId) { 
            mockData[i] = newTodo;
        }
    }    
    mockData.push(newTodo);   
    return res.status(201).send(newTodo);    
});

app.delete("/api/TodoItems/:number", (req, res) => {
    var delItem = req.params.number;
    for (var i = 0; i < mockData.length; i++) {
        if (mockData[i].todoItemId == delItem) {
            let delTodo = mockData[i];
            mockData.splice(i, 1);
            res.status(200).send(delTodo);
        }
    }
});

module.exports = app;
