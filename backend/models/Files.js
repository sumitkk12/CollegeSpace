import mongoose from "mongoose"
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String},
    // uuid: { type: String, required: true },
    //path: { type: String, required: true },
    //size: { type: Number, required: true },
    departmentName: { type: String, required: true }

}, { timestamps: true });




const Files = mongoose.model('studyMaterial', fileSchema);
export default Files;