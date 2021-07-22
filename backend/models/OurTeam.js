import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const OurTeamSchema = new Schema({
    name:{
        type:String
    },
    post:{
        type:String
    },
    education:{
        type:String
        
    },
    PhoneNo:{
        type:String
        
    }

});

const OurTeam = mongoose.model('team',OurTeamSchema);
export default OurTeam;