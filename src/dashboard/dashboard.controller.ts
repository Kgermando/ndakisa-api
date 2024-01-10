import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(
      private dashboardService: DashboardService
  ) {}

  @Get('beneficiaires')
  async totalBeneficiaire( ) {
    return this.dashboardService.totalBeneficiaire();
  }
  
  @Get('cohortes')
  async totalCohorte( ) {
    return this.dashboardService.totalCohorte();
  }

  @Get('banques')
  async totalBanque( ) {
    return this.dashboardService.totalBanque();
  }

  @Get('sexe/:start_date/:end_date')
  async sexe(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.sexe(start_date, end_date);
  }

  @Get('age/:start_date/:end_date')
  async ageBeneficiaires(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.ageBeneficiaires(start_date, end_date);
  }


  @Get('total-garantie/:start_date/:end_date')
  async totalGarantie(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.totalGarantie(start_date, end_date);
  }

  @Get('credit-accorde/:start_date/:end_date')
  async totalCreditAccorde(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.totalCreditAccorde(start_date, end_date);
  }

  @Get('total-a-rembourser/:start_date/:end_date')
  async totalARembourser(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.totalARembourser(start_date, end_date);
  }

  @Get('total-rembourser/:start_date/:end_date')
  async totalRembourse(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.totalRembourse(start_date, end_date);
  }

  @Get('reste-a-rembourser/:start_date/:end_date')
  async resteARembourse(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.resteARembourse(start_date, end_date);
  }

  @Get('participation-par-banque/:start_date/:end_date')
  async participationParBanque(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.participationParBanque(start_date, end_date);
  }

  @Get('statut-beneficiaire/:start_date/:end_date')
  async statutBeneficiaires(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.statutBeneficiaires(start_date, end_date);
  }

  @Get('taux-participation-province/:start_date/:end_date')
  async tauxParticipatiionProvince(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.tauxParticipatiionProvince(start_date, end_date);
  }

  @Get('total-remboursement-reste/:start_date/:end_date')
  async remboursementTotalEtReste(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.remboursementTotalEtReste(start_date, end_date);
  }

  @Get('remboursement-cohorte/:start_date/:end_date')
  async remboursementCohorte(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.remboursementCohorte(start_date, end_date);
  }

  @Get('statut-cohorte/:start_date/:end_date')
  async statutCohorte(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.statutCohorte(start_date, end_date);
  }

  @Get('progression-cohorte-homme/:start_date/:end_date')
  async progressionRemboursementSexeHomme(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.progressionRemboursementSexeHomme(start_date, end_date);
  }

  @Get('progression-cohorte-femme/:start_date/:end_date')
  async progressionRemboursementSexeFemme(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.progressionRemboursementSexeFemme(start_date, end_date);
  }

  @Get('progression-cohorte-date/:start_date/:end_date')
  async progressionRemboursementSexeDate(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.progressionRemboursementSexeDate(start_date, end_date);
  }

  @Get('secteurs-activites/:start_date/:end_date')
  async secteurActivite(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.secteurActivite(start_date, end_date);
  }



 
}
