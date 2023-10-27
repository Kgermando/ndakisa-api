import {
    Controller,
    Post, 
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { ImageService } from './image.service';
  import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService,
      ) {}

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('application'))
    // uploadFile(@UploadedFile() file) {
    //   var url_path = this.imageService.handleImage(file);
    //   return url_path;
    // }
}
