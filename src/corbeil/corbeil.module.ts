import { Module } from '@nestjs/common';
import { CorbeilController } from './corbeil.controller';
import { CorbeilService } from './corbeil.service';

@Module({
  controllers: [CorbeilController],
  providers: [CorbeilService]
})
export class CorbeilModule {}
