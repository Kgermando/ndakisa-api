import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Archive } from './models/archive.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive]),
    CommonModule,
  ],
  controllers: [ArchiveController],
  providers: [ArchiveService]
})
export class ArchiveModule {}
