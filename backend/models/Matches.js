import mongoose from "mongoose";
const matchSchema = new mongoose.Schema({
    team1:{
        _id:id ,
        name:String,
        score:Number,
        players: Array,
    },
    team2:{
        _id:id ,
        name:String,
        score:Number,
        players: Array,
    },
    matchinfo:{
        type:Date,
        location:String,
        enum:['live','completed','upcoming','scheduled','cancelled'],
        default:'scheduled', //def
        required:true,
    },
    result:{
        type:String
    },
    addedAt:{
        type:Date,
        default: Date.now,
    },
    oversPerInngings:{
        type:Number,
        default:Number, //odi
        required:true,
    },
    matchType:{
        type:String,
        enum:['Test','Odi','T20','T10','Final','League'],
        default:'T20', //deff
    },
    umpires:{
        umpire1:String,
        umpire2:String,
        vamire3:String,
    },
    toss:{
        win:String,
        optedFor:{
            type:String,
            enum:['bat','bowl'],
            default:'bat',
        }
    }
});
export default mongoose.model("Match", matchSchema);