//import express
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoModel from "./Models/Todo.js"; //import model
import dotenv from "dotenv"

//instantiate express
const app = express();
const port = 3000;

dotenv.config();
const CONNECTION_STRING = process.env.CONNECTION_STRING

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(cors("*"));


//handle a get request
app.get('/todos', async (req, res) => {
    try {
        //retrieve collection documents
        const response = await todoModel.find({});
        console.log(response);

        //send response
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).send(`Get request failed: ${err}`);
    }
});

//handle a post request
app.post('/todos', async (req, res) => {
    try {
        //retrieve body data
        const todo = req.body;
        
        //create new entry
        await todoModel.create(todo);

        res.status(200).send("Post request successful");
    } catch (err) {
        console.log(err);
        res.status(500).send(`Post request failed: ${err}`);
    }
});
 
//handle a delete request]
app.delete("/todos/:id", async (req, res) => {
    try {
        //get URL parameter
        const id = req.params.id;
        //find and delete
        await todoModel.findByIdAndDelete(id);

        res.send("Deleted entry with id: " + id);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Delete request failed: ${err}`);
    }
});


//handle a put request
app.put("/todos/:id", async (req, res) => {
    try {
        //get id of entry
        const id = req.params.id;
        const newText = req.body.text;

    // create the new todo item and update it
        const newTodo = {"text": newText};

        await todoModel.findByIdAndUpdate(id, newTodo);    
        res.status(200).send(`Updated entry ${id} with new text: ${newText}`)
    } catch (err) {
        console.log(err);
        res.status(500).send(`Put request failed: ${err}`)
    }
})


//Mongoose to connect to db
mongoose.connect(CONNECTION_STRING).then(function () {
    console.log("Database connected ");
    //start server
    app.listen(port, function(){
        console.log(`server running at port ${port}`);
    });

}).catch(function (error) {
    console.log("Error connecting to the database");
});