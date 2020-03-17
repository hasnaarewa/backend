import { IDocument } from "../data-abstracts/repositories/IDocument";
import { modelRepos } from "../data-abstracts/repositories/Repository";
import * as mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Processing } from "../../service-layer/imags/services";
import { MailerService } from "../../service-layer/mailer";
const jwt=require('jsonwebtoken')

export class modelDataAgents {
  constructor() {}

  /**
   *
   * @param account
   */
  async saveMarketplace(account: any,file:any): Promise<any> {
    let imgid=uuidv4()
    let isimageSaved=await  Processing.uploadImage(file,imgid,account)
    if(isimageSaved){
      let token=this.generateSecuretoken(account.email)
      account.secure_token=token
      account.image=imgid
      account.ref=uuidv4()
       let result=await modelRepos.create(account)
       if(result){
     MailerService.send(account.name,account.email,token)
        return result
       }
    }
 
    throw new Error("could not create this record")



  }
  /**
   * 
   * @param email 
   */
  public  generateSecuretoken(email) {
		const secret = "marketplace-000"
		//  Const res=await crypto.randomBytes(48);
		const res = jwt.sign(
			{
				data: {
					email,
				},
			},
			secret,
			{expiresIn: 60 * 60 * 24},
		);
		return res;
	}
}
