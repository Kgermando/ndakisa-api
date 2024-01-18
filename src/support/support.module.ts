import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { SupportDoc } from './models/support.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportDoc]),
    CommonModule,
  ],
  controllers: [SupportController],
  providers: [SupportService]
})
export class SupportModule {}
