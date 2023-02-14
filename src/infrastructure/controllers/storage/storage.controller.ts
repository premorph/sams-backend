import { Body, Controller, Get, Param, Post, Put, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/infrastructure/services/storage/storage.service';
import { storage } from 'src/infrastructure/utils/media.handle';

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService:StorageService){}
    @Post('/')
    @UseInterceptors(FilesInterceptor('image',10,{storage}))
    create(@UploadedFiles() file:Array<Express.Multer.File>, @Body() params ,@Req() req){
        
        return this.storageService.Create(file,params)
    }
    @Get('/:filename')
    Download(@Param('filename')file , @Res() res):Observable<Object>{
        return of(res.sendFile(join(process.cwd(),'/storage/'+file)))
    }
    @Get('/')
    GetAll(@Body() params:{ref:number; type:string}){
        return this.storageService.GetAll(params)
    }
    @Put('/:id')
    update(@Param('id')id,@Body() params){
            return this.storageService.UpdateOne(params,id)
    }
}
