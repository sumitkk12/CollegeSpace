import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TipsAndTricksSchema = new Schema({
    name:{
        type:String
    },
    companyName:{
        type:String
    },
    ctc:{
        type:String 
    },
    batchYear:{
        type:String  
    },
    tipsForStudents:{
        type:String
    },
    howIGotPlaced:{
        type:String
    },
    // likes:{
    //     type:Number,
    //     default:0
    // }

});

const TipsAndTrick = mongoose.model('TipsAndTrick',TipsAndTricksSchema);
export default TipsAndTrick;