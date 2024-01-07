// Dependencies 
const fs = require("fs");
// database object 
const database = {};

// create database
database.createDataBase = (dir, object) => {
  fs.readFile(dir, "utf-8", (err, data) => {
    const arr = JSON.parse(data);
    arr.push(object);
    fs.writeFileSync(dir, JSON.stringify(arr));
  });
};

// read database
database.readDatabase = (dir, readData) => {
  fs.readFile(dir, "utf-8", (err, data) => {
    if (!err) {
      const actualData = JSON.parse(data);
      readData(actualData);
    } else {
      readData("The Error Was" + err);
    }
  });
};

//update database 
database.updateDatabase = (dir, updatedData, findId) => {
  fs.readFile(dir, "utf-8", (err, data) => {
    if (!err) {
      const actualData = JSON.parse(data);
      const result = actualData.findIndex((item) => {
        return item.userId == findId;
      });
  
      actualData.splice(result, 1, updatedData);
      console.log(actualData);
      fs.writeFileSync(dir, JSON.stringify(actualData));
    } else {
      readData("The Error Was" + err);
    }
  });
};

//delete database 
database.deleteDatabase = (dir, deleteId) =>{
    fs.readFile(dir, "utf-8", (err, data) => {
        if (!err) {
          const actualData = JSON.parse(data);
          const result = actualData.findIndex((item) => {
            return item.id == deleteId;
          });
          actualData.splice(result, 1);
          console.log(actualData)
          fs.writeFileSync(dir, JSON.stringify(actualData));
        } else {
          readData("The Error Was" + err);
        }
      });
}
module.exports = database;
