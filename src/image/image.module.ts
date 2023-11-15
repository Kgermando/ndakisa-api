import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller'; 
import { MulterModule } from '@nestjs/platform-express'; 

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
