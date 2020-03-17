
const path=require('path')
const Jimp=require('jimp')


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
          return true
        }
        else{
            throw new Error('error')
        }
    }
}