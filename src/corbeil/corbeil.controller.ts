import { ClassSerializerInterceptor, Controller, Get,
     UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { CorbeilService } from './corbeil.service';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard) 
@Controller('corbeil')
export class CorbeilController {
    constructor(
        private corbeilService: CorbeilService
    ) {}

    @Get('get-all-cohorte')
    async getAllCohorte() {
      return this.corbeilService.getAllCohorte();
    }

    @Get('get-all-beneficiaire')
    async getAllBeneficiaire() {
      return this.corbeilService.getAllBeneficiaire();
    }

    @Get('get-all-user')
    async getAllUser() {
      return this.corbeilService.getAllUser();
    }
}
