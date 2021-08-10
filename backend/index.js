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
import { v4 as uuid4 } from "uuid"
import getcompanies from "./routes/getcompanies.js"
import tips from "./routes/tips.js"
import faculty from "./routes/faculty.js"

const app = express();
app.use(cors());
var router = express.Router();

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

app.use("/getcompanies", getcompanies);
app.use("/tips", tips);
app.use("/faculty", faculty);

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

//pdf upload

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 }, }).single('filename');

app.post('/uploadfile', (req, res) => {


    //res.send("success");


    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: 'All fields are mandatory' });
        }

        if (err) {
            return res.status(500).send({ error });
        }

        const file = new Files({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size,
            departmentName: req.departmentName,
            fileDescription: req.fileDescription
        });
        const response = await file.save();
        console.log(file);
        res.json({ file: `http://localhost:5001/files/${response.uuid}` });
    });
});


//pdf download
const __dirname = path.resolve();

// app.get('/:uuid',async(req,res)=>{
//     const file = await Files.findOne({uuid: req.params.uuid});

//     if(!file){
//         return res.json({"error":"error in download"});
//     }

//     const filePath = `${__dirname}/${file.path}`;

//     res.download(filePath);
// })

//get syllabus
app.get("/syllabus", (req, res) => {
    Files.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})


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


//Admin
// app.get("/admin", (req, res) => {

// })
