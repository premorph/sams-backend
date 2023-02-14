import { diskStorage } from "multer";

export const storage= diskStorage({
    destination:`${__dirname}/../../../storage`,
    filename:(req,file,next)=>{
        const extension = file.originalname.split('.').pop();
        const filename =`${Date.now()}.${extension}`;
        next(null,filename)
    }
})