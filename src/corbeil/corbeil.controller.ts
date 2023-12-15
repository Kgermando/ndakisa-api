import { Controller, Get } from '@nestjs/common';
import { CorbeilService } from './corbeil.service';

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
