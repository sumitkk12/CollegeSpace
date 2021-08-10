import express from "express";
import CompanyDetail from "../models/CompanyDetails.js"
let router = express.Router();

router.post("/", (req, res) => {
    var company = new CompanyDetail({
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        companyEligibilityCriteria: req.body.companyEligibilityCriteria,
        placedStudents: req.body.placedStudents,
        basePackege: req.body.basePackege
    })

    company.save()
        .then(() => {
            console.log("saved");
            res.json(company);
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
})

router.get("/", (req, res) => {
    CompanyDetail.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

export default router;