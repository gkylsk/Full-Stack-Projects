const router = require("express").Router();
const Todo = require("../models/Todo");

//routes
router.post("/add/todo",(req,res)=>{
    const {todo} =req.body;
    const newTodo = new Todo({todo}); //add to database

    // save the todo
    newTodo.save()
    .then(()=>{
        console.log("Successfully added todo");
        res.redirect("/");//remain in front page
    })
    .catch((err) => {
        console.log(err);
    });
})//post request for data entered

router.get("/delete/todo/:_id",(req,res) => {
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(() =>{
        console.log("Delted Todo Successfully");
        res.redirect("/");
    })
    .catch((err) => console.log(err));
})

module.exports = router;