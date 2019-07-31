import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Badge } from '@ionic-native/badge';
import { ENV } from '@app/env';
import { AppAvailability } from '@ionic-native/app-availability';
import { AppVersion } from '@ionic-native/app-version';
import { CallNumber } from '@ionic-native/call-number';
import { DatePicker } from '@ionic-native/date-picker';
import { Device } from '@ionic-native/device';
import { Diagnostic } from '@ionic-native/diagnostic';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { EmailComposer } from '@ionic-native/email-composer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Firebase } from '@ionic-native/firebase';
import { Globalization } from '@ionic-native/globalization';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Keyboard } from '@ionic-native/keyboard';
import { Media } from '@ionic-native/media';
import { Network } from '@ionic-native/network';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { PinCheck } from '@ionic-native/pin-check';
import { PinDialog } from '@ionic-native/pin-dialog';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SMS } from '@ionic-native/sms';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { IonicStorageModule } from '@ionic/storage';
import { SecureStorage } from '@ionic-native/secure-storage';
import { StoreModule } from '@ngrx/store';
import { AppInsightsService, ApplicationInsightsModule } from '@softwarepioniere/ionic-application-insights';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { AvatarModule } from 'ngx-avatar';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ComponentsModule } from '../components/components.module';
import { MessagesService } from '../pages/home/services/messages.service';
import { NotificationService } from '../pages/home/services/notification.service';
import { PipesModule } from '../pipes/pipes.module';
import { AppBrowserProvider } from '../providers/app-browser/app-browser';
import { AstroFastInit } from '../providers/authentication/app.fast-init';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { BiometricAuthentication } from '../providers/biometrics/biometric-authentication.service';
import { ClearHistoryProvider } from '../providers/clear-history/clear-history';
import { CloudSpeechProvider } from '../providers/cloud-speech/cloud-speech';
import { ConsolidateSlideProvider } from '../providers/consolidate-slide/consolidate-slide';
import { ConversationService } from '../providers/conversation/conversation.service';
import { CurrencyNamesProvider } from '../providers/currency-names/currency-names';
import { FcmProvider } from '../providers/fcm/fcm';
import { FirebaseAuthenticationService } from '../providers/firebase-service/firebase-service';
import { GoogleTtsProvider } from '../providers/googleTts/googleTts';
import { TrackerService } from '../providers/logger/tracker.service';
import { MockupJsonProvider } from '../providers/mockup-json/mockup-json';
import { ModalServiceProvider } from '../providers/modal-service/modal-service';
import { InboundResponseValidator } from '../providers/model-validator/response.validator';
import { NudgeStorageService } from '../providers/nudge.storage.service';
import { OnboardingService } from '../providers/onboarding/onboarding.service';
import { CryptographyProvider } from '../providers/cryptography/cryptography';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { SpeechService } from '../providers/speech/speech.service';
import { AppStorage } from '../providers/storage/app.storage';
import { reducers } from '../store/app.reducers';
import { DirectivesModule } from './../directives/directives.module';
import { UnreadMessageService } from './../pages/home/services/unread-message.service';
import { SalesforceProvider } from './../providers/salesforce/salesforce';
import { SocketProvider } from './../providers/socket-service/socket';
import { SharedModule } from './../shared/shared-module.module';
import { AstroApp } from './app.component';
import { SecureStore } from '../providers/storage/app.secure.storage';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { IntentServiceProvider } from '../providers/intent-service/intent-service';
import { SilentIdamProcess } from '../providers/authentication/reauthentication.service';
import { RpcLoggerProvider } from '../providers/rpc-logger/rpc-logger';
import { XSlidesConvProvider } from '../providers/x-slides-conv/x-slides-conv';
import { DynamicDiscoverProvider } from '../providers/dynamic-discover/dynamic-discover';


let config: SocketIoConfig = {
  url: ENV.apiSocket,
  options: {
    path: "/platform",
    upgrade: false,
    transports: ['websocket'],
    reconnectionAttempts: 1000,
    reconnectionDelay: 1000,
    reconnection: true,
    pingTimeout: 30000,
    pingInterval: 10000
  }
};


@NgModule({
  declarations: [AstroApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(ENV.firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(AstroApp, {
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      },
      backButtonText: "",
      locationStrategy: 'hash'
    }),
    SocketIoModule.forRoot(config),
    ComponentsModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    AvatarModule,
    LottieAnimationViewModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    PipesModule,
    DirectivesModule,
    ApplicationInsightsModule.forRoot({
      instrumentationKey: ENV.appInsightsInstrumentationKey
    }),
  ],
  exports: [
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [AstroApp],
  providers: [
    WebView,
    Keyboard,
    AngularFireAuth,
    AuthenticationProvider,
    FirebaseAuthenticationService,
    MockupJsonProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TextToSpeech,
    SpeechRecognition,
    CloudSpeechProvider,
    GooglePlus,
    SocketProvider,
    CallNumber,
    SMS,
    DocumentViewer,
    MessagesService,
    NotificationService,
    EmailComposer,
    InAppBrowser,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    Globalization,
    Network,
    Device,
    Media,
    SmartAudioProvider,
    ClearHistoryProvider,
    OnboardingService,
    ConsolidateSlideProvider,
    ModalServiceProvider,
    FcmProvider,
    GoogleTtsProvider,
    Firebase,
    OpenNativeSettings,
    ScreenOrientation,
    UniqueDeviceID,
    AppBrowserProvider,
    UnreadMessageService,
    AppVersion,
    FileTransfer,
    NudgeStorageService,
    FingerprintAIO,
    PinCheck,
    BiometricAuthentication,
    PinDialog,
    ConversationService,
    AstroFastInit,
    AppStorage,
    AppAvailability,
    DatePicker,
    CurrencyNamesProvider,
    InboundResponseValidator,
    CryptographyProvider,
    TrackerService,
    AppInsightsService,
    SalesforceProvider,
    SafariViewController,
    SpeechService,
    AndroidPermissions,
    SecureStorage,
    SecureStore,
    Badge,
    UserSettingsProvider,
    Diagnostic,
    IntentServiceProvider,
    SilentIdamProcess,
    RpcLoggerProvider,
    XSlidesConvProvider,
    DynamicDiscoverProvider
  ]
})
export class AppModule { }
