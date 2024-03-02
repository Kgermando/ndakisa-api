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

  @Get('sexe')
  async sexe( ) {
    return this.dashboardService.sexe();
  }

  @Get('tranche-age')
  async ageBeneficiaires( ) {
    return this.dashboardService.tranchAgeBeneficiaires();
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

  @Get('statut-beneficiaire')
  async statutBeneficiaires( ) {
    return this.dashboardService.statutBeneficiaires();
  }

  @Get('taux-participation-province')
  async tauxParticipatiionProvince( ) {
    return this.dashboardService.tauxParticipatiionProvince();
  }

  @Get('total-remboursement-reste/:start_date/:end_date')
  async remboursementTotalEtReste(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.remboursementTotalEtReste(start_date, end_date);
  }

  @Get('beneficiaire-cohorte')
  async beneficiaireParCohorte( ) {
    return this.dashboardService.beneficiaireParCohorte();
  }

  @Get('statut-cohorte')
  async statutCohorte() {
    return this.dashboardService.statutCohorte();
  }

  @Get('progression-remboursements-sexe/:start_date/:end_date')
  async progressionRemboursementParSexe(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.progressionRemboursementParSexe(start_date, end_date);
  } 

  @Get('secteurs-activites')
  async secteurActivite( ) {
    return this.dashboardService.secteurActivite();
  } 

  @Get('remboursements-interrompus/:start_date/:end_date')
  async remboursementsInterrompus(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.remboursementsInterrompus(start_date, end_date);
  }

  @Get('remboursements-interrompu-pourcent/:start_date/:end_date')
  async remboursementsInterrompuPourcent(
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string
  ) {
    return this.dashboardService.remboursementsInterrompuPourcent(start_date, end_date);
  }
 
}
