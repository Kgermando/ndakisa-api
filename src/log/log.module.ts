import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { LogUser } from './models/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogUser]),
    CommonModule,
  ],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
