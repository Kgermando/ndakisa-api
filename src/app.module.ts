import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration'; 
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CohorteModule } from './cohorte/cohorte.module';
import { BanqueModule } from './banque/banque.module';
import { BeneficiaireModule } from './beneficiaire/beneficiaire.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module'; 
import { DashboardModule } from './dashboard/dashboard.module'; 
import { PlanRemboursementModule } from './plan_remboursement/plan_remboursement.module';
import { LogModule } from './log/log.module';
import { SecteursModule } from './secteurs/secteurs.module';
import { CorbeilModule } from './corbeil/corbeil.module';
import { SupportModuleModule } from './support-module/support-module.module';
import { SupportModule } from './support/support.module';
import { BanqueCohorteModule } from './banque_cohorte/banque_cohorte.module';
import { NotifyModule } from './notify/notify.module';
import { ArchiveModule } from './archive/archive.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        ssl: process.env.NODE_ENV === "production" ? {
          rejectUnauthorized: false,
        } : null,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 5,
      max: 100
    }),
    CommonModule,
    ImageModule,
    CohorteModule,
    BanqueModule,
    BeneficiaireModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    PlanRemboursementModule,
    LogModule,
    SecteursModule,
    CorbeilModule,
    SupportModuleModule,
    SupportModule,
    BanqueCohorteModule,
    NotifyModule,
    ArchiveModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
