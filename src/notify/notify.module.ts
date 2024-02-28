import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Notify } from './models/notify.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Notify]),
    CommonModule,
  ],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
