import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CompanyDetailSchema = new Schema({
    companyName:{
        type:String
    },
    companyDescription:{
        type:String
    },
    companyEligibilityCriteria:{
        type:Number,
        default:0
    },
    placedStudents:{
        type:Number,
        default:0
    },
    basePackege:{
        type:Number
    }

});

const CompanyDetail = mongoose.model('CompanyDetail',CompanyDetailSchema);
export default CompanyDetail