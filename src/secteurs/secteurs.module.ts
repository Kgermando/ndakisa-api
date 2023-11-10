import { Module } from '@nestjs/common';
import { SecteursController } from './secteurs.controller';
import { SecteursService } from './secteurs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Secteur } from './models/secteur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Secteur]),  
    CommonModule,
  ],
  controllers: [SecteursController],
  providers: [SecteursService]
})
export class SecteursModule {}
