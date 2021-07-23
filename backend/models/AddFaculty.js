import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const AddFacultySchema = new Schema({
    name:{
        type:String
    },
    post:{
        type:String
    },
    phoneNo:{
        type:String 
    },
    experience:{
        type:String
    },
    qualification:{
        type:String
    }
});

const AddFaculty = mongoose.model('addFaculty',AddFacultySchema);
export default AddFaculty;