import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const PortalSchema = new Schema({
    name:{
        type:String
    },
    surName:{
        type:String
    },
    message:{
        type:String
    }

});

const Portal = mongoose.model('Portal',PortalSchema);
export default Portal