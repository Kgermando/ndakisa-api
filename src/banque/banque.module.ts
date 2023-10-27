import { Module } from '@nestjs/common';
import { BanqueController } from './banque.controller';
import { BanqueService } from './banque.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Banque } from './models/banque.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banque]),
    CommonModule,
  ],
  controllers: [BanqueController],
  providers: [BanqueService]
})
export class BanqueModule {}
