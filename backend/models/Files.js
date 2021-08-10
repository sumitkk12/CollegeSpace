import mongoose from "mongoose"
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required:true},
    uuid: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    departmentName: { type: String },
    fileDescription:{type:String}

}, { timestamps: true });




const Files = mongoose.model('studyMaterial', fileSchema);
export default Files;