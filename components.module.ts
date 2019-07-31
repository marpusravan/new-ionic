import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { File } from '@ionic-native/file';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Platform } from 'ionic-angular';
import { LogProvider, LogProviderConfig } from 'ionic-log-file-appender';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LottieAnimationViewModule } from 'ng-lottie';

import { dictionary } from '../dictionary';
import { SharedModule } from '../shared/shared-module.module';
import { LoadingModalComponent } from './../components/loading-modal/loading-modal';
import { AboutMeComponent } from './about-me/about-me';
import { AccountTeamComponent } from './account-team/account-team';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet';
import { BillingGoalsComponent } from './billing-goals/billing-goals';
import { CalendarListComponent } from './calendar-list/calendar-list';
import { CalendarVariationMeetingsComponent } from './calendar-variation-meetings/calendar-variation-meetings';
import { CardFooterComponent } from './card-footer/card-footer';
import { CardGenericItemComponent } from './card-generic-item/card-generic-item';
import { CardHeaderComponent } from './card-header/card-header';
import { CardSelectableAvatarItemComponent } from './card-selectable-avatar-item/card-selectable-avatar-item';
import { CardSelectableItemComponent } from './card-selectable-item/card-selectable-item';
import { ClientAcceptanceComponent } from './client-acceptance/client-acceptance';
import { CoacheeBirthdayComponent } from './coachee-birthday/coachee-birthday';
import { CoacheesProfileComponent } from './coachees-profile/coachees-profile';
import { CompanyExecutivesComponent } from './company-executives/company-executives';
import { CompanyInsightsComponent } from './company-insights/company-insights';
import { CongratulateNudgeComponent } from './congratulate-nudge/congratulate-nudge';
import { CongratulateWorkAnniversaryComponent } from './congratulate-work-anniversary/congratulate-work-anniversary';
import { ContactsComponent } from './contacts/contacts';
import { ContributionComponent } from './contribution/contribution';
import { CreateContractComponent } from './create-contract/create-contract';
import { CreateNoteSuccessComponent } from './create-note-success/create-note-success';
import { CreateNoteComponent } from './create-note/create-note';
import { CreateOpportunityComponent } from './create-opportunity/create-opportunity';
import { DailyDigestComponent } from './daily-digest/daily-digest';
import { EngagementComponent } from './engagement/engagement';
import { EstimatedTaxComponent } from './estimated-tax/estimated-tax';
import { EthicsCardComponent } from './ethics-card/ethics-card';
import { ExternalLinkComponent } from './external-link/external-link';
import { FinancialCoachComponent } from './financial-coach/financial-coach';
import { FindClientRelationshipsDetailComponent } from './find-client-relationships-detail/find-client-relationships-detail';
import { FirmHolidaysComponent } from './firm-holidays/firm-holidays';
import { HsaBalanceComponent } from './hsa-balance/hsa-balance';
import { IncomeVerificationLetterComponent } from './income-verification-letter/income-verification-letter';
import { InvoicedoughnutGraphComponent } from './invoicedoughnut-graph/invoicedoughnut-graph';
import { InvoicesComponent } from './invoices/invoices';
import { MeetingCalendarComponent } from './meeting-calendar/meeting-calendar';
import { MoneyRateBarComponent } from './money-rate-bar/money-rate-bar';
import { MyClientsComponent } from './my-clients/my-clients';
import { MyCoachesComponent } from './my-coaches/my-coaches';
import { MyPrpsComponent } from './my-prps/my-prps';
import { MyselfComponent } from './myself/myself';
import { NextStepsComponent } from './next-steps/next-steps';
import { OpportunitiesComponent } from './opportunities/opportunities';
import { OpportunityClientDetailsComponent } from './opportunity-client-details/opportunity-client-details';
import { OutOfOfficeComponent } from './out-of-office/out-of-office';
import { PartnerAllowanceComponent } from './partner-allowance/partner-allowance';
import { PartnerDepositProgramBalanceComponent } from './partner-deposit-program-balance/partner-deposit-program-balance';
import { PartnerDepositProgramComponent } from './partner-deposit-program/partner-deposit-program';
import { PartnerDevelopmentSabbaticalComponent } from './partner-development-sabbatical/partner-development-sabbatical';
import { PartnerGoalsComponent } from './partner-goals/partner-goals';
import { PdpListComponent } from './pdp-list/pdp-list';
import { PdpWithdrawalComponent } from './pdp-withdrawal/pdp-withdrawal';
import { PhoneUpgradeComponent } from './phone-upgrade/phone-upgrade';
import { ProgressbarComponent } from './progressbar/progressbar';
import { RelateMeDetailsComponent } from './relate-me-details/relate-me-details';
import { RelateMeComponent } from './relate-me/relate-me';
import { ResetPasswordComponent } from './reset-password/reset-password';
import { RetryComponent } from './retry/retry';
import { RevenueGoalsComponent } from './revenue-goals/revenue-goals';
import { SabbaticalEligibilityComponent } from './sabbatical-eligibility/sabbatical-eligibility';
import { TaskDetailsComponent } from './task-details/task-details';
import { TypeClientComponent } from './type-client/type-client';
import { TypeCompanyComponent } from './type-company/type-company';
import { TypeNewsComponent } from './type-news/type-news';
import { UnbilledRevenueComponent } from './unbilled-revenue/unbilled-revenue';
import { UpdateOpportunityComponent } from './update-opportunity/update-opportunity';
import { WelcomeComponent } from './welcome/welcome';
import { ComplianceDashboardComponent } from './compliance-dashboard/compliance-dashboard';
import {TrendingListItemCardComponent} from "./trending-list-item-card/trending-list-item-card.component";
import { CoacheesMyteamComponent } from './coachees-myteam/coachees-myteam';
import { ItineraryTravelComponent } from './itinerary-travel/itinerary-travel';
import {WbsCodeComponent} from "./wbs-code/wbs-code";
import { TrendingNowComponent } from './trending-now/trending-now';
import { ConfettiCongratulationsComponent } from './../pages/onboarding-process/components/confetti-congratulations/confetti-congratulations';
import { FpmmakerComponent } from './fpmmaker/fpmmaker';
import { FpmfaqComponent } from './fpmfaq/fpmfaq';


