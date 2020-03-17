import mongoose = require("mongoose");

export interface IDocument extends mongoose.Document {
  name: string;
  address1: string;
  address2: string;
  type:string;
  color1: string;
  color2: string;
  email: string;
  password: string;

  createdAt: Date;
  lastUpdated: Date;
}
