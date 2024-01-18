import { Module } from '@nestjs/common';
import { SupportModuleController } from './support-module.controller';
import { SupportModuleService } from './support-module.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { SupportModuleDoc } from './models/support-module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportModuleDoc]),
    CommonModule,
  ],
  controllers: [SupportModuleController],
  providers: [SupportModuleService]
})
export class SupportModuleModule {}
