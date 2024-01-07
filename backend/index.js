// Dependencies 
const express = require("express");
const cors = require("cors");
const database = require("./lib/lib")
// App Object
const app = express();

// Use App Object
app.use(cors());
app.use(express.json());

// home get route 
app.get("/", (req, res) => {
  res.send("hello world");
});

// users get route
app.get("/users", (req,res)=>{
    // readfile from users.json file 
    database.readDatabase('./.db/users.json', (data)=>{
        res.send(data)
    })
})
// users post route
app.post("/users", (req,res)=>{
    const body = req.body;
    // send user to database 
    database.createDataBase("./.db/users.json", body)
})

app.post('/users/update', (req,res)=>{
  const body = req.body;
  const findId = body.findId;
  database.updateDatabase('./.db/users.json', body, findId);
})

app.post("/users/delete", (req,res)=>{
  const deletedId = req.body.deleteId;
  database.deleteDatabase("./.db/users.json", deletedId)
})
// listening the app
app.listen(5000, () => {
  console.log("the server running on 5000");
});