export function provideLogger(
  file: File,
  platform: Platform,
  datePipe: DatePipe
) {
  /**
   * Provider for persistent file logging services
   */
  if (window) {
    return new LogProvider(
      file,
      <any>platform,
      datePipe,
      new LogProviderConfig(dictionary.configObj)
    );
  }
}

@NgModule({
  declarations: [
    ExternalLinkComponent,
    PartnerDepositProgramComponent,
    FirmHolidaysComponent,
    NextStepsComponent,
    PhoneUpgradeComponent,
    ContactsComponent,
    CalendarListComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardGenericItemComponent,
    InvoicesComponent,
    CardSelectableItemComponent,
    ContactsComponent,
    CardSelectableAvatarItemComponent,
    CalendarVariationMeetingsComponent,
    PdpListComponent,
    BalanceSheetComponent,
    PartnerDepositProgramBalanceComponent,
    ContributionComponent,
    OutOfOfficeComponent,
    ProgressbarComponent,
    UnbilledRevenueComponent,
    ContributionComponent,
    OpportunitiesComponent,
    OpportunityClientDetailsComponent,
    TaskDetailsComponent,
    TypeClientComponent,
    AccountTeamComponent,
    MeetingCalendarComponent,
    RevenueGoalsComponent,
    PartnerGoalsComponent,
    MoneyRateBarComponent,
    MyClientsComponent,
    MyCoachesComponent,
    MyPrpsComponent,
    MyselfComponent,
    LoadingModalComponent,
    PartnerAllowanceComponent,
    FinancialCoachComponent,
    TypeCompanyComponent,
    SabbaticalEligibilityComponent,
    TypeNewsComponent,
    HsaBalanceComponent,
    WelcomeComponent,
    CompanyExecutivesComponent,
    InvoicedoughnutGraphComponent,
    PartnerDevelopmentSabbaticalComponent,
    ClientAcceptanceComponent,
    CreateOpportunityComponent,
    AboutMeComponent,
    MoneyRateBarComponent,
    BillingGoalsComponent,
    DailyDigestComponent,
    EstimatedTaxComponent,
    CompanyInsightsComponent,
    UpdateOpportunityComponent,
    CongratulateNudgeComponent,
    CongratulateWorkAnniversaryComponent,
    ResetPasswordComponent,
    RelateMeComponent,
    RelateMeDetailsComponent,
    FindClientRelationshipsDetailComponent,
    IncomeVerificationLetterComponent,
    CreateNoteComponent,
    CoacheeBirthdayComponent,
    PdpWithdrawalComponent,
    RetryComponent,
    EthicsCardComponent,
    CreateContractComponent,
    CreateNoteSuccessComponent,
    EngagementComponent,
    CoacheesProfileComponent,
    ComplianceDashboardComponent,
    TrendingListItemCardComponent,
    CoacheesMyteamComponent,
    ItineraryTravelComponent,
    WbsCodeComponent,
    TrendingNowComponent,
    ConfettiCongratulationsComponent,
    FpmmakerComponent,
    FpmfaqComponent,
   
  ],
  imports: [
    SharedModule,
    RoundProgressModule,
    LottieAnimationViewModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      subtitle: "Billing Goal"
    })
  ],
  exports: [
    SharedModule,
    ExternalLinkComponent,
    PartnerDepositProgramComponent,
    FirmHolidaysComponent,
    NextStepsComponent,
    PhoneUpgradeComponent,
    ContactsComponent,
    CalendarListComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardGenericItemComponent,
    InvoicesComponent,
    CardSelectableItemComponent,
    ContactsComponent,
    CardSelectableAvatarItemComponent,
    CalendarVariationMeetingsComponent,
    PdpListComponent,
    BalanceSheetComponent,
    PartnerDepositProgramBalanceComponent,
    ContributionComponent,
    OutOfOfficeComponent,
    ProgressbarComponent,
    UnbilledRevenueComponent,
    ContributionComponent,
    OpportunitiesComponent,
    OpportunityClientDetailsComponent,
    TaskDetailsComponent,
    TypeClientComponent,
    AccountTeamComponent,
    MeetingCalendarComponent,
    RevenueGoalsComponent,
    PartnerGoalsComponent,
    MoneyRateBarComponent,
    MyClientsComponent,
    MyCoachesComponent,
    MyPrpsComponent,
    MyselfComponent,
    LoadingModalComponent,
    PartnerAllowanceComponent,
    FinancialCoachComponent,
    TypeCompanyComponent,
    SabbaticalEligibilityComponent,
    TypeNewsComponent,
    HsaBalanceComponent,
    WelcomeComponent,
    CompanyExecutivesComponent,
    InvoicedoughnutGraphComponent,
    PartnerDevelopmentSabbaticalComponent,
    ClientAcceptanceComponent,
    CreateOpportunityComponent,
    AboutMeComponent,
    MoneyRateBarComponent,
    BillingGoalsComponent,
    DailyDigestComponent,
    EstimatedTaxComponent,
    CompanyInsightsComponent,
    UpdateOpportunityComponent,
    CongratulateNudgeComponent,
    CongratulateWorkAnniversaryComponent,
    ResetPasswordComponent,
    RelateMeComponent,
    RelateMeDetailsComponent,
    FindClientRelationshipsDetailComponent,
    IncomeVerificationLetterComponent,
    CreateNoteComponent,
    CoacheeBirthdayComponent,
    PdpWithdrawalComponent,
    RetryComponent,
    EthicsCardComponent,
    CreateContractComponent,
    CreateNoteSuccessComponent,
    EngagementComponent,
    CoacheesProfileComponent,
    ComplianceDashboardComponent,
    TrendingListItemCardComponent,
    CoacheesMyteamComponent,
    ItineraryTravelComponent,
    WbsCodeComponent,
    TrendingNowComponent,
    FpmmakerComponent,
    FpmfaqComponent,
  ],
  providers: [
    File,
    DatePipe,
    {
      provide: LogProvider,
      useFactory: provideLogger,
      deps: [File, Platform, DatePipe]
    }
  ]
})
export class ComponentsModule { }
