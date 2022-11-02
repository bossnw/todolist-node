const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [ // example 
  { 
    id:1,
    taskName:"Watering Plant",
  }
];

app.get("/todoList", (req, res) => { //for see all in todoList
  console.log(todoList.length);
  if (!todoList) {
    return res.status(400).json({error:"Something went wrong with TodoList"});
  }
  if (todoList.length > 0) {
    return res.status(200).json(todoList);
  }
  else{
    return res.status(200).json({info:"You Dont Have Anything to Do"});
  }
});

app.post("/addTask/:taskName", (req, res) => { //for add new item to todoList
  const newTask = req.params.taskName;
  if (!todoList) {
    return res.status(400).json({error:"Something went wrong with TodoList"});
  }
  else if (!newTask) {
    return res.status(400).json({error:"New Task Not Found"});
  }
  else{
    newId = todoList.length + 1
    todoList.push({
      id:newId,
      taskName:newTask
    })
    return res.status(200).json(todoList);
  }
});

app.post("/editoneTask/:id/:taskName", (req, res) => { //for edit item in todoList
  var id = req.params.id;
  const taskName = req.params.taskName;
  if (!todoList) {
    return res.status(400).json({error:"Something went wrong with TodoList"});
  }
  else if (id > todoList.length) {
    return res.status(400).json({error:"ID not Match or not in Range"});
  }
  else{
    id = id-1
    todoList[id].taskName = taskName
    return res.status(200).json(todoList);
  }

});

app.post("/delTask/:id", (req, res) => { //for delete item in todoList
  var id = req.params.id;
  if (!todoList) {
    return res.status(400).json({error:"Something went wrong with TodoList"});
  }
  else if (id > todoList.length) {
    return res.status(400).json({error:"ID not Match or not in Range"});
  }
  else{
    id = id-1
    todoList.splice(id, 1);
    for (let i = id; i < todoList.length; i++) {
      todoList[i].id = todoList[i].id-1
    }
    return res.status(200).json(todoList);
  }
});

app.listen(PORT, () => console.log(`Server Listening to port: ${PORT}`)); 
