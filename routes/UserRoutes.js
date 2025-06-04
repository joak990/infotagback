const express = require('express');
const createuser = require('../controllers/CreateUserController');
const changestatus = require('../controllers/ChangeStatusController');
const UsersRouter = express.Router();


UsersRouter.post("/users", async (req,res) => {
    try {
        const {name,email,uid} = req.body
    const newuser = await createuser(name,email,uid)
    res.status(200).json(newuser)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});