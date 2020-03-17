// import { Request } from 'express-serve-static-core';
// tslint:disable-next-line: max-line-length
import { Request, Response } from 'express';
// tslint:disable-next-line: max-line-length
import {
  Body,
  Controller,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
  HttpError,
  UploadedFile,
} from 'routing-controllers';

import { IModelRequest } from '../request/IModelRequest';
import {MyMiddleware} from '../../middleware/custom-middleware/myMiddleware'
import {modelDataAgents} from '../../data-layer/data-agents/modelDataAgents'
import { modelRepos } from '../../data-layer/data-abstracts/repositories';
import { Processing } from '../../service-layer/imags/services';

@JsonController('/marketplace')
@UseBefore(MyMiddleware)
export class modelController {
  private modelDataAgent: modelDataAgents;
  constructor() {
    this.modelDataAgent = new modelDataAgents();
  }

  /**
   *
   * @param request
   * @param response
   */
  @Post('/register')
  public async createName(
    @UploadedFile('image') file: any,
    @Body() request: IModelRequest, // email,ad
    @Req() req: any,
    @Res() res: any,
  ) {

    if(!file){
      throw new HttpError(422,"missing required parameters [image]")
    }
   
    if(!request.name || !request.email || !request.password
      || !request.type || !request.color1 ||  !request.color1  ||
      !request.color2){
        throw new HttpError(422,"missing required parameters")
      }
     

       let irecordsaved=await this.modelDataAgent.saveMarketplace(request,file)
       if(irecordsaved){

       let obj={
        message:"we have just sent confirmation email to"
      }
      return res.json(obj)
       }
      
  throw new HttpError(500,"error occured please try again later code 500")

}

}