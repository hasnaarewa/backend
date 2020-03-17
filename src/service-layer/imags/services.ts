import { modelRepos } from "../../data-layer/data-abstracts/repositories";

const path=require('path')
const Jimp=require('jimp')
import { v4 as uuidv4 } from 'uuid';
export const Processing={
    uploadImage: async (image, id,data) => {
        const t = 
         { path:path.resolve(__dirname, '../../../public', `${id}.jpeg`)}
         
      
        // const buf = image;
    
       
        const isreaded = await Jimp.read(image.buffer);
    
        let iswrited = await isreaded
        .resize(Jimp.AUTO,200) // resize
        .quality(100) // set JPEG quality
  
        .writeAsync(t.path)
        if(iswrited){
          data.image=id //{color1,address1,name}
          data.ref=uuidv4()
          let issaved=await modelRepos.create(data)
          if(issaved) return "success"
          throw issaved
        }
        else{
            throw new Error('error')
        }
    }
}