import express from "express";
let router = express.Router();
import AddFaculty from "../models/AddFaculty.js";

//post faculty details
router.post("/add-Faculty", (req, res) => {
    var faculty = new AddFaculty({
        name: req.body.name,
        post: req.body.post,
        phoneNo: req.body.phoneNo,
        experience: req.body.experience,
        qualification: req.body.qualification
    })

    faculty.save()
        .then(() => {
            console.log("Your data is saved successfully");
            res.json(faculty);
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
})

router.get("/get-Faculty", (req, res) => {
    AddFaculty.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

export default router;