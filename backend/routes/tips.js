import express from "express";
let router = express.Router();
import TipsAndTrick from "../models/TipsAndTricks.js";


router.post("/", (req, res) => {
    var tips = new TipsAndTrick({
        name: req.body.name,
        companyName: req.body.companyName,
        ctc: req.body.ctc,
        batchYear: req.body.batchYear,
        tipsForStudents: req.body.tipsForStudents,
        howIgotPlaced: req.body.howIgotPlaced,
        //likes:req.body.likes
    })

    tips.save()
        .then(() => {
            console.log("Your data is saved successfully");
            res.json(tips);
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
})


router.get("/", (req, res) => {
    TipsAndTrick.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

export default router;