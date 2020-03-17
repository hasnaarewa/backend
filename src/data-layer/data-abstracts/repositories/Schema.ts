import { Schema } from "mongoose";
import { MongooseAccess } from "../../adapter/MongoAccess";
import { IDocument } from "./IDocument";
import * as faker from 'faker'
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let modelSchema:Schema=new Schema({
  
    name: { type: String},
    type: { type: String},
    status:{type:Boolean,default:false},
    ref:{type:String},
    address1: { type: String},
    address2: { type: String},
    color1: { type: String},
    color2: { type: String},
    email: { type: String},
    password: { type: String},
    createdAt:{type:Date},
    updatedAt:{type:Date}
    
})

modelSchema.pre("save",(next:any)=>{
    if(this._doc){
        let doc=<IDocument>this._doc;
        let now=new Date();

        if(!doc.createdAt){
            doc.createdAt=now;
        }
        doc.lastUpdated=now;
    }
    next();
})

export {modelSchema};