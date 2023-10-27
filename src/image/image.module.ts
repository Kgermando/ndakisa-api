import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
// import { AwsSdkModule } from 'aws-sdk-v3-nest';
// import { S3Client } from '@aws-sdk/client-s3';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    // AwsSdkModule.registerAsync({
    //   clientType: S3Client,
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService): S3Client => new S3Client({
    //     endpoint: "https://fra1.digitaloceanspaces.com",
    //     forcePathStyle: false,
    //     region: config.get<string>('bucket.region'),
        
    //     credentials: {
    //       accessKeyId: config.get<string>('bucket.accesskeyid'), 
    //       secretAccessKey: config.get<string>('bucket.secretacceskey'),
    //     },
    //   }),
    // }),
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
