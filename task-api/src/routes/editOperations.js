import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", (req, res) => {

    const email = req.body.email;
    const currentEmail = req.body.currentEmail;




    User.updateOne(
        { email: currentEmail },
        { $set: { email : email } }
    ).exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => console.log(err));




});


router.post("/changePassword", (req, res) => {

    const password = req.body.password;
    const currentEmail = req.body.currentEmail;




    User.updateOne(
        { email: currentEmail },
        { $set: { password : password } }
    ).exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => console.log(err));




});



export default router;
