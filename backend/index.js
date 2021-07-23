import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors";
import multer from "multer"
import Portal from "./models/TestModel.js";
import CompanyDetail from "./models/CompanyDetails.js";
import TipsAndTrick from "./models/TipsAndTricks.js";
import Files from "./models/Files.js";
import path from "path"
import OurTeam from "./models/OurTeam.js"
import AddFaculty from "./models/AddFaculty.js";

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

const CONNECTION_URL = `mongodb+srv://sumitkk12:sumit@558@cluster0.celtl.mongodb.net/Portals?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server started at port http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    })

app.get("/", (req, res) => {
    res.send("hi");
});

app.post("/postHere", (req, res) => {
    var portal = new Portal({
        name: req.body.name,
        surname: req.body.surName,
        message: req.body.message
    })

    portal.save()
        .then(() => {
            console.log("saved");
            res.json(portal);
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
})


app.post("/getCompanies", (req, res) => {
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

app.get("/getCompanies", (req, res) => {
    CompanyDetail.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})


app.post("/tips", (req, res) => {
    var tips = new TipsAndTrick({
        name: req.body.name,
        companyName: req.body.companyName,
        ctc: req.body.ctc,
        batchYear: req.body.batchYear,
        tipsForStudents: req.body.tipsForStudents,
        howIgotPlaced: req.body.howIgotPlaced
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


app.get("/get-all-tips", (req, res) => {
    TipsAndTrick.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})




//pdf upload

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
});

let upload = multer({ storage });

app.post('/uploadfile', upload.single('filename'), async (req, res) => {

    const file = new Files({
        filename: req.body.filename,
        //uuid: uuidv4(),
        //path: req.body.path,
        //size: req.body.size,
        departmentName: req.body.departmentName
    });
    const response = await file.save();
    res.json({ filename });

});

//Our team

app.post("/teams", (req, res) => {
    var team = new OurTeam({
        name: req.body.name,
        post: req.body.post,
        education: req.body.education,
        phoneNo: req.body.phoneNo,

    })

    team.save()
        .then(() => {
            console.log("saved");
            res.json(team);
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
})

//post faculty details
app.post("/add-Faculty", (req, res) => {
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

app.get("/get-Faculty", (req, res) => {
    AddFaculty.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
