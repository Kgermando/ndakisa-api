import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {extname} from 'path';
import {Response} from "express";


@Controller('image')
export class ImageController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
          destination: './uploads',
          filename(_, file, callback) {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
              return callback(null, `${randomName}${extname(file.originalname)}`);
          }
      })
  }))
  uploadFile(@UploadedFile() file) {
      console.log(file);
      const isProduction = process.env.NODE_ENV === "production";
      let url = isProduction ? 'https://parsimonious-temper-production.up.railway.app' : 'http://localhost:3002';
      return {
        url: `${url}/api/image/uploads/${file.filename}`
      }
  }

  @Get('uploads/:path')
  async getImage(
      @Param('path') path,
      @Res() res: Response
  ) {
    res.sendFile(path, {root: 'uploads'});
  }
}
