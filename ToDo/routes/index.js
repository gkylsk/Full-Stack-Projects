const router = require("express").Router();// lets to create different routes
const Todo = require("../models/Todo");

//routes will be here..
router.get('/',async(req,res)=>{ //async task
    // res.send("Welcome to Home Page!");
    const allTodo = await Todo.find(); //dynamic adding
    res.render("index",{todo: allTodo});
});

module.exports = router; // export the router